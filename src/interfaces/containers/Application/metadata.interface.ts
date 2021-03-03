export interface IMetadata{
    id: string;
    artist: {
        name: string;
        avatar: string
    }
    price: number;
    cryptoPrice: number;
    filename: string;
    mimetype: string;
    name: string;
    description: string;
    tokens: IToken[];
}

export interface IToken{
    contract: string;
    tokenId: string;
    sold: boolean;
    owner: string;
}