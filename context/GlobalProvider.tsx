"use client"

import React, {createContext, useContext, useState} from "react";
import themes from "./themes";

interface Props {
    children: React.ReactNode;
}

export interface GlobalContextProps{
    theme:any
}

interface GlobalUpdateContext{

}

export const GlobalContext=createContext<GlobalContextProps | undefined>(undefined);
export const GlobalUpdateContext = createContext<GlobalUpdateContext | undefined>(undefined);

export const GlobalProvider =({children}:Props)=>{
    const [selectedTheme, setSelectedTheme] = useState<number>(0);

    const theme = themes[selectedTheme];
    const [globalContextProps, useGlobalState]=useState<GlobalContextProps>({theme});

    
    return(
        <GlobalContext.Provider value={globalContextProps}>
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalContext);

export default GlobalProvider