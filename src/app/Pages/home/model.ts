export class response{
    data:any
    message:string
    status:boolean
}

export class Task{
    id:number
    title : string
    description:string
    isActive:boolean
    isDeleted:boolean
    status:number
    createdOn:string
    modifiedOn:string
}