const mongoose = require('mongoose');

const connectDB = async () => {
     try {
        await mongoose.connect(process.env.MONOGO_URL)
            console.log('connected to DB');

        }catch (error) {
            console.error('Error connecting to DB:', error);
            process.exit(1);
        }
}

module.exports = connectDB;
   
            
            