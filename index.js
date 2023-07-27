const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/tracker");

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//connect with mongodb
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((_) => {
  console.log("Mongodb Connection Successful!");
})
.catch((err) => {
  console.log("Error in connecting the db",err)
})

app.use("/api/users", bodyParser.urlencoded({extended: false}))
app.use("/api/users",routes);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
