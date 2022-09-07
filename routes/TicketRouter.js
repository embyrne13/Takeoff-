const Router = require('express').Router()
const controller = require('../controllers/TicketController')

Router.get('/', controller.getTicket)
Router.get('/:flight_id', controller.getTicketByUser)
Router.get('/flights/:ticket_id', controller.getFlightsFromTicket)
Router.post('/:user_id', controller.createTicket)
Router.put('/:ticket_id', controller.updateTicket)
Router.delete('/:ticket_id', controller.deleteTicket)
Router.post('/addflight/:ticket_id/:flight_id', controller.addFlightsToTicket)
Router.delete(
  '/addflight/:ticket_id/:flight_id',
  controller.removeFlightFromTicket
)

module.exports = Router
