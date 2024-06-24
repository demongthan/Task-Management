"use client";

import { GlobalContextProps, useGlobalState } from '@/context/GlobalProvider';
import React, { useState } from 'react'
import styled from 'styled-components';
import TaskItem from './TaskItem';
import { GetAllTask } from '@/api/task-service/TaskService';
import { ApiReponse } from '@/api/api';
import LoadingPage from './LoadingPage';
import parse from 'html-react-parser';
import { add } from '@/utils/Icons';

interface Props {
    title: string;
  }

const Tasks = ({ title }: Props) => {
    const {theme}=useGlobalState() as GlobalContextProps;

    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [isLoading, setLoading] = useState(false);

    const allTasks = async () => {
        setLoading(true);
        await GetAllTask().then(res=>{
            const responseObj:ApiReponse={
                obj:res.data,
                message:res.message
            }
  
            if(responseObj.obj !=undefined) {
                const result:TaskItem[]=responseObj.obj.map(({...item})=>({
                    deadlineDate:item.DeadlineDate,
                    description:item.Description,
                    id: item.Id,
                    isCompleted:item.IsCompleted,
                    title:item.Title             
                }))
                setTasks(result);
                console.log(tasks);
                setLoading(false)
            }
        });
    };
  
    React.useEffect(() => {
        allTasks();
    },[]);

    return (
    <TaskStyled theme={theme}>
        <h1>{title}</h1>

        {isLoading?(<LoadingPage></LoadingPage>):
        (
          <>
            <button className="btn-rounded" >
              yyyy
            </button>

            <div className="tasks grid">
            {tasks.map((task) => (
                <TaskItem
                key={task.id}
                title={task.title}
                description={task.description}
                date={task.deadlineDate}
                isCompleted={task.isCompleted}
                id={task.id}
                />
            ))}
            <button className="create-task" >
                {parse(add)}
                Add New Task
            </button>
            </div>
          </>
        )}
    </TaskStyled>
    );
}

const TaskStyled = styled.main`
  position: relative;
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .btn-rounded {
    position: fixed;
    top: 4.9rem;
    right: 5.1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    background-color: ${(props) => props.theme.colorBg};
    border: 2px solid ${(props) => props.theme.borderColor2};
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
      top: 3rem;
      right: 3.5rem;
    }
  }

  .tasks {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;