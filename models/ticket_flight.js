'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ticket_flight extends Model {
    static associate(models) {}
  }
  Ticket_flight.init(
    {
      ticketId: DataTypes.INTEGER,
      flightId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Ticket_flight',
      tableName: 'ticket_flights'
    }
  )
  return Ticket_flight
}
