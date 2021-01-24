const Ticket = require('./ticket')


class TicketList {
  constructor(number) {
    this.lastNumber = 0

    this.pendings = []
    this.assigned = []
  }

  get nextTicket() {
    this.lastNumber++
    return this.lastNumber
  }

  // 3 que se veran en las tarjetas y 10 en el historial
  get last13() {
    return this.assigned.slice(0, 13)
  }

  createTicket() {
    const newTicket = new Ticket(this.nextTicket)
    this.pendings.push(newTicket)

    return newTicket
  }

  assignTicket(agent, desk) {
    if (this.pendings.length === 0) {
      return null
    }

    const nextTicket = this.pendings.shift()
    nextTicket.agent = agent
    nextTicket.desk = desk

    this.assigned.unshift(nextTicket)

    return nextTicket
  }
}

module.exports = TicketList