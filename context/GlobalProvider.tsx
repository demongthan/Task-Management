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
    isLoading:boolean,
    deleteTask: (id:string) => Promise<void>;
}

interface GlobalUpdateContext{

}



export const GlobalContext=createContext<GlobalContextProps | undefined>(undefined);
export const GlobalUpdateContext = createContext<GlobalUpdateContext | undefined>(undefined);

export const GlobalProvider =({children}:Props)=>{
    const [selectedTheme, setSelectedTheme] = useState<number>(0);
    const { user } = useUser();

    const theme = themes[selectedTheme];
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const deleteTask=async (id:string): Promise<void> =>{
        setIsLoading(true);

        await DeleteTask(id).then((res)=>{
            const result=tasks.filter(task=>task.id!==id);
            setTasks(result);
            setIsLoading(false);
        })
    }

    const allTasks = async () :Promise<void>=> {
        setIsLoading(true);

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

            setTasks(result);
            setIsLoading(false);
        });
    };

    React.useEffect(() => {
        if (user) {
            allTasks();
        };
    }, [user]);
    
    return(
        <GlobalContext.Provider value={{theme, tasks, isLoading, deleteTask}}>
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalContext);

export default GlobalProvider