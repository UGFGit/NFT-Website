//Filestore
export const FILESTORE = (name: string) => `/api/filestore/${name}`;
export const FILESTORE_UPLOAD = '/api/filestore/';

//Application
export const APPLICATION = '/api/application';
export const APPLICATION_BY_ID = (id: string) => `/api/application/:${id}`;
export const APPLICATION_CREATE = '/api/application/create';