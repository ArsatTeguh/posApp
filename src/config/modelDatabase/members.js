import {Sequelize, STRING} from "sequelize"
import db from "../database/index.js";

const DataTypes = Sequelize
const modelMembers = db.define('members',{
    '_idUsers': {
        type: STRING
    },
    '_idPenerima': {
        type : DataTypes.STRING,
    },

},{
    freezeTableName: true
});

export default modelMembers;


(async () => {
    await db.sync();
  })()