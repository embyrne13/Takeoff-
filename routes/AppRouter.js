const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const TicketRouter = require('./TicketRouter')
const FlightRouter = require('./FlightRouter')

Router.use('/user', UserRouter)
Router.use('/ticket', TicketRouter)
Router.use('/flight', FlightRouter)

module.exports = Router
