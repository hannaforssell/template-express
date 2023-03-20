const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

/* GET cars. */
router.get('/', carController.getMany);

/* GET car. */
router.get('/:id', carController.get);
  
/* POST car */
router.post('/', carController.create);

/* PUT car */
router.put('/:id', carController.replace);

/* DELETE car */
router.delete('/:id', carController.remove);

module.exports = router;
