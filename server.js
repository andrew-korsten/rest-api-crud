// 9.4 Require the .env as the first import
require('dotenv').config();
// 1. require express
const express = require('express');
// 2. init the app with express
const app = express();
// 4. require mongoose
const mongoose = require('mongoose');



// 5. Connect to db via mongoose
// 6. Pass in { useNewUrlParser: true } in order to prevent the deprecation warning
// 9. Replace the actual URL with the .env var: 
// 9.1 delete the 'mongodb://localhost/subscribers' below + go into .env
// 9.2 In .env, specify DATABASE_URL = 'mongodb://localhost/subscribers';
// 9.3 Specify below as the URL - process.env.DATABASE_URL
// 9.4 Require the .env as the first import - require('dotenv').config();
mongoose.connect(`mongodb+srv://AndrewUser:${process.env.PASSWORD_DB}@cluster0.s5ozm.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`, 
    { useNewUrlParser: true, 
    useUnifiedTopology: true });

// 7. create the db const for the db
const db = mongoose.connection;

// 8. Set up the two event trackers for error and open
db.on('error', (error) => console.log(error));
db.on('open', () => console.log('Database connected'));

// 10. Enable the server to accept JSON
app.use(express.json());

// 11. Create the router + create the folder + the file
const subsribersRouter = require('./routes/subscribers');

// 12. create the middleware connection to the router + specify the path
app.use('/subscribers', subsribersRouter);


// 3. Create the listener for the port
// 3.1 create const PORT
const PORT = process.env.PORT || 3000;

// 3.2 listen to the port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


