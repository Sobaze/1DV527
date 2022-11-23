import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = await req.header('auth-token');

    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).send('Invalid Token');
    }
}