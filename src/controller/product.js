import path from "path";
import modelProduct from "../config/modelDatabase/product.js";
import modelProductDetail from "../config/modelDatabase/detailProduct.js";
import fs from "fs";

export const getProducts = async (req, res) => {
  try {
    const products = await modelProduct.findAll({
      include: [
        {
          model: modelProductDetail,
        },
      ],
    });
    if (!products) throw new Error("Product empty");
    res.status(200).json({ msg: "Get Products Succsessfuly", data: products });
  } catch (e) {
    console.log(e.message);
  }
};

export const getProductsByid = async (req, res) => {
  try {
    const product = await modelProduct.findOne({
      include: [
        {
          model: modelProductDetail,
        },
      ],
      where: {
        id: req.params.id,
      },
    });
    if (!product) throw new Error("Product empty");
    res.json(product);
  } catch (e) {
    console.log(e.message);
  }
};

export const saveProduct = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" }); // validasi file

  const name = req.body.title; // get data nama product
  const file = req.files.file; // get data file
  const fileSize = file.data.length; // menentukan ukuran file
  const extention = path.extname(file.name); // convert nama image
  const fileName = file.md5 + Date.now() + extention; // convert nama image
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`; // mengatur nama url
  const allowedType = [".jpg", ".png", "jpeg"]; // format image

  if (!allowedType.includes(extention.toLowerCase()))
    // cek format image
    return res.status(422).json({ msg: "Gambar Harus .jpg .jpeg .png" });
  if (fileSize > 2000000)
    return res.json({ msg: "Gambar kebesaran boy maksimal 2MB boy" }); // cek max size image

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.json({ msg: err.message }); // memasukan image ke folder static public
  });

  try {
    await modelProduct.create({
      name: name,
      image: fileName,
      url: url,
    });
    res.status(201).json({ msg: "Data Berhasil Ditambahkan" });
  } catch (e) {
    console.log(e.message);
  }
};

export const updateProduct = async (req, res) => {
  const product = await modelProduct.findOne({
    where: { id: req.params.id },
  });

  if (!product) return res.status(404).json({ msg: "Data not found" });
  let fileName = "";

  if (req.files === null) {
    // jika update deengan image
    fileName = modelProduct.image;
  } else {
    // jika update tanpa image

    // defenisikan image baru
    const file = req.files.file;
    const fileSize = file.data.length;
    const extention = path.extname(file.name);
    fileName = file.md5 + Date.now() + extention;
    const allowedType = [".jpg", ".png", "jpeg"];

    if (!allowedType.includes(extention.toLowerCase()))
      return res.status(422).json({ msg: "Gambar Harus .jpg .jpeg .png" });
    if (fileSize > 2000000)
      return res.json({ msg: "Gambar kebesaran boy maksimal 2MB boy" });

    // hapus image lama di folder public
    const filePath = `./public/images/${product.image}`;
    fs.unlinkSync(filePath);

    // tambahkan image baru di folder public
    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.json({ msg: err.message });
    });
  }
  // defenisikan data terbaru
  const name = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  // update data ke database
  try {
    await modelProduct.update(
      {
        name: name,
        image: fileName,
        url: url,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.status(200).json({ msg: "Data berhasil di ubah" });
  } catch (e) {
    console.log(e.message);
  }
};


export const deleteProduct = async (req, res) => {
  const product = await modelProduct.findOne({
    where: { id: req.params.id },
  });
  const productDetail = await modelProductDetail.findOne({
    where: {
      id_products: req.params.id
    },
  });

  if (!product) return res.status(404).json({ msg: "data Not Found" });

  try {
    if(productDetail.id_products > 0){
      await modelProductDetail.destroy({
        where: {
          id: productDetail.id_products,
        },
      });
    }
    const filePath = `./public/images/${product.image}`; // hapus image dari folder public
    fs.unlinkSync(filePath);

    await modelProduct.destroy({
      // hapus data dari database
      where: { id: req.params.id },
    });

  
    res.status(200).json({ msg: "Data Berhasil di hapus" });


  } catch (e) {
    console.log(e.message);
  }

};
