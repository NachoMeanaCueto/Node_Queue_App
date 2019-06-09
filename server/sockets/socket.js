const { io } = require('../server');
const { TicketControl } = require('../classes/Ticket-Control');
const ticketControl = new TicketControl();


io.on('connection', (client) => {
    console.log('io connected succesfully');

    client.emit('CurrentStatus',  ticketControl.getLastTicket());



    client.on('disconnect', () => {
        console.log('io disconnected');
    });

    client.on('closelastTicket', (data, callback) => {
        
        if(data.mandated){
            let ticket = ticketControl.closeLastTicket(data.mandated);
            callback(ticket);

            client.broadcast.emit("last4", { last4: ticketControl.getLast4Tickets() });
        }
       
    });


    // Escuchar el cliente
    client.on('nextTicket', (data, callback) => {
        let last = ticketControl.createNewTicket();
        callback(`${last}`);

    });

});