const express = require("express");
var cors = require("cors");
var boardUtils = require("./handlers/boardUtils");
var cpu = require("./handlers/cpu");

// Creates the express server
const app = express();

// Middlewares process the requests before they get sent to our request handlers
// Initialize them here
app.use(cors());
app.use(express.json());

// Determines which port to listen to.
const PORT = process.env.PORT || 3000;

// Handlers for various API requests
app.use("/board", boardUtils);
app.use("/cpu", cpu);

// Starts the express server and sets a callback function for when startup finishes
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
