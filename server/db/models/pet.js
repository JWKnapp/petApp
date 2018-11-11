const Sequelize = require('sequelize')
const db = require('../db')

const Pet = db.define('pet', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
  },
  weight: {
    type: Sequelize.INTEGER,
  },
  age: {
    type: Sequelize.INTEGER
  },
  issues: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  perscriptions: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  notes: {
    type: Sequelize.TEXT
  },
  picUrl: {
    type: Sequelize.TEXT
  }
})

module.exports = Pet
