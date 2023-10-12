const express = require('express')
const router = express.Router();


const{
    calculateGPA
} = require('../Controler/GpaControler')

router.post('/calculateGPA',calculateGPA)


module.exports = router