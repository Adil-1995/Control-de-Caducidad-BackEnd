/*
       Ruta => /api/producctos 
*/

const {check} = require('express-validator');
const {Router} = require('express');
const { getProductos, anadirProductos, actualizarProductos, borrarProducto } = require('../controllers/productos');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Rutas
router.get('/', getProductos);

router.post('/',  
        [
            check('codigo', 'El código es obligatorio').not().isEmpty(),
            check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
            check('fechaCaducidad' , 'La fecha de Caducidad es obligatoria').isDate(),
            validarCampos,
        ], 
        anadirProductos);

 router.post('/:id', 
     [
      
        check('fechaCaducidad' , 'La fecha de Caducidad es obligatoria').isDate(),
        validarCampos,
     ],
     actualizarProductos
 
 
 );

 router.delete('/:id',
          borrarProducto
 
 
 );



module.exports= router