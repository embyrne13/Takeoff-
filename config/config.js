require('dotenv').config()
module.exports = {
  development: {
    database: 'takeoff_development',
    dialect: 'postgres'
  },
  test: {
    database: 'takeoff_test',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
