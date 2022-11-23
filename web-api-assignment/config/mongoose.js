
import mongoose from 'mongoose';


    const connect = {}

    connect.connectWithDB = async () => {
        
        mongoose.connection.on('error', err => {
            console.log(err)
        });
     
        mongoose.connection.on('connected', (err, res) => {
            console.log('Mongoose connection open');
        });
    
        mongoose.connection.on('disconnected', (err, res) => {
            console.log('mongoose disconnected')
        });

        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log('Mongosose connection is disconnected due to an application crash');
                process.exit(0);
            });
        });

    

        return mongoose.connect(process.env.DB_CONNECTION, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }



export default connect;


   