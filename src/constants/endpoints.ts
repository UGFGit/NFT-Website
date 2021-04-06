//Filestore
export const FILESTORE = (name: string, triam = false) => `/api/filestore/${name}${triam ? '?triam=true': ''}`;
export const FILESTORE_UPLOAD = '/api/filestore/';

//Application
export const APPLICATION_CREATE = '/api/application/create';

//Blockchain
export const BLOCKCHAIN_NONCE = '/api/blockchain/nonce';
export const BLOCKCHAIN_BUY = '/api/blockchain/buy';

//Metadata
export const ASSETS = '/api/assets';
export const ASSETS_ONE = (id: string) => `/api/assets/${id}`;
export const ASSET_BIDS = "/api/assets/bids";
export const ASSET_BID_SET = "/api/assets/bids/set";
export const ASSET_BID_REMOVE = "/api/assets/bids/remove";
export const ASSET_BID_MAX_BID = "/api/assets/bids/max-bid";

//Artists
export const ARTISTS = '/api/artists';

//Host
export const HOST_CONFIG = '/api/host/config';
export const HOSTS = '/api/host';

//CryptoCompare
export const CRYPTO_COMPARE = '/api/cryptocompare';