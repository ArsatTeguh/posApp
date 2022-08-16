import {Sequelize} from 'sequelize'

const db = new Sequelize('pos_db','root','',{
    dialect: 'mysql',
    host: 'localhost'
})

export default db;