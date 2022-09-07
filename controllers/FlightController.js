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

const findMatchingFlight = async (req, res) => {
  try {
    let flightQuery = req.query.name
    let flightFound = await Flight.findOne({
      where: { name: flightQuery },
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
  addFlight
}
