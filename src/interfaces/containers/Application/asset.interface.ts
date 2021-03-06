import { CurrencyEnum } from '../../../constants/blockchain/currency';

export interface IAsset{
    id: string;
    price: number;
    cryptoPrice: number;
    token: IToken;
    metadata: IMetadata;
    artist: IArtist;
    contract: IContract;
    tradingTokenAddress: string;
    owner: string;
    onAuction: boolean;
    onSale: boolean;
    auctionEnd: string;
    currency: CurrencyEnum
}

interface IToken{
    contract: string;
    tokenId: string;
    count: number;
    available: number;
}

interface IMetadata{
    id: string;
    name: string;
    description: string;
    filename: string;
    mimetype: string;
    filePlaceholder: string;
}

interface IArtist{
    avatar: string;
    id: string;
    name: string;
    background: string;
    host?: string;
    instagram?: string;
    twitter?: string;
    spotify?: string;
    soundcloud?: string;
}

interface IContract{
    chainId: string;
    contract: string;
    domainName: string;
    owner: string;
    version: string;
}