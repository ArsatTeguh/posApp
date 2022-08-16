import modelProductDetail from "../config/modelDatabase/detailProduct.js";
import modelProduct from "../config/modelDatabase/product.js";

export const getDetail = async (req, res) => {
  try {
    const productDetail = await modelProductDetail.findAll();
    res.status(200).json({ data: productDetail });
  } catch (e) {
    console.log(e.message);
  }
};

export const saveProductDetail = async (req, res) => {
  try {
    const product = await modelProduct.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!product)
      return res
        .status(404)
        .json({ msg: "product tidak ada detail tidak bisa di akses" });

    const deskripsi = req.body.deskripsi;
    const variant = req.body.variant;
    const id_products = product.id;
    
    const detailProduct = await modelProductDetail.create({
      id_products: id_products,
      deskripsi: deskripsi,
      variant: variant,
    });
    res.status(200).json({
      msg: "Detail product berhasil ditambahkan",
      data: detailProduct,
    });
  } catch (e) {
    console.log(e.message);
  }
};

export const updateProductDetail = async (req, res) => {
  const product = await modelProduct.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!product) return res.status(404).json({ msg: "Data Product tidak ada" });

  const deskripsi = req.body.deskripsi;
  const variant = req.body.variant;
  const id_products = product.id;

  try {
    await modelProductDetail.update(
      {
        id_products,
        deskripsi,
        variant,
      },
      {
        where: {
          id: product.id,
        },
      }
    );
    res.status(200).json({ msg: "product detail diubah" });
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteDetailProduct = async (req, res) => {
  try {
    const product = await modelProduct.findOne({
      where: {
        id: req.params.id,
      },
    });

    await modelProductDetail.destroy({
      where: {
        id: product.id,
      },
    });
    res.status(200).json({ msg: "Data Detail Dihapus" });
  } catch (e) {
    console.log(e.message);
  }
};
