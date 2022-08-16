import modelUser from '../config/modelDatabase/users.js';
import jwt from 'jsonwebtoken'

export const refreshToken = async(req,res) => {
    try {
       const refreshToken = req.cookies.token
        if(!refreshToken) return res.sendStatus(401);
        const user = await modelUser.findOne({
            where : {
                refresh_token : refreshToken
            }
        });

        if(!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (e,hasilDecoded) => {
            if(e) return res.sendStatus(403);
            const userid = user.id
            const nama = user.nama
            const email = user.email
            const accesToken = jwt.sign({userid,nama,email}, process.env.ACCES_TOKEN_SECRET, {
                expiresIn : '20s'
            });
            res.json({accesToken})
        })
    } catch (e) {
        console.log(e)
    }
}