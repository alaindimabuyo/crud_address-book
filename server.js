const express = require("express");
//call the db
const connectDB = require("./config/db");
//initialize express
const app = express();

const path = require('path')

//connect db
connectDB();

//init middleware
app.use(express.json({ extended: false }));
//add endpoint
//app.get("/", (req, res) => res.json({ msg: "WELCOMEEE" }));

//define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))

    app.get('*'), (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
