"use client"

import React, {createContext, useContext, useState} from "react";

interface Props {
    children: React.ReactNode;
  }

  interface GlobalContextProps{
    theme:string
  }

const GlobalContext = createContext<GlobalContextProps>();
export const GlobalUpdateContext = createContext(undefined);

export const GlobalProvider =({children}:Props)=>{
    const [selectedTheme, setSelectedTheme] = useState(0);
    
    return(
        <GlobalCon
        <GlobalContext.Provider value={{theme}:GlobalContextProps}>
            <GlobalUpdateContext.Provider value={useGlobalState}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);