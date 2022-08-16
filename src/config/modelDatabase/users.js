import {Sequelize} from "sequelize"
import db from "../database/index.js";

const DataTypes = Sequelize
const modelUser = db.define('user',{
    'nama': {
        type : DataTypes.STRING,
    },
    'email': {
        type : DataTypes.STRING,
    },
    'password': {
        type : DataTypes.STRING,
    },
    'refresh_token': {
        type : DataTypes.TEXT,
    },
},{
    freezeTableName: true
});

export default modelUser;