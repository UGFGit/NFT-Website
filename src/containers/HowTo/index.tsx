import React from 'react';
import '../../static/styles/how-it-work.scss';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';
import Footer from '../../components/Footer';
import HowToInsImg from '../../static/images/how-to-img.png';
import Step from './Step';
import VectorBlock from './VectorBlock';

const BUYER_STEPS = [
    'Install MetaMask (super user friendly in browser E-wallet)',
    'Purchase ETH with a credit card in the "buy" option of Metamask, or transfer ETH to Metamask from another wallet',
    'Swap ETH for WETH a.k.a wrapped ethereum currently a better token for NFT auctions/sales etc.) on the “swap” option of Metamask.',
    'Buy your NFT on the site.',
    'NFT lives on your Metamask Wallet as well as the subdomain you purchased it on.'
]

const SELLER_STEPS = [
    'Install MetaMask',
    'Fill in our on-site application form. (attached for example)',
    'Connect your Metamask E-wallet address to your application form.',
    'When a sale is collected the WETH gets deposited automatically into your wallet.',
    'You can either hold it or swap it within Metamask for ETH, Bitcoin etc',
    'If you wish to cash out, you can send the ETH to a popular exchange like Coinbase.com or Binance.com to change into fiat currency.'
]

const AUCTION_TEXT = [
    { 
        title: 'Auctions', 
        text: 'Auctions will be denominated in USD.Payment will be processed in UOP or WETH.',
        img: {
            bottom: -8,
            left: -269,
        } 
    },
    { 
        title: 'How long do Auctions last?', 
        text: 'This is to be decided by the NFT seller.  The auction will end once the pre-determined time has ended and the highest bid at that time will be the winner of the NFT.',
        img: {
            bottom: 7,
            left: -120,
        }
    },
    { 
        title: 'How can I place a bid?', 
        text: 'You can place a bid in UOP or WETH (wrapped Ethereum)  You will then be allowed to bid up to the USD equivalent of the amount of UOP/WETH you have in your wallet. You will not be required to transfer any UOP/WETH to us while placing a bid. Placing a new bid will automatically cancel any previous bid you have placed.',
        img: {
            left: -228,
            bottom: 9,
        }
    },
    { 
        title: 'What happens if I win?', 
        text: 'Upon winning an auction, you will need to pay the final bid amount. We will be on hand to help with this process if needs be. After you have paid, the NFT gets sent to your account.',
        img: {
            bottom: 7,
            left: -240,
        }
    }
]

function HowTo(){

    return(
        <DocumentTitle title="How it works">
            <div className = "how-it-work-root">
            <Navigation location = {LocationEnum.HOW_TO}/>
            <div className = "how-it-work-body">
                <p className = "how-it-work-title">How it works</p>
                <p className = "how-it-work-sub-title" style = {{ marginTop: 80 }}>How it works for the NFT customer and provider</p>
                <p className = "how-it-work-text" style = {{ marginTop: 21 }}><b style = {{fontWeight: 700}}>Set-up an E-wallet</b> <b style = {{fontWeight: 300, fontFamily: "Open Sans Light"}}>- This wallet is where you store your cryptocurrencies or digital assets. It can be either an application or a hardware wallet. Depending on the cryptocurrency or digital asset that you want to store, popular choices include MetaMask, Coinbase Wallet, and TrustWallet. For the storing of NFTs minted on the Ethereum blockchain, we recommend MetaMask. Think of it as like a Google Chrome extension. You need to get it from the Metamask.io website directly and nowhere else.  Once downloaded you can fund your wallet directly with the “buy” button.</b></p>
                <div className = "how-to-ins-img-wrap">
                    <img alt ="" src = {HowToInsImg}/>
                </div>
                <p className = "how-it-work-sub-title" style = {{ marginTop: 120, marginBottom: 35 }}>The buyer (Customer) Journey</p>
                {BUYER_STEPS.map((text, index) => (<Step key = {index} index = {index + 1} text = {text} />))}
                <p className = "how-it-work-sub-title" style = {{ marginTop: 100, marginBottom: 35 }}>The buyer (Customer) Journey</p>
                {SELLER_STEPS.map((text, index) => (<Step key = {index} index = {index + 1} text = {text} />))}
                <p className = "how-it-work-sub-title" style = {{ marginTop: 100, marginBottom: 40 }}>Auctions</p>
                <div className = "how-it-auction-wrap">
                    {AUCTION_TEXT.map(({ title, text, img } , index) => (<VectorBlock key={index} text = {text} title = {title} img = {img} />))}
                </div>
                <p className = "how-it-work-sub-title" style = {{ marginTop: 122, marginBottom: 20 }}>Terminology</p>
                <div className = "how-it-work-term-root">
                    <p className = "how-it-work-text"><b style = {{fontWeight: 700}}>Non-Fungible Tokens (NFTs) </b><b style = {{fontWeight: 300, fontFamily: "Open Sans Light"}}>- NFTs are blockchain-based records that uniquely represent collectable pieces of media. The media can be anything digital, including art, videos, music, gifs, games, text, memes, and code. NFTs contain highly trustworthy documentation of their history and origin and can have code attached to do almost anything programmers dream up (one popular feature are smart contracts that ensures that the original creator receives royalties from secondary sales). NFTs are secured by the same technology (blockchain) that enables Bitcoin to be owned by hundreds of millions of people around the world securely. Ethereum, EOS, TRON, Polkadot, BSC and other few blockchains developed NFT token standard, compatible wallet services and marketplaces.</b></p>
                </div>
                <div className = "how-it-work-term-root">
                    <p className = "how-it-work-text"><b style = {{fontWeight: 700}}>UOP </b><b style = {{fontWeight: 300, fontFamily: "Open Sans Light"}}>- The Utopia Genesis Foundation was founded with a mission to establish an open and standardized process for the music industry to track, process and tokenize rights. By introducing a universal blockchain protocol for anyone who wants to run commercial projects in the modern music industry, the Foundation aims to provide the infrastructure and tools needed for the development, maintenance and growth of the ecosystem. To add transparency to all these processes, the Foundation has launched its own cryptocurrency, the Utopia Open Platform (UOP) Token. The Token seeks to improve the profitability of the global music industry by eliminating conversion costs and middlemen by unifying the industry onto one common platform.</b></p>
                </div>
                <div className = "how-it-work-term-root">
                    <p className = "how-it-work-text"><b style = {{fontWeight: 700}}>WETH </b><b style = {{fontWeight: 300, fontFamily: "Open Sans Light"}}>- Wrapped ETH, or WETH, is a token that represents Ether 1:1 and conforms to the ERC20 token standard. ETH and WETH are always exchanged at a 1:1 ratio, no need to worry about any price fluctuations. ETH does not adhere to ERC20 standards and cannot be traded directly in a decentralized environment. WETH is an ERC20 token that stays in your wallet throughout trading.</b></p>
                </div>
                <div className = "how-it-work-term-root">
                    <p className = "how-it-work-text"><b style = {{fontWeight: 700}}>Ethereum (ETH) </b><b style = {{fontWeight: 300, fontFamily: "Open Sans Light"}}>- Etherum is a blockchain, and ETH is the cryptocurrency that is used to make transactions on the Ethereum blockchain.</b></p>
                    <p className = "how-it-work-text" style = {{marginTop: 10}}><b style = {{fontWeight: 700}}>ERC20 Token </b><b style = {{fontWeight: 300, fontFamily: "Open Sans Light"}}>- One of the most significant Ethereum tokens is known as ERC-20. ERC-20 has emerged as the technical standard; it is used for all smart contracts on the Ethereum blockchain for token implementation and provides a list of rules that all Ethereum-based tokens must follow.</b></p>
                    <p className = "how-it-work-text" style = {{marginTop: 10}}><b style = {{fontWeight: 700}}>ERC721</b><b style = {{fontWeight: 300, fontFamily: "Open Sans Light"}}>- ERC721 was the first standard for representing non-fungible digital assets.</b></p>
                    <p className = "how-it-work-text" style = {{marginTop: 10}}><b style = {{fontWeight: 700}}>ERC1155</b><b style = {{fontWeight: 300, fontFamily: "Open Sans Light"}}>- ERC1155, brings the idea of semi-fungibility to the NFT world as well as it provides a superset of ERC721 functionality, meaning that an ERC721 asset could be built using ERC1155</b></p>
                </div>
                <div className = "how-it-work-term-root">
                    <p className = "how-it-work-text"><b style = {{fontWeight: 700}}>Minting </b><b style = {{fontWeight: 300, fontFamily: "Open Sans Light"}}>- The process of tokenizing your work and creating an NFT (see above).</b></p>
                </div>
                <div className = "how-it-work-term-root">
                    <p className = "how-it-work-text"><b style = {{fontWeight: 700}}>Crypto wallet </b><b style = {{fontWeight: 300, fontFamily: "Open Sans Light"}}>- This is where you store your cryptocurrencies or digital assets. It can be either an application or a hardware wallet. Popular choices include MetaMask, Coinbase Wallet, and TrustWallet.</b></p>
                </div>
                <div className = "how-it-work-term-root">
                    <p className = "how-it-work-text"><b style = {{fontWeight: 700}}>Wallet address </b><b style = {{fontWeight: 300, fontFamily: "Open Sans Light"}}>- Your wallet address is unique. It’s the address people give out as an account number but in this case, it’s how you get your cryptocurrencies and NFTs. When creating a wallet you will receive a seed phrase. This seed phrase is the only way to recover your wallet and crypto if your hard wallet is damaged or you have forgotten your password. It's best to write this down and store it somewhere safe where you can access it at any time. Do not store this seed phrase on the cloud or share it with anyone.</b></p>
                </div>
                <div className = "how-it-work-term-root">
                    <p className = "how-it-work-text"><b style = {{fontWeight: 700}}>Gas Fees </b><b style = {{fontWeight: 300, fontFamily: "Open Sans Light"}}>- Gas fees are transaction costs on the Ethereum blockchain. They are controlled automatically by supply and demand within the network at any given time and therefore we are not in control of their costs. Depending on time of day and amount of people using the network, gas fees range from anywhere between 50-300 USD.</b></p>
                </div>
                <p className = "how-it-work-sub-title" style = {{ marginTop: 100, marginBottom: 20 }}>Caution</p>
                <p className = "how-it-work-text">Before buying cryptocurrencies and NFTs, conduct your own research, understand fully what it is you are buying into and how it works exactly. Never share your E-wallet seed phrase with anyone. The crypto and NFTs in your wallet are your responsibility</p>
            </div>
            <div className = "how-it-work-footer-wrap">
                <Footer/>
            </div>
            </div>
        </DocumentTitle>
    )
}

export default HowTo;