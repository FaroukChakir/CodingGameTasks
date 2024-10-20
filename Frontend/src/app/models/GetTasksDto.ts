export class GetTasksDto{
    
    ticketID:string;
    description:string;
    status:boolean;
    date:Date;

    constructor(TickedID:string, Description:string, Status:boolean, dateString: string)
    {
        this.ticketID = TickedID;
        this.description = Description;
        this.status = Status;
        this.date = new Date(dateString);
    }

}