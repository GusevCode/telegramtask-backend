const express = require('express');
const clientController = require('../../controllers/clientController');

const router = express.Router();

router.get('/', clientController.getAllClients);
router.get('/:clientId', clientController.getOneClient);
router.post('/', clientController.createNewClient);
router.patch('/:clientId', clientController.updateOneClient);
router.delete('/:clientId', clientController.deleteOneClient);

module.exports = router;
