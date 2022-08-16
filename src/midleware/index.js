import jwt from 'jsonwebtoken';


const verifyToken = (req,res,next) => {
    // Mengambil Token Dari Headers
    const autHeader = req.headers['authorization'];
    const token = autHeader && autHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    // lalu bandingkan token yang di dapatkan
    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (e,hasilDecoded) => {
        if(e) return res.sendStatus(403);
        req.email = hasilDecoded.email;
        next()
    })
}

export default verifyToken