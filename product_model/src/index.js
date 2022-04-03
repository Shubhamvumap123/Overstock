const express = require("express");
var cors = require("cors");


const livingRoomController = require("./controllers/furniture.controller")
const app = express();

app.use(express.json());
app.use(cors());


app.use("/products",livingRoomController)

module.exports = app;
