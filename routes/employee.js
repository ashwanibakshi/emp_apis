const express           = require('express');
const empController     = require('../controllers/empControl');

const router = express.Router();

router.get('/showall',empController.showAll);
router.post('/addemp',empController.addEmp);
router.get('/edit/:id',empController.editEmp);
router.post('/update',empController.updateEmp);
router.delete('/delete/:id',empController.delete);
router.get('/zipcode/:zip',empController.filter);

module.exports = router;