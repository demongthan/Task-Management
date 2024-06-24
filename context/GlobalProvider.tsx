"use client"

import React, {createContext, useContext, useState} from "react";
import themes from "./themes";
import { DeleteTask, GetAllTask } from "@/api/task-service/TaskService";
import { ApiReponse } from "@/api/api";
import { useUser } from "@clerk/nextjs";

interface Props {
    children: React.ReactNode;
}

export interface GlobalContextProps{
    theme:any,
    tasks:TaskItem[],
    isLoading:boolean
}

interface GlobalUpdateContext{

}



export const GlobalContext=createContext<GlobalContextProps | undefined>(undefined);
export const GlobalUpdateContext = createContext<GlobalUpdateContext | undefined>(undefined);

export const GlobalProvider =({children}:Props)=>{
    const [selectedTheme, setSelectedTheme] = useState<number>(0);
    const { user } = useUser();

    const theme = themes[selectedTheme];
    const [tasks] = useState<TaskItem[]>([]);
    const [isLoading] = useState(false);

    const [globalContextProps, setGlobalContextProps]=useState<GlobalContextProps>({theme, tasks, isLoading});

    const allTasks = async () => {
        setGlobalContextProps({...globalContextProps, isLoading:true});

        await GetAllTask().then(res=>{
            const responseObj:ApiReponse={
                obj:res.data,
                message:res.message
            }
  
            const result:TaskItem[]=responseObj.obj.map(({...item})=>({
                deadlineDate:item.DeadlineDate,
                description:item.Description,
                id: item.Id,
                isCompleted:item.IsCompleted,
                title:item.Title             
            }))

            setGlobalContextProps({...globalContextProps, isLoading:false, tasks:result});
        });
    };

    const deleteTask=async (id:string)=>{
        await DeleteTask(id).then((res)=>console.log(res))
    }

    React.useEffect(() => {
        if (user) allTasks();
    }, [user]);
    
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