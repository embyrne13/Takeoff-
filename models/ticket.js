'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Ticket.belongsToMany(models.Flight, {
        as: 'tickets',
        through: models.Ticket_flight,
        foreignKey: 'ticketId'
      })
    }
  }
  Ticket.init(
    {
      flightDepartDate: DataTypes.DATE,
      flightArrivalDate: DataTypes.DATE,
      bookingDate: DataTypes.DATE,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      flightFare: DataTypes.STRING,
      refNumber: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Ticket',
      tableName: 'tickets'
    }
  )
  return Ticket
}
