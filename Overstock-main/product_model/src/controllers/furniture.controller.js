const express = require("express");

const LivingRoom = require("../models/user.models");

const router = express.Router();

router.get("", async (req, res) => {
    try {
      const livingroom = await LivingRoom.find().lean().exec();
  
      return res.status(200).send(livingroom);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const livingroom = await LivingRoom.findById(req.params.id).lean().exec();
  
      return res.status(200).send(livingroom);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  router.post("", async (req,res) => {
   // req.body.userId = req.userId  
    try{
        const livingroom = await LivingRoom.create(req.body)
        return res.status(200).send(livingroom) 
         }
      catch(err){
        return res.status(500).send({ message: err.message });
      }
  })

  module.exports = router