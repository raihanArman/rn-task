import { NetworkContextProps } from "@/utils/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export const NetworkContext = createContext<NetworkContextProps>({
    isOnline: false,
})


export const NetworkProvider = ({ children }: { children: ReactNode }) => {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsOnline(state.isConnected ?? false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <NetworkContext.Provider value={{ isOnline }}>
            {children}
        </NetworkContext.Provider>
    )
}


export const useNetwork = () => useContext(NetworkContext)

