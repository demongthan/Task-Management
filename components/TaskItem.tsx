"use client"

import { GlobalContextProps, useGlobalState } from '@/context/GlobalProvider';
import formatDate from '@/utils/FormatDate';
import React from 'react'
import styled from 'styled-components';
import { edit, trash } from "@/utils/Icons";
import parse from 'html-react-parser';
import LoadingPage from './LoadingPage';

interface Props {
    title: string;
    description: string;
    date: Date;
    isCompleted: boolean;
    id: string;
}

const TaskItem = ({ title, description, date, isCompleted, id }: Props) => {
    const { theme, isLoadingItem, idTaskItem,deleteTask, updateTask } = useGlobalState() as GlobalContextProps;
    
    return (
      <TaskItemStyled theme={theme}>
        {isLoadingItem && id===idTaskItem ? (<LoadingPage></LoadingPage>):
        (<><h1>{title}</h1>
        <p>{description}</p>
        <p className="date">{formatDate(date)}</p>
        <div className="task-footer">
          {isCompleted ? (
            <button
              className="completed"
              onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                event.preventDefault();
                
                updateTask(id, !isCompleted)
              }}
            >
              Completed
            </button>
          ) : (
            <button
              className="incomplete"
              onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                event.preventDefault();
                
                updateTask(id, !isCompleted)
              }}
            >
              Incomplete
            </button>
          )}
          <button className="edit">{parse(edit)}</button>
          <button
            className="delete"
            onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
              event.preventDefault();
              
              deleteTask(id)
            }}
          >
            {parse(trash)}
          </button>
        </div>
        </>)}
      </TaskItemStyled>
    );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`;

export default TaskItem