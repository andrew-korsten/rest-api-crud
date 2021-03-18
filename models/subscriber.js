// 17. require mongoose
const mongoose = require('mongoose');

// 18. create the schema
/* 18.1 create the schema shell for the data fields to be used - https://i.imgur.com/o4EMRX2.png */
const subscriberSchema = new mongoose.Schema({
    name: {
        // 18.2. Specify the data for the name field - string, required - true
        type: String,
        required: true
    },
    subscribedToChannel: {
        // 18.3. Specify the data for the subscrived field - string, required - true
        type: String,
        required: true
    },
    subscribeDate: {
        // 18.4. Specify the data for the date field - date, required - true + default for date.now     
        type: Date,
        required: true,
        default: Date.now
    }
});

// 19. Export the schema, the first param is the DB name, and the second one is the Schema name
module.exports = mongoose.model('Subscriber', subscriberSchema);

// 20. require in the subscribers.js

