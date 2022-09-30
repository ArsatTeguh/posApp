import {Sequelize, STRING} from "sequelize"
import db from "../database/index.js";

const DataTypes = Sequelize
const modelUser = db.define('user',{
    '_idUsers': {
        type: STRING
    },
    'nama': {
        type : DataTypes.STRING,
    },
    'email': {
        type : DataTypes.STRING,
    },
    'password': {
        type : DataTypes.STRING,
    },
    'isActivasi': {
        type : DataTypes.BOOLEAN,
        defaultValue: false,
    },
    'refresh_token': {
        type : DataTypes.TEXT,
    },

},{
    freezeTableName: true
});

export default modelUser;


// (async () => {
//     await db.sync();
//   })()