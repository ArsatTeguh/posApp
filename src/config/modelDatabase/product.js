import {Sequelize } from "sequelize";
import db from "../database/index.js";
import modelProductDetail from "./detailProduct.js";

const DataTypes = Sequelize;
const modelProduct = db.define(
  "products",
  {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);  

export default modelProduct;

// ===== relations one to one dibuat di parrent table ======

// tabel perent ke forginKey tebel children
modelProduct.hasOne(modelProductDetail, {foreignKey: 'id_products'}); 
modelProductDetail.belongsTo(modelProduct, {foreignKey :'id_products'})



// (async () => {
//   await db.sync();
// })()
