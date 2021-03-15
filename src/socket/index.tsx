import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'socket.io-client';
import { useSnackbar } from 'notistack';

const SocketContext = React.createContext<SocketIOClient.Socket|null|undefined>(null);

let URL = '';
const host = window.location.host;

if(host.includes('localhost')){
    URL = 'http://localhost:50000/';
}

if(host.includes('utopiagenesis')){
    URL = `https://${host}/`;
}

if(!URL){
    URL = `http://${host}/`;
}

const SOCKET_OPTIONS: SocketIOClient.ConnectOpts = {
    transports: ['websocket'],
    secure: window.location.href.includes('https://')
};

interface SocketProviderProps{
    children: React.ReactNode;
}

export const SocketProvider = ({children}: SocketProviderProps ) => {
    const [socket, setSocket] = useState<SocketIOClient.Socket|null>();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const newSocket = connect(URL, SOCKET_OPTIONS);

        setSocket(newSocket);

        newSocket.on('disconnect', () => {
            enqueueSnackbar("Server not available", { variant: 'warning' })
        })
    
        return () => {
            setSocket(null);
            newSocket.disconnect();
        };
    }, []);

    return(
        <SocketContext.Provider value = {socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    return useContext(SocketContext);
};