const fs = require('fs');
const data = require("../data/data.json");

class Ticket{
    constructor(id, mandated){
        this.id = id;
        this.mandated = mandated;
    }       
}

class TicketControl{

    constructor(){    
        if(data.currentDate != new Date().toDateString()){
            this.initializeData();
        }

        this.lastTicket = data.lastTicket;
        this.currentDate = data.currentDate;
        this.tikets = data.tikets;
        this.last4Tickets = data.last4Tickets;
    }

     initializeData() {
        this.lastTicket = 0;
        this.currentDate = new Date().toDateString();
        this.tikets = [];
        this.last4Tickets = [];

        this.saveData();

        console.log("successfully data initialization");
     }

     getLastTicket(){
       return this.lastTicket;
    }

    getLast4Tickets(){
        return this.last4Tickets;
     }
 

    closeLastTicket(mandated){
    
        if(this.tikets.length != 0){
            
            let ticketId = this.tikets[0].id;

            this.tikets.shift();
            let closedTicket = new Ticket(ticketId,mandated);

            this.last4Tickets.unshift(closedTicket);

            if( this.last4Tickets.length > 4 )
            {
                this.last4Tickets.splice(-1,1);
            }

            this.saveData();
            return ticketId;
        }

        return "Ticket not found";
    }

     createNewTicket(){
         this.lastTicket += 1;
         let ticket = new Ticket(this.lastTicket,null);
         this.tikets.push(ticket);
         this.saveData();
         return this.lastTicket;
     }


    saveData() {
        console.log('Saving data');
        fs.writeFileSync("./server/data/data.json", JSON.stringify({ lastTicket: this.lastTicket, currentDate: this.currentDate, tikets: this.tikets , last4Tickets: this.last4Tickets}));
        
    }
}

module.exports = { TicketControl }