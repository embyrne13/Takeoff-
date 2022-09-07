'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    static associate(models) {
      Flight.belongsToMany(models.Ticket, {
        as: 'tickets',
        through: models.Ticket_flight,
        foreignKey: 'flightId'
      })
    }
  }
  Flight.init(
    {
      city: DataTypes.STRING,
      airport: DataTypes.STRING,
      country: DataTypes.STRING,
      date: DataTypes.DATE,
      origin: DataTypes.STRING,
      destination: DataTypes.STRING,
      departDay: DataTypes.DATE,
      departTime: DataTypes.TIME,
      arrivalTime: DataTypes.TIME,
      airline: DataTypes.STRING,
      duration: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Flight',
      tableName: 'flights'
    }
  )
  return Flight
}
