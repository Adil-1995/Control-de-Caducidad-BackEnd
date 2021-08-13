const {Schema,model}= require('mongoose');

const ProductosSchema = Schema({
        codigo: {
            type:String,
            required: true,
            unique: true
        },
        descripcion:{
            type:String,
            required: true
        },
        proveedor:{
            type:String,
            
        },
        fechaCaducidad:{
            type:Date,
            required: true
        }


    });

    //Extraer __v  desde el objeto
    ProductosSchema.method('toJSON', function() {
        const { __v, ...object } = this.toObject();
        // object.codigo = _id;
        return object;
    })

    module.exports= model('Productos', ProductosSchema);