"use client"

import React, {createContext, useContext, useState} from "react";
import themes from "./themes";
import { CreateTask, DeleteTask, GetAllTask, UpdateTaskFiled } from "@/api/task-service/TaskService";
import { ApiReponse } from "@/api/api";
import { useUser } from "@clerk/nextjs";

interface Props {
    children: React.ReactNode;
}

export interface GlobalContextProps{
    theme:any,
    tasks:TaskItem[],
    isLoading:boolean,
    isLoadingItem:boolean,
    deleteTask: (id:string) => Promise<void>,
    idTaskItem:string,
    updateTask: (id:string, isCompleted:boolean) => Promise<void>,
    modal:boolean,
    openModal: () => void,
    closeModal: () => void,
    createTask:(taskCreateDto:TaskCreateDto) =>Promise<void>,
    isLoadingModal:boolean,
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingItem, setIsLoadingItem] = useState<boolean>(false);
    const [idTaskItem, setIdTaskItem] = useState<string>("");
    const [modal, setModal] = useState<boolean>(false);
    const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const deleteTask=async (id:string): Promise<void> =>{
        setIsLoadingItem(true);
        setIdTaskItem(id);

        await DeleteTask(id).then((res)=>{
            const result=tasks.filter(task=>task.id!==id);
            setTasks(result);
            setIsLoadingItem(false);
        })
    }

    const UpdateItemArray=(arr:TaskItem[], id:string, isCompleted:boolean):TaskItem[]=>{
        return arr.map(item =>item.id===id?{...item, isCompleted:isCompleted}:item);
    }

    const updateTask=async (id:string, isCompleted:boolean):Promise<void> =>{
        setIsLoadingItem(true);
        setIdTaskItem(id);

        const taskFiled:TaskItemFiledDto<boolean>[]=[{
            operationType: 0,
            path: "/IsCompleted",
            op: "replace",
            value: isCompleted
        }];

        await UpdateTaskFiled(id, taskFiled).then((res)=>{
            setTasks(UpdateItemArray(tasks, id, isCompleted));
            setIsLoadingItem(false);
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

    const createTask =async (taskCreate:TaskCreateDto)=>{
        setIsLoadingModal(true);

        await CreateTask(taskCreate).then(res=>{
            const responseObj:ApiReponse={
                obj:res.data,
                message:res.message
            }

            console.log(responseObj)
            const result:TaskItem={ 
                deadlineDate:responseObj.obj.DdeadlineDate,
                description:responseObj.obj.Description,
                id: responseObj.obj.Id,
                isCompleted:responseObj.obj.IsCompleted,
                title:responseObj.obj.Iitle
            };

            setTasks(tasks.concat(result)); 
            setIsLoadingModal(false);
            setModal(false);
        });
    }

    React.useEffect(() => {
        if (user) {
            allTasks();
        };
    }, [user]);
    
    return(
        <GlobalContext.Provider value={{
            theme, 
            tasks, 
            isLoading, 
            isLoadingItem, 
            idTaskItem,
            deleteTask, 
            updateTask, 
            modal, 
            openModal, 
            closeModal, 
            createTask, 
            isLoadingModal}}>
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalContext);

export default GlobalProvider