import React from "react";
import { AboutStore } from "./about/aboutStore";

type RootStateContextValue = {
    aboutStore: AboutStore;
}


const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue);
const aboutStore = new AboutStore();


export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <RootStateContext.Provider value={{ aboutStore }}>
            {children}
        </RootStateContext.Provider>
    )
}

export const useRootStore = () => React.useContext(RootStateContext);