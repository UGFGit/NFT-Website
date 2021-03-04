import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'socket.io-client';

const SocketContext = React.createContext<SocketIOClient.Socket|null|undefined>(null);

const URL = 'http://13.48.56.189/';
//const URL = 'http://localhost:50000/';

const SOCKET_OPTIONS: SocketIOClient.ConnectOpts = {
    transports: ['websocket'],
};

interface SocketProviderProps{
    children: React.ReactNode;
}

export const SocketProvider = ({children}: SocketProviderProps ) => {
    const [socket, setSocket] = useState<SocketIOClient.Socket|null>();

    useEffect(() => {
        const newSocket = connect(URL, SOCKET_OPTIONS);

        setSocket(newSocket);
    
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