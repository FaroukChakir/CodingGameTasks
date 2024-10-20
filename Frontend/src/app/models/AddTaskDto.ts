export class AddTaskDto{
    Description:string;
    Status:boolean;
    Date:Date;

    constructor(Description:string, Status:boolean, Date:Date)
    {
        this.Description = Description;
        this.Status = Status;
        this.Date = Date;
    }

}