/*
        Ruta: /api/todo:busqueda

*/

const {Router} = require('express');
const { getTodo } = require('../controllers/busquedas');

const router = Router();


router.get('/:busqueda',getTodo)

module.exports = router ;