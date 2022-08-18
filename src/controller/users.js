import modelUser from "../config/modelDatabase/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import userVerify from "../config/modelDatabase/userVerify.js";

// nodemailer



export const getUser = async (req, res) => {
  try {
    const user = await modelUser.findAll();
    res.status(200).json({ msg: "Get User Berhasil", data: user });
  } catch (e) {
    console.log(e);
  }
};

// == REGISTER == 
export const Register = async (req, res) => {
  const { nama, email, password, confpassword } = req.body;
  const emailAdd = await modelUser.findOne({where:{ email : email}})

  if(emailAdd) return res.json({msg: "email anda telah terdaftar"})

  if (password !== confpassword)
    return res.status(400).json({ msg: "Password Tidak Sama" });

  const salt = await bcrypt.genSalt();
  const hasPassword = await bcrypt.hash(password, salt);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Please.. Verify your account ✔",
    html: `<p> Untuk menghindari spam pendaftaran akun kami menyarankan anda untuk mengaktifkan akun baru anda </p> <b> <a href="https://www.w3schools.com">Visit W3Schools</a> </b>`,
  });

  try {
   const user = await modelUser.create({
      nama: nama,
      email: email,
      password: hasPassword,
      isActivasi:false
    });
    const uniqueId = uuidv4() + user.id;
    await userVerify.create({
      uniqueId: uniqueId,
      emailUser: email,
    });
    res.status(200).json({msg: 'Berhasil mendaftar akun, Silahkan aktivasi akun anda', data: uniqueId})
  } catch (e) {
    console.log(e);
  }
};

export const Login = async (req, res) => {
  try {
    // Cek Email
    const user = await modelUser.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).json({ msg: "Email Anda Salah" });

    // Cek Password
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "Password Salah" });

    // mengambil data dari databases jika user berhasil login
    const userid = user.id;
    const nama = user.nama;
    const email = user.email;

    // membuat token dan memasukan informasi user ke delam token
    const accesToken = jwt.sign(
      { userid, nama, email },
      process.env.ACCES_TOKEN_SECRET,
      {
        expiresIn: "20S",
      }
    );

    // membuat token alternatif jika masa token sudah expire
    const refreshToken = jwt.sign(
      { userid, nama, email },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    // mengupdate refresh token yang ada didatabase yang sebelumnya kosong
    await modelUser.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userid,
        },
      }
    );

    // membuat cookie untuk menyimpan tokennya di sisi client
    res.cookie("token", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });

    // setelah semua berhasil, tampilkan respons token nya
    res.json({ accesToken });
  } catch (e) {
    res.status(400).json(e);
  }
};

export const logOut = async (req, res) => {
  try {
    const refreshToken = req.cookies.token;
    if (!refreshToken) return res.sendStatus(204);
    const user = await modelUser.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) return res.sendStatus(204);
    await modelUser.update(
      { refresh_token: null },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.clearCookie("token");
    return res.status(200).json({ msg: "Anda Telah Logout" });
  } catch (e) {
    console.log(e.message);
  }
};
