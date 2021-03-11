export interface IAsset{
    id: string;
    price: number;
    cryptoPrice: number;
    token: IToken;
    metadata: IMetadata;
    artist: IArtist;
    contract: IContract
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
}

interface IContract{
    chainId: string;
    contract: string;
    domainName: string;
    owner: string;
    version: string;
}