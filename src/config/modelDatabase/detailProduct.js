import {Sequelize } from "sequelize";
import db from "../database/index.js";

const DataTypes = Sequelize;
const modelProductDetail = db.define(
  "product_detail",
  {
    id_products: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    variant: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);



export default modelProductDetail;



// (async () => {
//   await db.sync();
// })()