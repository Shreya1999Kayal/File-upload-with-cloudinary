const express = require('express')
const router = express.Router()


const empejscontroller = require('../controllers/empControllers.js')
const upload = require('../utils/empuploadspic.js');

router.get('/employee/list',empejscontroller.index)

router.get('/employee/add', empejscontroller.addEmployee)
router.post('/employee/store', upload.single('image'), empejscontroller.storeEmployee)

router.get('/employee/edit/:id', empejscontroller.editEmployee)
router.post('/employee/update/:id', upload.single('image'), empejscontroller.updateEmployee)

// permanent delete
router.get('/employee/delete/:id', empejscontroller.deleteEmployee)

// soft delete
router.get('/employee/softdelete/:id', empejscontroller.softdeleteEmployee)

// filters
router.get('/employee/active', empejscontroller.activeEmployee)
router.get('/employee/inactive', empejscontroller.inactiveEmployee)






module.exports = router