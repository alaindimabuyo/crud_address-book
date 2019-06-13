const express = require('express');

//initialize express
const app = express()

//add endpoint
app.get('/', (req, res) => res.json( {msg: "WELCOMEEE"}));

//define routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at ${PORT}`))