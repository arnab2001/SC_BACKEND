const router = require("express").Router();
const user = require('../Controllers/User');

const Events = require('../Controllers/Events');

//user APIs
router.post("/Register",user.UserRegistration);
router.post("/Login",user.Login);



// //
router.post('/AddEvent',Events.AddEvent);
router.delete('/DeleteEvent/:EventId',Events.DeleteEvent);
router.get('/GetAllEvents',Events.GetAllEvents);
router.get('/GetSpecificEvent/:EventId',Events.GetSpecificEvent);
router.patch('/UpdateEvent/:EventId',Events.UpdateEvent);




module.exports = router;
