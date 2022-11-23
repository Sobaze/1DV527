import UserModel from '../Models/users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { loginValidation } from '../routes/validate.js';



export const loginAuth = async (req, res) => {

    try {
        const { error } = await loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        const user = await UserModel.findOne({ username: req.body.username });
        
        if (!user) return res.status(400).res.send('Username or password incorrect');
        
        
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) res.status(400).send('Username or password incorrect');
    
        const token = jwt.sign({_id: user._id, exp: Math.floor(Date.now() / 1000 + (60 * 60)) }, process.env.TOKEN_SECRET );
        res.header('auth-token', token).send(token);
    
        res.send('Logged in')
    } catch(err) {
        res.status(500).send(err)
    }


}