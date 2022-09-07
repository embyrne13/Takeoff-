const { Ticket, Flight, Ticket_flight } = require('../models')

const getTicket = async (req, res) => {
  try {
    const allTicket = await Ticket.findAll()
    res.send(allTicket)
  } catch (error) {
    throw error
  }
}

const getTicketByUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    const userTicket = await Ticket.findAll({
      where: { userId: userId },
      include: { model: Flight, as: 'flights', through: { attributes: [] } }
    })
    res.send(userTicket)
  } catch (error) {
    throw error
  }
}

const getFlightsFromTicket = async (req, res) => {
  let ticketId = parseInt(req.params.ticket_id)
  const flightList = await Ticket.findAll({
    where: { id: ticketId },
    include: { model: Flight, as: 'flights', through: { attributes: [] } }
  })
  res.send(flightList)
}

const createTicket = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let ticketBody = {
      userId,
      ...req.body
    }
    let create = await Ticket.create(ticketBody)
    res.send(create)
  } catch (error) {
    throw error
  }
}

const updateTicket = async (req, res) => {
  try {
    let ticket_id = parseInt(req.params.ticket_id)
    let newTicket = await Ticket.update(
      { title: req.body.title },
      {
        where: {
          id: ticket_id
        },
        returning: true
      }
    )
    res.send(newTicket)
  } catch (error) {
    throw error
  }
}

const addFlightsToTicket = async (req, res) => {
  try {
    let ticketId = parseInt(req.params.ticket_id)
    let flightId = parseInt(req.params.flight_id)
    let currentTk = await Ticket.findByPk(ticketId, {
      include: { model: Flight, as: 'flights', through: { attributes: [] } }
    })
    let currentFlight = currentTk.flights
    if (!currentFlight.some((flight) => flight.id === flightId)) {
      let ticket_flight = {
        ticketId,
        flightId
      }
      const flightAssociation = await Ticket_flight.create(ticket_flight)
      res.send(flightAssociation)
    } else {
      res.send({ message: 'FLight already has ticket' })
    }
  } catch (error) {
    throw error
  }
}

const removeFlightFromTicket = async (req, res) => {
  try {
    let ticketId = parseInt(req.params.ticket_id)
    let flightId = parseInt(req.params.flight_id)
    let ticket_flight = await Ticket_flight.findOne({
      where: { ticketId: ticketId, flightId: flightId }
    })
    if (ticket_flight) {
      await Ticket_flight.destroy({
        where: { ticketId: ticketId, flightId: flightId }
      })
      res.send({ message: `Flight deleted` })
    } else {
      res.send({ message: `Error, flight not found/unable to delete.` })
    }
  } catch (error) {
    throw error
  }
}

const deleteTicket = async (req, res) => {
  try {
    let ticketId = parseInt(req.params.ticket_id)
    await Ticket.destroy({
      where: {
        id: ticketId
      }
    })
    res.send({ msg: 'Ticket has been cancelled!' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  getTicket,
  getTicketByUser,
  getFlightsFromTicket,
  createTicket,
  updateTicket,
  addFlightsToTicket,
  removeFlightFromTicket,
  deleteTicket
}
