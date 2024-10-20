export class EditTaskDto{
    
    TicketID:string;
    Description:string;
    Status:boolean;
    Date:Date;

    constructor(TickedID:string, Description:string, Status:boolean, Date:Date)
    {
        this.TicketID = TickedID;
        this.Description = Description;
        this.Status = Status;
        this.Date = Date;
    }

}