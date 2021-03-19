import React from 'react';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';
import Footer from '../../components/Footer';
import '../../static/styles/faq.scss';
import Accordion from '../../components/Accordion';

function Faq(){
    return(
        <DocumentTitle title="Faq">
            <div className = "faq-root">
                <Navigation location = {LocationEnum.FAQ}/>
                <div className = "faq-body">
                    <p className='title'>Frequently Asked Questions</p>

                    <div className = "accordion-wrap">
                        <Accordion
                            title = "What is Genesis Arts?"
                            text = "Genesis Arts is a music-centric NFT store and platform."
                        />
                        <Accordion
                            title = "Why music-centric?"
                            text = "Our mission going forward is to provide the infrastructure, tools, and funding needed for the development, maintenance, and growth of the music industry ecosystem."
                        />
                        <Accordion
                            title = 'What is an NFT?'
                            text = "A non-fungible token (NFT) is a digital certificate for intellectual property stored on the blockchain. The token is unhackable and 100% confirms the scarcity and ownership of that intellectual property. NFTs can be digital assets, images, gifs, animations, music, etc."
                        />
                        <Accordion
                            title = 'How do I upload my NFTs to Genesis Arts.'
                            text = "Our curated platform is by application for now. Via our on-site application form, you can fill out your details and upload your NFT (up to 30mbs) and the team will help you from there in terms of minting your NFT."
                        />
                        <Accordion
                            title = 'What is minting?'
                            text = "The process of tokenizing your work and creating an NFT."
                        />
                        <Accordion
                            title = 'What is tokenizing?'
                            text = "Tokenization refers to the process of issuing a blockchain token that digitally represents a real tradable asset"
                        />
                        <Accordion
                            title = 'How do I buy cryptocurrency to purchase NFTs?'
                            text = "Install an E-wallet (see below) like Metamask on your browser and purchase crypto directly from the Metamask extension with your credit card. We support our own UOP and WETH."
                        />
                        <Accordion
                            title = 'What is the UOP token?'
                            text = "The UOP token is very own token here at Genesis arts. It was launched December 16th 2020 and is available via Bitfinex and Sushiswap. It is the backbone of the Utopia Genesis Foundations forth-coming products."
                        />
                        <Accordion
                            title = 'What is an E-wallet?'
                            text = "This is where you store your cryptocurrencies or digital assets. It can be either an application or a hardware wallet. Popular choices include MetaMask, Coinbase Wallet and TrustWallet."
                        />
                        <Accordion
                            title = 'What is an E-wallet address?'
                            text = "Your wallet address is unique. It’s the address people give out as an account number but in this case its how you get your cryptocurrencies and NFTs. When creating a wallet you will receive a seed phrase. This seed phrase is the only way to recover your wallet and crypto if your hard wallet is damaged or you have forgotten your password. It's best to write this down and store somewhere safe where you can access it at any time.Do not store this seed phrase on the cloud or share it with anyone."
                        />
                        <Accordion
                            title = 'How do I buy fixed-price NFTs?'
                            text = "For items with a fixed price, press the Buy Now button and follow the prompts in your wallet. Once the transaction is complete, the item will immediately transfer to your wallet and the seller will receive the funds."
                        />
                        <Accordion
                            title = 'How do I take part in an NFT auction?'
                            text = "Please refer to our “How it works” page for further details."
                        />
                        <Accordion
                            title = 'How do I get my own Subdomain?'
                            text = "Once reviewed/accepted, it can take circa 24 - 48hrs to deploy a subdomain for you. From there you upload the NFTs to the Ethereum blockchain."
                        />
                        <Accordion
                            title = 'What is the cost for deploying NFTs on Genesis Arts?'
                            text = "We charge 10% on primary sales and 5% on forth-coming secondary sales (secondary sales contract are forth-coming for start of April) towards our operation and objectives. Gas fees (see below) are covered on our side for the NFT creator. NFT buyers need to cover their own gas fees. Our mission going forward is to provide the infrastructure, tools, and funding needed for the development, maintenance, and growth of the music industry ecosystem."
                        />
                        <Accordion
                            title = 'What are Gas Fees?'
                            text = "Gas fees are like transaction fees. When you transfer crypto to another wallet or purchase a digital collectible on Genesis Arts, a buyer will need enough ETH in their wallet to cover the network cost."
                        />
                        <Accordion
                            title = 'Who pays the Gas fees?'
                            text = "To support the music ecosystem, Genesis Arts will cover the gas fees for NFT suppliers only on the basis the NFT drop is sufficient in volume. This will be pre-agreed between Genesis Arts and the NFT supplier."
                        />
                        <Accordion
                            title = 'What cryptocurrencies do you accept?'
                            text = "We accept our own and recommended token $UOP (available on Bitfinex and Sushiswap) as well as WETH (Wrapped Ethereum - it allows users to make pre-authorized bids that can be fulfilled at a later date without any further action from the bidder). Currently it is not possible to use non-crypto currencies like USD and the Euro, however you can swap these currencies for crypto currencies easily on E-wallets like MetaMask."
                        />
                        <Accordion
                            title = 'If I create NFTs on Genesis Arts. Can it be transferred to another platform?'
                            text = "As soon it is purchased, ownership changes thus it can be transferred to another platform that is built on the Ethereum protocol."
                        />
                        <Accordion
                            title = 'How do I see my NFTs?'
                            text = "You will see them on our website and also in the E-Wallet of your choice. We recommend MetaMask, Trust Wallet, or CoinBase Wallet for example."
                        />
                        <Accordion
                            title = 'Caution'
                            text = "Before investing in cryptocurrencies and NFTs, conduct your own research, understand fully what it is you are buying into and how it works exactly. Never share your E-wallet seed phrase with anyone. The crypto and NFTs in your wallet are your responsibility"
                        />
                    </div>
                </div>
                <Footer/>
            </div>
        </DocumentTitle>
    )
}

export default Faq;