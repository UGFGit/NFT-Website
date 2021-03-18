import React from 'react';
import '../../static/styles/terms-of-service.scss';
import DocumentTitle from 'react-document-title';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

function HowTo(){
    return(
        <DocumentTitle title="How it work">
            <div className = "terms-of-service-root">
            <Navigation/>
            <div className = "terms-of-service-body">
                <p className ="terms-of-service-body-title">How it works for the NFT customer and provider</p>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}><b>Set-up an E-wallet</b>{` - This wallet is where you store your cryptocurrencies or digital assets. It can be either an application or a hardware wallet. Depending on the cryptocurrency or digital asset that you want to store, popular choices include MetaMask, Coinbase Wallet, and TrustWallet. For the storing of NFTs minted on the Ethereum blockchain, we recommend MetaMask. Think of it as like a Google Chrome extension. You need to get it from the Metamask.io website directly and nowhere else. 
                Once downloaded you can fund your wallet directly with the “buy” button.
                `}</p>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 20}}><b>The buyer (Customer) Journey. </b></p>
                <p className = "terms-of-service-body-text-wrap">Install MetaMask (super user friendly in browser E-wallet)</p>
                <ul className = "terms-of-service-body-text-wrap">
                    <li>Purchase ETH with a credit card in the "buy" option of Metamask, or transfer ETH to Metamask from another wallet</li>
                    <li>Swap ETH for WETH a.k.a wrapped ethereum currently a better token for NFT auctions/sales etc.) on the “swap” option of Metamask.</li>
                    <li>Buy your NFT on the site.</li>
                    <li>NFT lives on your Metamask Wallet as well as the subdomain you purchased it on.</li>
                </ul>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}><b>The seller (NFT provider) journey.</b></p>
                <p className = "terms-of-service-body-text-wrap">Install MetaMask</p>
                <ul className = "terms-of-service-body-text-wrap">
                    <li>Fill in our on-site application form. (attached for example)</li>
                    <li>Connect your Metamask E-wallet address to your application form.</li>
                    <li>When a sale is collected the WETH gets deposited automatically into your wallet.</li>
                    <li>You can either hold it or swap it within Metamask for ETH, Bitcoin etc</li>
                    <li>If you wish to cash out, you can send the ETH to a popular exchange like Coinbase.com or Binance.com to change into fiat currency.</li>
                </ul>
                <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>Auctions</p>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>{`Auctions will be denominated in USD.
                    Payment will be processed in UOP or WETH.
                `}</p>
                <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>How long do Auctions last?</p>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>{`This is to be decided by the NFT seller. 
                    The auction will end once the pre-determined time has ended and the highest bid at that time will be the winner of the NFT.
                `}</p>
                <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>How can I place a bid?</p>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>{`You can place a bid in UOP or WETH (wrapped Ethereum) 
                    You will then be allowed to bid up to the USD equivalent of the amount of UOP/WETH you have in your wallet. You will not be required to transfer any UOP/WETH to us while placing a bid. Placing a new bid will automatically cancel any previous bid you have placed.
                `}</p>
                <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>What happens if I win?</p>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>{`Upon winning an auction, you will need to pay the final bid amount. We will be on hand to help with this process if needs be.
                    After you have paid, the NFT gets sent to your account.
                `}</p>
                <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>Terminology</p>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}><b>Non-Fungible Tokens (NFTs)</b> - NFTs are blockchain-based records that uniquely represent collectable pieces of media. The media can be anything digital, including art, videos, music, gifs, games, text, memes, and code. NFTs contain highly trustworthy documentation of their history and origin and can have code attached to do almost anything programmers dream up (one popular feature are smart contracts that ensures that the original creator receives royalties from secondary sales). NFTs are secured by the same technology (blockchain)  that enables Bitcoin to be owned by hundreds of millions of people around the world securely. Ethereum, EOS, TRON, Polkadot, BSC and other few blockchains developed NFT token standard, compatible wallet services and marketplaces.</p>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 20}}><b>UOP</b></p>
                <p className = "terms-of-service-body-text-wrap">The Utopia Genesis Foundation was founded with a mission to establish an open and standardized process for the music industry to track, process and tokenize rights. By introducing a universal blockchain protocol for anyone who wants to run commercial projects in the modern music industry, the Foundation aims to provide the infrastructure and tools needed for the development, maintenance and growth of the ecosystem. To add transparency to all these processes, the Foundation has launched its own cryptocurrency, the Utopia Open Platform (UOP) Token. The Token seeks to improve the profitability of the global music industry by eliminating conversion costs and middlemen by unifying the industry onto one common platform.</p>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 20}}><b>WETH</b></p>
                <p className = "terms-of-service-body-text-wrap">Wrapped ETH, or WETH, is a token that represents Ether 1:1 and conforms to the ERC20 token standard. ETH and WETH are always exchanged at a 1:1 ratio, no need to worry about any price fluctuations. ETH does not adhere to ERC20 standards and cannot be traded directly in a decentralized environment. WETH is an ERC20 token that stays in your wallet throughout trading.</p>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 20}}><b>Ethereum (ETH)</b> - Etherum is a blockchain, and ETH is the cryptocurrency that is used to make transactions on the Ethereum blockchain.</p>
                <ul className = "terms-of-service-body-text-wrap">
                    <li>ERC20 Token - One of the most significant Ethereum tokens is known as ERC-20. ERC-20 has emerged as the technical standard; it is used for all smart contracts on the Ethereum blockchain for token implementation and provides a list of rules that all Ethereum-based tokens must follow.</li>
                    <li>ERC721 - ERC721 was the first standard for representing non-fungible digital assets.</li>
                    <li>ERC1155 - ERC1155, brings the idea of semi-fungibility to the NFT world as well as it provides a superset of ERC721 functionality, meaning that an ERC721 asset could be built using ERC1155</li>
                </ul>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 20}}><b>Minting</b>  - The process of tokenizing your work and creating an NFT (see above).</p>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 20}}><b>Crypto wallet</b>  - This is where you store your cryptocurrencies or digital assets. It can be either an application or a hardware wallet. Popular choices include MetaMask, Coinbase Wallet, and TrustWallet.</p>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 20}}><b>Wallet address</b>  - Your wallet address is unique. It’s the address people give out as an account number but in this case, it’s how you get your cryptocurrencies and NFTs. When creating a wallet you will receive a seed phrase. This seed phrase is the only way to recover your wallet and crypto if your hard wallet is damaged or you have forgotten your password. It's best to write this down and store it somewhere safe where you can access it at any time. Do not store this seed phrase on the cloud or share it with anyone.</p>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 20}}><b>Gas Fees</b>  - Gas fees are transaction costs on the Ethereum blockchain. They are controlled automatically by supply and demand within the network at any given time and therefore we are not in control of their costs. Depending on time of day and amount of people using the network, gas fees range from anywhere between 50-300 USD.</p>
                <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>Caution</p>
                <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>Before buying cryptocurrencies and NFTs, conduct your own research, understand fully what it is you are buying into and how it works exactly. Never share your E-wallet seed phrase with anyone. The crypto and NFTs in your wallet are your responsibility</p>
            </div>
            <div className = "terms-of-service-footer-wrap">
                <Footer/>
            </div>
            </div>
        </DocumentTitle>
    )
}

export default HowTo;