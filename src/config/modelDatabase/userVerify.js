import {Sequelize} from "sequelize"
import db from "../database/index.js";

const DataTypes = Sequelize
const userVerify = db.define('userVerify',{
    'uniqueId': {
        type : DataTypes.STRING,
    },
    'emailUser': {
        type : DataTypes.STRING,
    },
},{
    freezeTableName: true
});

export default userVerify;


// (async () => {
//     await db.sync();
//   })()