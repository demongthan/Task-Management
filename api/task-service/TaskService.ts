import { ApiV1 } from "../api";

export const GetAllTask=async():Promise<any>=>{
  const url:string="https://localhost:7279/api/Task/GetAllTask";

  return await ApiV1(url, "GET");
}

export const CreateTask=async(taskCreate:TaskCreateDto):Promise<any>=>{
  const url:string="https://localhost:7279/api/Task/CreateTask";

  return await ApiV1(url, "POST", taskCreate);
}

export const DeleteTask =async(id:string):Promise<any>=>{
  const url:string=`https://localhost:7279/api/Task/DeleteTask/${id}`

  return await ApiV1(url, "DELETE");
}