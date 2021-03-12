import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';
import Web3 from 'web3';
import { ABI } from '../../constants/blockchain/abi';
import { fetch } from '../../libs';
import { BLOCKCHAIN_NONCE} from '../../constants/endpoints';
import { PRIMARY_TYPE, REQUEST_METHOD, TYPES } from '../../constants/blockchain/erc1155';
import { IAsset } from '../../interfaces/containers/Application/asset.interface';
import { IWeb3State } from '../../interfaces/reducers/web3.interface';

export const checkAllowance = async (account: string, client:Web3, contractAddress: string, paymentAddress: string, enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey): Promise<void> => {
    //@ts-ignore
    const contract = new client.eth.Contract(ABI, paymentAddress);
    const allowance = await contract.methods.allowance(account, contractAddress).call();
    if(Number(allowance) === 0){
        const amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
        const tx = contract.methods.approve(contractAddress, amount);
        const abi = tx.encodeABI();
        const gas = await tx.estimateGas({ from: account });
        const gasPrice = await client.eth.getGasPrice();
        await client.eth.sendTransaction({ from: account, to: paymentAddress, data: abi,  gas, gasPrice });
        enqueueSnackbar(`Allowance was send`, { variant: 'success' });
    }
    return;
}

export const checkBalance = async (client:Web3, paymentAddress: string, account: string) => {
    //@ts-ignore
    const contract = new client.eth.Contract(ABI, paymentAddress);
    const balance = await contract.methods.balanceOf(account).call();
    const decimal = await contract.methods.decimals().call();
    return Number(balance.toString() * +`1e-${decimal}`)
}

const getNonce = async (account: string, contract: string): Promise<number> => {
    const response = await fetch.post(BLOCKCHAIN_NONCE, { contractAddress: contract, account: account});
    const { nonce } = await response.json();
    return nonce;
}

export const createSignature = async (asset: IAsset, client:Web3, web3: IWeb3State ,enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey, price?: number): Promise<{signature: string, value: string}> => {
    //@ts-ignore
    const contract = new client.eth.Contract(ABI, asset.tradingTokenAddress);
    const decimal = await contract.methods.decimals().call();
    const value = `${(price || asset.cryptoPrice) * Math.pow(10, decimal)}`;

    const data = {
        types: TYPES,
        primaryType: PRIMARY_TYPE,
        domain: {
            name: asset.contract.domainName,
            version: asset.contract.version,
            chainId: asset.contract.chainId,
            verifyingContract: asset.contract.contract
        },
        message: {
            from: web3.account,
            to: asset.owner,
            tradingTokenAddr: asset.tradingTokenAddress,
            id: asset.token.tokenId,
            amount: 1,
            value,
            nonce: await getNonce(web3.account, asset.contract.contract)
        }
    }

    enqueueSnackbar(`Transaction build complete`, { variant: 'success' });

    const signature = await web3.provider.request({
        method: REQUEST_METHOD,
        params: [web3.account, JSON.stringify(data)],
        from: [web3.account]
    });

    return { signature, value }
}