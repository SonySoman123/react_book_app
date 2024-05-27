const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({message: 'Server is running successfully'})

});
router.get('/test', (req, res, next) => {
    res.json({message: 'Server is running successfully'})

});
router.post('/pricing', (req, res, next) => {
    res.json({message: 'Server is running successfully'})

});


module.exports = router;