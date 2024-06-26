interface TaskItemFiledDto<T>{
    operationType: number,
    path: string,
    op: string,
    from?: string,
    value: T
}