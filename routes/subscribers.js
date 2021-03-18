// 13. require express
const express = require('express');

// 14. require the router module
const router = express.Router();

// 21. require the subscriber.js, use the capital letter to denote that it's the Model
const Subscriber = require('../models/subscriber');

// 16. Create the routes
/* 16.1 Understand what routes the app should have - Item "Understand what routes the app should have" in Excel */
/* 16.2 Create the shell for the routes (example of the shell of the routes - https://i.imgur.com/idle8Q7.png */

// 16.3 Create the Actual routes
// A, Get all
router.get('/', async (req, res) => {
    // 16.3.1.1 Create the test message res.send('Hello World');
    // 16.3.1.2 Install Rest Client for testing
    // 16.3.1.3 Create the file route.rest in the routes folder + go into route.rest file
    // 16.3.1.6 Delete the res.send above

    // 22. make the above AF as async

    try {
        // 23. find all the subscribers from db
        const subscribers = await Subscriber.find();
        // 24. res the json for all subscribers
        res.json(subscribers);
        // 25. wrap the sequence into try and catch
    } catch(err) {
        // 26. create the status (500; why 500 - because there is only one potential error scope here - the problems with the server), and error.message logs + test by adding some letter to "find"
        res.status(500).json({message: err.message});
        // 27. Make sure that I receive the empty array in Rest Client because there aren't any subscribers in it yet 
    }

});

// B, Get one
router.get('/:id', getSubscriber, (req, res) => {
    // 48. Send the subscriber
    res.send(res.subscriber);
});

// C, Create one
router.post('/', async (req, res) => {
    // 28. Do the create a record now, so that I can can do "get one"
    // 29. change the AF to async
    // 30. create the const for the new subscriber
    const subscriber = new Subscriber({
        // 31. Assign the two fields 
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });
    
    // 32. do try catch 
    try {
        // 33. save the new subscriber and assign it to the var newSubscriber
        const newSubscriber = await subscriber.save();

        // 34. Return the status (201 - special status for adding a record) + json
        res.status(201).json(newSubscriber);

    } catch(err) {
        // 35. Return the status (400 - the user did something wrong, i.e. they filled out the data incorrectly) + automated message
        res.status(400).json({ message: err.message });
        // 36. Go into RC
    }
});

// D, Update one

// 54. Specify the "segSubscriber" MW, specify async for AF
router.patch('/:id', getSubscriber, async (req, res) => {
    // 55. Check on whether the user is sending any data for either the name and the subscribedToChannel; in case that he does, use it to replace the data
    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
    } 

    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    } 
    // 56. Create the try-catch sequence 
    try {
        // 57. determine the updatedSubscribe and assign the current db record to it
        const updatedSubscriber = await res.subscriber.save();

        // 58. json back the subscriber
        res.json(updatedSubscriber);
    } catch(err) {
        // 59. The catch for status 400 because they are trying to pass in an imcompliant data field + automated json msg
        res.status(400).json({ message: err.message});
    }

    // 60. Test in RC: 1) valid option, 2) empty string for the error
});

// E, Delete one

// 49. Specify the "segSubscriber" MW, specify async for AF
router.delete('/:id', getSubscriber, async (req, res) => {
    // 50. create the try-catch sequence
    try {
        // 51. Remove the subscriber
        await res.subscriber.remove();
        // 52. Return the JSON msg with the confirmation
        res.json({ message: 'The subscriber has been deleted '});
    } catch(err) {
        // 53. return the msg on the server-related error
        res.status(500).json({ message: err.message });

    }
});

// 39. Create the middleware shell - https://i.imgur.com/BKHJv0k.png
async function getSubscriber(req, res, next) {
    // 40. Test the use of the middleware with the "console.log('Test')"" (https://i.imgur.com/2jPIEmo.png) + in the get all route (a. add it before the AF))
    // 42. determine the subscriber + without assigning the value
    let subscriber
    // 43. create the catch-try sequence
    try {
        // 44. get the subscriber by id
        subscriber = await Subscriber.findById(req.params.id);
        // 43. check for the existence of the subscriber and return 404 in case it doesn't exist
        if(subscriber == null){
            return res.status(404).json({ message: "Subscriber has not been found" });
        }
    } catch(err) {
        // 44. Return the automated message for the server problem
        return res.status(500).json({ message: err.message });
    }

    // 45. Place the above created let subscriber into res.subscriber so that I can specify 'res.subscriber" in the specific routes and thus access the local let subscriber which was created in this middleware
    res.subscriber = subscriber;

    // 46. Specify next to move to the next operation after this middleware
    next();
    // 47. test the middleware: a. place the getSubscriber into "get one", b. return "res.send(res.subscriber.name);", c. test in RC by specifying the ID call. - I should get two calls - 1) valid, 2) ID not found
};


// 15. Export the module
module.exports = router;