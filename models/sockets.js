const TicketList = require('./ticket-list');


class Sockets {

    constructor(io) {

        this.io = io;

        // Crear la instancia de nuestro ticketlist
        this.ticketList = new TicketList()

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {

            console.log('Cliente conectado')

            // Escuchar evento: mensaje-to-server
            socket.on('mensaje-to-server', (data) => {
                this.io.emit('mensaje-from-server', data);
            });

            socket.on('request-ticket', (data, callback) => {
                callback(this.ticketList.createTicket())
            })

            socket.on('next-ticket-to-attend', ({ agent, desk }, callback) => {
                callback(this.ticketList.assignTicket(agent, desk))
                // envío al front un aviso de nuevo ticket asignado
                this.io.emit('assigned-ticket', this.ticketList.last13)
            })
        });
    }


}


module.exports = Sockets;