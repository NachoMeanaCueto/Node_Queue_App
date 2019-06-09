
var socket = io();
var lab = $("#lblNuevoTicket");
var labTickets = [$("#lblTicket1"),$("#lblTicket2"),$("#lblTicket3"),$("#lblTicket4")];
var lblMandated = [$("#lblEscritorio1"),$("#lblEscritorio2"),$("#lblEscritorio3"),$("#lblEscritorio4")];

var searchparams = new URLSearchParams(window.location.search);

socket.on("connect",function(){
    console.log('Connected succesfully');
});

socket.on("disconnect",function(){
    console.log('Connection lost');
});

socket.on("updateCurrentTicket",function( data ){
    console.log('CurrentTicket: ',data);
});

socket.on("CurrentStatus",function( data ){
    setLabtext(data)
});

socket.on("last4",function( data ){
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    setTicketList(data.last4);
});

$("#btnNewTicket").on("click", function(){
    socket.emit('nextTicket', null , function(currentTicket){
        setLabtext(currentTicket)
         });
});

$("#btnCloseTicket").on("click", function(){

    if(searchparams.has("escritorio")){
        let mandated = searchparams.get("escritorio");
        socket.emit('closelastTicket', { mandated } , function(currentTicket){
            setTicketText(currentTicket);
        })
    }

});


function setLabtext(text){
    lab.text(`Current ticket: ${text}`);
}

function setTicketText(text){
    $("#ticketvalue").text(`${text}`);
}

function setTicketList(last4Tickets){

    for(var i = 0; i < last4Tickets.length; i++){
        labTickets[i].text("ticket: " + last4Tickets[i].id);
        lblMandated[i].text("Encargado: "+ last4Tickets[i].mandated);
    }
}