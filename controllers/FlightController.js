const { Flight } = require('../models')
const { Op } = require('sequelize')

const getFilteredFlights = async (req, res) => {
  try {
    let flightQuery = req.query
    let Flights = await Flight.findAll({ raw: true })
    for (let [key, value] of Object.entries(flightQuery)) {
      Flights = Flights.filter((flight) =>
        flight[key].toLowerCase().includes(value.toLowerCase())
      )
    }
    res.send(Flights)
  } catch (error) {
    throw error
  }
}

const findFlight = async (req, res) => {
  try {
    let destination = req.params.destination
    const allFlight = await Flight.findAll({ destination: destination })
    res.send(allFlight)
  } catch (error) {
    throw error
  }
}
const findMatchingFlight = async (req, res) => {
  // try {
  //   const allFlight = await Flight.findAll()
  //   res.send(allFlight)
  // } catch (error) {
  //   throw error
  // }
  try {
    let flightDestination = req.query.destination
    let flightOrigin = req.query.origin
    let flightFound = await Flight.findOne({
      where: { destination: flightDestination, origin: flightOrigin },
      raw: true
    })
    if (flightFound) {
      res.send(flightFound)
    } else {
      res.send({ message: 'flight not in database' })
    }
  } catch (error) {
    throw error
  }
}

const getOneFlight = async (req, res) => {
  try {
    let flightId = parseInt(req.params.flight_id)
    const flight = await Flight.findByPk(flightId)
    res.send(flight)
  } catch (error) {
    throw error
  }
}
const addFlight = async (req, res) => {
  try {
    let create = await Flight.create(req.body)
    res.send(create)
  } catch (error) {
    throw error
  }
}
module.exports = {
  getFilteredFlights,
  findMatchingFlight,
  getOneFlight,
  addFlight,
  findFlight
}
