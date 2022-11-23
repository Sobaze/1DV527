import UserModel from '../Models/users.js';
import { creationUserValidation } from '../routes/validate.js'

export const getUsers = async (req, res) => {

    try {
        UserModel.find().then(users => {
            res.send(users)
        })
    } catch (err) {
        res.status(403)
    } 
}

export const createUsers = (req ,res, next ) => {

    const { error } = creationUserValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    try {
        const user = req.body
        const createUserCredentials = new UserModel({
            username: user.username,
            password: user.password
        });

        createUserCredentials.save();
        res.send(`User ${user.username} has been added`);


    } catch (err) {
        res.status(403);
    }
    next();
}

export const getUserWithID = async (req, res) => {
    const { id } = req.params;
    const userFound = await UserModel.findById({_id: id});
    res.send(userFound);
}

export const deleteUser = async (req, res, next) => {
   const { id } = req.params;
   
   try {
    const userToDelete = await UserModel.findByIdAndDelete({_id: id});

    if(!userToDelete) {
        res.status(404).send('User not found');
    } else {
        res.status(200).send(`User with the id ${id} got deleted`);
    }
   } catch (err) {
       res.status(500).send(err);
   }
   next()
}

export const updateUser =  async (req, res, next) => {
    const { id } = req.params;

    const { username, password } = req.body;

    try {
        await UserModel.findByIdAndUpdate({_id: id},{
            username: username,
            password: password

        });

        res.send(`User with the id ${id} has been updated`);
    } catch(err) {
        res.status(500).send(err);
    }
    next()
}

