export const TYPES = {
    EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' }
    ],
    ForwardData: [
        {name:"from",type:"address"},
        {name:"to",type:"address"},
        {name:"tradingTokenAddr",type:"address"},
        {name:"id",type:"uint256"},
        {name:"amount",type:"uint256"},
        {name:"value",type:"uint256"},
        {name:"nonce",type:"uint256"},
        {name:'deadline',type:"uint256"}
    ]
}

export const PRIMARY_TYPE = 'ForwardData';

export const REQUEST_METHOD = 'eth_signTypedData_v4';