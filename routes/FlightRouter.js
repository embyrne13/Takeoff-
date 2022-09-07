const Router = require('express').Router()
const controller = require('../controllers/FlightController')

Router.get('/', controller.findMatchingFlight)
Router.get('/allflights', controller.getFilteredFlights)
Router.get('/:flight_id', controller.getOneFlight)
Router.post('/', controller.addFlight)

module.exports = Router
