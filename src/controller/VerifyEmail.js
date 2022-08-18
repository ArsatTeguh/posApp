import userVerify from "../config/modelDatabase/userVerify.js";
import modelUser from "../config/modelDatabase/users.js";

export const isVerify = async (req, res) => {
  const uniqueId = req.params.uniqueId;

  try {
    const isActive = await userVerify.findOne({
      where: {
        uniqueId: uniqueId,
      },
    });
    if (!isActive)
      return res.json({ msg: "Silahkan Aktivasi Akun terlebih dahulu" });

    const user = await modelUser.findOne({
      where: { email: isActive.emailUser },
    });

    const { id, nama, email, password, isActivasi } = user;
    await modelUser.update(
      {
        nama,
        email,
        password,
        isActivasi: true,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({ msg: "Akun Anda telah di Aktivasi" });
  } catch (e) {
    res.json(e);
  }
};
