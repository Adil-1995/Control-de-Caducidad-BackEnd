const {response} = require("express");
const Producto = require("../model/productos");


const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;

    const regex = new RegExp(busqueda, 'i')

    const producto = await Producto.find({

        $or:[
            {descripcion: regex},
            {codigo:regex},
            {proveedor:regex},
        
        ]
 
    });


    try {

        res.json({
            ok: true,
            producto
        })

    } catch (error) {
        console.log(error);
        res.stutus(500).json({
            ok: false,
            msg: 'no hay resultados'
        })
    }


}


module.exports = {
    getTodo
}





