export interface IApplication{
    id: string;
    nickname: string;
    email: string;
    address: string;
    price: number;
    cryptoPrice: number;
    filename: string;
    mimetype: string;
    name: string;
    description: string;
    tokens: IToken[];
    show: boolean;
}

export interface IToken{
    token: string;
    tokenId: string;
    sold: boolean;
    owner: string;
}