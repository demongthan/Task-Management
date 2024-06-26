import { ApiV1 } from "../api";

export const GetAllTask=async():Promise<any>=>{
  const url:string=`${process.env.NEXT_PUBLIC_API_URL}/GetAllTask`;

  return await ApiV1(url, "GET");
}

export const CreateTask=async(taskCreate:TaskCreateDto):Promise<any>=>{
  const url:string=`${process.env.NEXT_PUBLIC_API_URL}/CreateTask`;

  return await ApiV1(url, "POST", taskCreate);
}

export const DeleteTask =async(id:string):Promise<any>=>{
  const url:string=`${process.env.NEXT_PUBLIC_API_URL}/DeleteTask/${id}`

  return await ApiV1(url, "DELETE");
}

export const UpdateTaskFiled=async(id:string, taskUpdateFiled:TaskItemFiledDto<boolean>[]):Promise<any>=>{
  const url:string=`${process.env.NEXT_PUBLIC_API_URL}/UpdateTaskWithFiled/${id}`;

  return await ApiV1(url, "PATCH", taskUpdateFiled);
}