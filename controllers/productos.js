
const { response } = require('express');
const Producto = require('../model/productos');




const getProductos= async (req, res)=>{

//Paginacion
    const desde = Number(req.query.desde) || 0;

    const [ productos, total] = await Promise.all([
          Producto
          .find({}, 'codigo descripcion proveedor fechaCaducidad' )
          .skip(desde)
          .limit(5),

          Producto.count()
    ]);

    res.json({
        ok:true,
        productos,
        total
    })
}

const anadirProductos=  async (req, res = response)=>{

    const {codigo, descripcion,proveedor,fechaCadicidad} = req.body;
    


    try {

        const existeCodigo = await Producto.findOne({codigo})

        if (existeCodigo) {
            return res.status(400).json({
                ok:false,
                msg: 'El producto ya esta registrado'
            });
            
        }

     const producto = new Producto(req.body);

      await producto.save();

    res.json({
        ok:true,
        producto
    })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error inesperado'
        })
        
    }

    
}

const actualizarProductos = async (req, res) =>{

   const idProducto = req.params.id;
   

    try {

        const productDB =  await Producto.findById(idProducto);

        if (!productDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un producto con este ID'
            });
            
        }

        // Actualizar solo la fecha
        const {codigo,descripcion,proveedor, ...campos} = req.body;
        

        const productoActualizado = await Producto.findByIdAndUpdate(idProducto, campos, {new: true})
        

        res.json({
            ok:true,
            producto: productoActualizado
        })


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error inesperado'
        })
    }

}

const borrarProducto = async (req, res) =>{
     
    const idProducto = req.params.id;

    try {

        const productDB =  await Producto.findById(idProducto);

        if (!productDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un producto con este ID'
            });
            
        }
        await Producto.findByIdAndDelete(idProducto)


        res.json({
            ok:true,
            msg: 'Producto eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error inesperado'
        })
    }
}

module.exports={
    getProductos,
    anadirProductos,
    actualizarProductos,
    borrarProducto
}