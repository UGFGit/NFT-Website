import React from 'react';
import '../../static/styles/terms-of-service.scss';
import DocumentTitle from 'react-document-title';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

let URL = '';
const host = window.location.host;

if(host.includes('utopiagenesis')){
    URL = `https://${host}/`;
}

if(!URL){
    URL = `http://${host}/`;
}

function TermsOfService(){
    return (
        <DocumentTitle title="Terms of Service">
            <div className = "terms-of-service-root">
                <Navigation/>
                <div className = "terms-of-service-body">
                    <p className = "terms-of-service-body-title">Non Fungible Tokens (NFT) - Terms of Service</p>
                    <p className = "terms-of-service-body-text-wrap">Last modified: March 9th, 2020</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 20}}>
                        By accessing the website at <a href={URL}>{URL}</a> (the “Website”), you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                    </p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>PREAMBLE</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>These Terms of Service (the “Terms”) rule the purchase, the selling and the use of unique non-fungible tokens (each a “NFT”) to be generated through our Website (to “Mint”) by its users (each a “Minter”) and all the NFT related services offered on or through the Website (the “Services”). The Website is owned and operated by Utopia Genesis Stiftung, a Foundation duly incorporated under the laws of Switzerland, with registered office in Zählerweg, 12 - 6300 Zug, Switzerland (“Foundation”, “We” or “Us”).</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>For the use of the Services you may be asked to link your digital wallets on supported bridge extensions such as MetaMask (https://metamask.io/). MetaMask is an electronic wallet, which allows you to purchase, store, and engage in transactions using Ethereum cryptocurrency. Before putting up your NFT for selling or putting in an offer to purchase a NFT from another User, we will ask you to download a supported electronic wallet extension, and connect and unlock your digital wallets with that extension. Once you submit an order to sell or purchase an NFT, your order will be passed on to the applicable extension, which completes the transaction on your behalf.</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>THE TRANSACTIONS ON OUR WEBSITE THAT IMPLY THE USE OF CRYPTOCURRENCIES OR NFT ARE FACILITATED AND RUN BY THIRD-PARTY ELECTRONIC WALLET EXTENSIONS, AND BY USING OUR SERVICES YOU AGREE THAT YOU ARE GOVERNED BY THE TERMS OF SERVICE AND PRIVACY POLICY FOR THE APPLICABLE EXTENSIONS.</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>THE FOUNDATION IS NOT A BROKER, FINANCIAL INSTITUTION, OR CREDITOR. WE ONLY FACILITATE TRANSACTIONS BETWEEN THE BUYER AND SELLER OF NFT.</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>YOU BEAR FULL RESPONSIBILITY FOR VERIFYING THE IDENTITY, LEGITIMACY, AND AUTHENTICITY OF ASSETS YOU PURCHASE ON THE WEBSITE. THE FOUNDATION MAKES NO CLAIMS ABOUT THE IDENTITY, LEGITIMACY, OR AUTHENTICITY OF ASSETS ON THE PLATFORM.</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>1. DEFINITIONS</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>"Copyrights" means software, mobile software, algorithms, codes, audio, video, text, animations, files, photographs designs, graphics, layouts, images, video, information and their selection and arrangement distributed through the Website;</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>“Crypto Assets” refers to unique non-fungible tokens (NFT), implemented on the Ethereum blockchain (the “Ethereum Platform”) using smart contracts;</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>“Intellectual property rights or IPR” means Copyrights, patents, registered designs, design rights, database rights, trademarks, trade secrets, know-how or any other proprietary or industrial right, whether registered or unregistered;</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>“NFT” means a  unique non-fungible token generated with the aid of the blockchain technology;</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>"Services" means the NFT related services offered through the Website.</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>“Third-Party/Third-Parties” means any other natural who is not a User or a Visitor;</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>“Transactions” means payments or similar transactions made by Users for the Services;</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>“User” the Website. A User is allowed to use all the services of the Website;</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>“Visitor” shall mean a person or entity using the Website without having registered as a User.</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>“Website" means this website.</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>2. CREATING NFT</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>For the purposes of creating NFT through the Website, Users shall follow the NFT Creation Guide published on the Website.</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>We reserve the right to give access to the tools published on the Website for generating/creating NFT only to specific Users.</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>3. SELLING NFT</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>For the purposes of selling NFT through the Website, Users shall follow the NFT Selling Guide published on the Website.</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>We reserve the right to give access to the tools published on the Website for the selling NFT only to specific Users.</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>4. PURCHASING NFT</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 20}}>For the purchasing of NFT through the Website, Users shall follow the NFT Purchasing Guide published on the Website in order to meet all the technological requirements for completing the purchase of NFT.</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>5. PAYMENTS</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 20}}>We accept payments for the purchasing of NFT in cryptocurrencies $UOP, WETH</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>6. FEES</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>{`The fees applied by the Foundation related to the creating, selling and purchasing of NFT are published on the Website.
                        Fees may be collected by the Foundation through a smart contract or through a third party payment gateway.`}</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>7. USER CONTENT AND COPYRIGHT</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>You are solely responsible for your use of the Services and for any Content you provide, including compliance with applicable laws, rules, and regulations. We take no responsibility for the content posted or listed through the Service or used for the creating and selling of NFT.</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>You retain your rights to any content you submit, post, or display using the Services, including the created NFT.</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>By submitting, posting or displaying content on or through the Services, you grant the Foundation with a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such Content in any and all media or distribution methods (now known or later developed). This license authorizes us to make your Content available to the rest of the world and to let others do the same. You agree that this license includes the right for the Foundation to provide, promote, and improve the Services and to make Content submitted to or through the Services available to other companies, organizations or individuals for the distribution, promotion or publication of such Content on other media and services. Such additional uses by the Foundation, or other companies, organizations or individuals, may be made with no compensation paid to you with respect to the content that you submit, post, transmit or otherwise make available through the Services.</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>You represent and warrant that you have, or have obtained, all rights, licenses, consents, permissions, power and/or authority necessary to grant the rights granted herein for any content, Copyright, Intellectual Property Right, that you submit, post or display on or through the Services. You agree that such content will not contain material subject to copyright or other proprietary rights, unless you have necessary permission or are otherwise legally entitled to post the material and to grant the Foundation the license described above.</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>The Foundation reserves the right to remove content without prior notice. The Foundation will take down works in response to formal infringement claims and will terminate a user's access to the Services if the user is determined to be a repeat infringer.</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>If you believe that your content has been copied in a way that constitutes copyright infringement, please report this by contacting our designated copyright agent at:</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>Utopia Genesis Foundation</p>
                    <p className = "terms-of-service-body-text-wrap">Zählerweg 12 - 6300 Zug, Switzerland</p>
                    <p className = "terms-of-service-body-text-wrap">Email: <a href="mailto:legal@utopiagenesis.com">legal@utopiagenesis.com</a></p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>Formal infringement claims regarding content on the Services must include:</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>{`A written communication delivered to the agent designated above;
                        A physical or electronic signature of someone authorized to act on behalf of the copyright owner;
                        Identification of the copyrighted work(s) allegedly infringed;
                        Identification of material claimed to be infringing, reasonably sufficient to permit the Foundation to locate the material;
                        Information reasonably sufficient to permit the Foundation to contact the complaining party. A statement that the information in the notice is accurate and, under penalty of perjury, that the complaining party is authorized to act on behalf of the copyright owner.
                    `}</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>8. AVAILABILITY, SERVICE LIMITATIONS AND MODIFICATIONS</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 20}}>{`The Website and content may not be available in all territories and jurisdictions, and we may restrict or prohibit the use of all or a portion of the Website and content in certain territories and jurisdictions.

                        Moreover, since the Website is web-based, it might be subject to temporary downtime.

                        We will make reasonable efforts to keep the Services operational. However, certain technical difficulties or maintenance may, from time to time, result in temporary interruptions. To the extent permissible under applicable law, the Foundation reserves the right, periodically and at any time, to modify or discontinue, temporarily or permanently, functions and features of the Services, with or without notice, without liability to You, for any interruption, modification, or discontinuation of the Services or any function or feature thereof.
                    `}</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>9. DATA PROTECTION</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>In order to provide You with the Services, You acknowledge and agree that the Foundation may collect, store and process Your personal data and/or information. By accessing and/or using the Services, You have read, understood, and accepted the Foundation's terms of privacy policy, and You acknowledge and agree that the Foundation may use such data and/or information in accordance with the terms of its privacy policy.</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>10. INDEMNIFICATION</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>To the fullest extent permitted under applicable laws, You agree to hold harmless and indemnify the Foundation, its officers, shareholders, employees, agents, directors, subsidiaries, affiliates, successors, assigns, suppliers, or licensors from and against all third-party claims and all liabilities, damages, assessments, losses, costs, or expenses (including reasonable attorney fees) resulting from or arising out of (i) Your alleged or actual breach of these Terms, including, without limitation, Your express representations and warranties; (ii) Your alleged or actual use or misuse of the Services; and (ii) Your alleged or actual infringement or violation of any laws or of the rights of a third party.</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>11. LIMITATIONS OF LIABILITY</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>{`These Terms set out the full extent of our obligations and liabilities with respect to the Website. To the maximum extent possible by law, the Foundation excludes all and any warranty, guarantee and responsibility in relation to or subsequent to the website and its content.

                        The Foundation shall in particular not be liable for any damages of any kind, including loss of income or data, suffered by the visitor, the user or any other person, by act of the Foundation or of a third party. This includes any misuse that would be made of the visitor’s and/or user’s data, any virus or other forms of malware transmitted through the website or the server, as well as any non-compliance of users and/or visitors with these Terms. 

                        The Foundation shall have no liability for any personal injury, lost profits or other consequential, special, punitive, indirect, or incidental damages, arising from or related to your use or inability to use the website.
                    `}</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>12. RISK ASSUMPTION</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>You accept and acknowledge:</p>
                    <ul className = "terms-of-service-body-text-wrap">
                        <li>The prices of blockchain assets are extremely volatile. Fluctuations in the price of other digital assets could materially and adversely affect the Crypto Assets, which may also be subject to significant price volatility. We cannot guarantee that any purchasers of Crypto Assets will not lose money.</li>
                        <li>You are solely responsible for determining what, if any, taxes apply to your Crypto Assets transactions. Neither the Foundation nor any other Foundation Party is responsible for determining the taxes that apply to Crypto Assets transactions.</li>
                        <li>Our Service does not store, send, or receive Crypto Assets. This is because Crypto Assets exist only by virtue of the ownership record maintained on its supporting blockchain. Any transfer of Crypto Assets occurs within the supporting blockchain and not on this Service.</li>
                        <li>There are risks associated with using an Internet-based currency, including but not limited to, the risk of hardware, software and Internet connections, the risk of malicious software introduction, and the risk that third parties may obtain unauthorized access to information stored within your wallet. You accept and acknowledge that the Foundation will not be responsible for any communication failures, disruptions, errors, distortions or delays you may experience when using the Crypto Assets, however, caused.</li>
                        <li>A lack of use or public interest in the creation and development of distributed ecosystems could negatively impact the development of those ecosystems and related applications, and could therefore also negatively impact the potential utility or value of Crypto Assets.</li>
                        <li>The regulatory regime governing blockchain technologies, cryptocurrencies, and tokens is uncertain, and new regulations or policies may materially adversely affect the development of the Auction and/or Service and the utility of Crypto Assets.</li>
                        <li>The Service will rely on third-party platforms such as MetaMask to perform the transactions for the Auction of Crypto Assets. If we are unable to maintain a good relationship with such platform providers; if the terms and conditions or pricing of such platform providers change; if we violate or cannot comply with the terms and conditions of such platforms; or if any of such platforms lose market share or falls out of favour or is unavailable for a prolonged period of time, access to and use of the Service will suffer.</li>
                        <li>There are risks associated with purchasing user-generated content, including but not limited to, the risk of purchasing counterfeit assets, mislabeled assets, assets that are vulnerable to metadata decay, assets on smart contracts with bugs, and assets that may become untransferrable.</li>
                        <li>The Foundation reserves the right to hide collections, contracts, and assets affected by any of these issues or by other issues. Assets you purchase may become inaccessible on the Foundation. Under no circumstances shall the inability to view your assets on the Foundation serve as grounds for a claim against the Foundation.</li>
                    </ul>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>13. FORCE MAJEURE</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>The Foundation will not be deemed in default of these Terms to the extent that performance of its obligations is delayed or prevented by reason of any external force including, without limitation, war, insurrections, bank failures, strikes, fires, floods, earthquakes, labor disputes, epidemics, governmental regulations, freight embargoes, natural disaster, act of government or any other cause beyond Foundation’s reasonable control.</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>14. ENTIRE AGREEMENT & SEVERABILITY</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>These Terms, the Privacy Policy, the Cookies Policy, subject to any amendments or modifications made by the Foundation from time to time, shall constitute the entire agreement between you and the Foundation with respect to the use of the Website. If any provision of these Terms is found to be invalid by a court or competent jurisdiction, that provision only will be limited to the minimum extent necessary and the remaining provisions will remain in full force and effect.</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>15. NO WAIVER</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>The Foundation’s failure to enforce a provision of these Terms does not constitute a waiver of its right to do so in the future with respect to that provision, any other provision, or these Terms as a whole.</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>16. ASSIGNMENT</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>You may not assign any of your rights, licenses, or obligations under these Terms without the Foundation’s prior written consent. Any such attempt at assignment by you shall be void. The Foundation may assign its rights, licenses, and obligations under these Terms without limitation and without prior consent.</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>17. NO PARTNERSHIP</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>Nothing contained in this Terms of Service shall be deemed or construed to create a principal and agent, partnership or joint venture relationship between You and the Foundation.</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>18. GOVERNING LAW AND JURISDICTION</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>{`These Terms and your use of the Website, as well as all matters arising out of or in relation to them (including non-contractual disputes or claims and their interpretation), shall be governed by the laws of Switzerland. Any claim or dispute regarding these Terms or in relation to them shall (including for non-contractual disputes or claims and their interpretation) be subject to the exclusive jurisdiction of the Courts of Zug, Switzerland, subject to an appeal at the Swiss Federal Court.

                        You agree that any dispute is personal to you and the Foundation, and that any dispute shall only be resolved by an individual litigation and shall not be brought as a class action, or any other representative proceeding. You agree that a dispute cannot be brought as a class or representative action or on behalf of any other person or persons.

                        In case of dispute, you shall maintain the confidentiality of any proceedings, including but not limited to, any and all information gathered, prepared, and presented for purposes of the litigation or related to the dispute(s) therein.
                    `}</p>
                    <p className = "terms-of-service-body-title" style = {{marginTop: 20}}>19. CONTACT</p>
                    <p className = "terms-of-service-body-text-wrap" style = {{marginTop: 10}}>If You have any questions regarding these Terms, please contact us at <a href="mailto:legal@utopiagenesis.com">legal@utopiagenesis.com</a>.</p>
                </div>
                <div className = "terms-of-service-footer-wrap">
                    <Footer/>
                </div>
            </div>
        </DocumentTitle>
    )
}

export default TermsOfService;