import Tarea from '../models/Tarea.js';
//import Usuario from '../models/Usuario.js';
import Cliente from '../models/Cliente.js';
import Comanda from '../models/Comanda.js';
import Producto from '../models/Producto.js';
import Usuario from '../models/Usuario.js';
import TipoTarea from '../models/TipoTarea.js';


const obtenerTareas = async (req, res) => {
    const tareas = await Tarea.find();
    res.json(tareas);
}

//PRODUCTOS
const obtenerProducto = async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
}

const eliminarProducto = async (req, res) => {
    const { _id } = req.body;
    const producto = await Producto.findById(_id);
    if (!producto) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    }
    try {
        const productos = await producto.deleteOne();
        res.json(productos);
    } catch (error) {
        res.json(error);
    }
}
const editarProducto = async (req, res) => {
    const { id } = req.body;
    const producto = await Producto.findById(id);
    if (!producto) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    }

    producto.nombre = req.body.nombre || producto.nombre;
    producto.descripcion = req.body.descripcion || producto.descripcion;
    producto.numero = req.body.numero || producto.numero;

    try {
        const productoAlmacenado = await producto.save();
        const productos = await Producto.find();
        res.json(productos)
    }

    catch (error) {
        res.json(error);
    }
}

//CUENTAS
const crearCliente = async (req, res) => {
    const cuenta = new Cliente(req.body);
    try {
        const nuevaCuenta = await cuenta.save();
        res.json(nuevaCuenta);
    } catch (error) {
        res.json(error);
    }
}

const editarCuenta = async (req, res) => {
    const { id } = req.body
    const cuenta = await Cliente.findById(id)
    if (!cuenta) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    }
    cuenta.nombre = req.body.nombre || cuenta.nombre;
    cuenta.siglas = req.body.siglas || cuenta.siglas;
    try {
        await cuenta.save();
        const cuentas = await Cliente.find();
        res.json(cuentas)
    } catch (error) {
        res.json(error)
    }
}

const eliminarCuenta = async (req, res) => {
    const { _id } = req.body;
    const cuenta = await Cliente.findById(_id);
    if (!cuenta) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    }
    try {
        const cuentas = await cuenta.deleteOne();
        res.json(cuentas);
    } catch (error) {
        res.json(error);
    }
}

const obtenerCliente = async (req, res) => {
    const cliente = await Cliente.find();
    res.json(cliente);
}

const obtenerUsuarios = async (req, res) => {
    const usuarios = await Usuario.find().select('-password -confirmado -token -createdAt -updatedAt -__v');
    res.json(usuarios)
}

const crearProducto = async (req, res) => {
    const producto = new Producto(req.body);
    try {
        const productoAlmacenado = await producto.save();
        res.json(productoAlmacenado);
    } catch (error) {
        res.json(error);
    }
}


const crearComanda = async (req, res) => {
    const comanda = new Comanda(req.body);
    try {
        const comandaAlmacenada = await comanda.save();
        res.json(comandaAlmacenada);
    } catch (error) {
        res.json(error);
    }
}

//TIPOS TAREA
const crearTipoTarea = async (req, res) => {
    const tipoTarea = new TipoTarea(req.body);
    try {
        const TipoTareaNew = await tipoTarea.save();
        res.json(TipoTareaNew);
    } catch (error) {
        console.log(error);
    }
}


const editarTipoTarea = async (req, res) => {
    const { id } = req.body
    const tipo = await TipoTarea.findById(id)
    if (!tipo) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    }
    tipo.nombre = req.body.nombre || tipo.nombre;
    tipo.area = req.body.area || tipo.area;
    try {
        await tipo.save();
        const tipos = await TipoTarea.find();
        res.json(tipos)
    } catch (error) {
        res.json(error)
    }
}

const eliminarTipoTarea = async (req, res) => {
    const { _id } = req.body;
    const tipo = await TipoTarea.findById(_id);
    if (!tipo) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    }
    try {
        const tipos = await tipo.deleteOne();
        res.json(tipos);
    } catch (error) {
        res.json(error);
    }
}

const obtenerComandas = async (req, res) => {
    const comandas = await Comanda.find().select('-tareas');
    res.json(comandas);
}

const terminarComanda = async (req, res) => {
    //Obtenemos el id de la comanda
    const { id } = req.params;
    //obtenemos la comanda
    const comanda = await Comanda.findById(id);
    if (!comanda) {
        const error = new Error("Producto no encontrado");
        return res.status(404).json({ msg: error.message });
    }
    comanda.nombre = req.body.nombre || comanda.nombre;
    comanda.crudo = comanda.crudo;
    comanda.numero = comanda.numero;
    comanda.productoComanda = comanda.productoComanda;
    comanda.creadorNombre = comanda.creadorNombre;
    comanda.terminado = true;
    try {
        const comandaTerminada = await comanda.save();
        return res.json(comandaTerminada);
    } catch (error) {
        console.log(error);
    }

}
//Editamos la comanda
const editarComanda = async (req, res) => {
    //obtenemos id por medio del req.body
    const { id } = req.body;
    const comanda = await Comanda.findById(id);
    //Si la comanda no existe devolvemos error
    if (!comanda) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    }
    if (req.body.estado === 'En progreso') {
        comanda.terminado = false
    } else if (req.body.estado === 'Finalizado') {
        comanda.terminado = true
    } else {
        comanda.terminado = comanda.terminado
    }
    comanda.nombre = req.body.nombre || comanda.nombre;
    comanda.crudo = req.body.crudo || comanda.crudo;
    comanda.numero = req.body.numero || comanda.numero;
    comanda.productoComanda = req.body.productoComanda || comanda.productoComanda;
    comanda.creadorNombre = req.body.creador || comanda.creadorNombre;
    comanda.fecha = req.body.fecha || comanda.fecha;

    try {
        const comandaAlmacenada = await comanda.save();
        const comandas = await Comanda.find({
            '$or': [
                { colaboradores: { $in: req.usuario } },
                { creador: { $in: req.usuario } },
            ]
        }).select(`-colaboradores -tareas -creador -updatedAt  -createdAt`);
        res.json(comandas);
    } catch (error) {
        res.json(error);
    }
}
//Eliminamos la comanda
const eliminarComanda = async (req, res) => {
    //Obtenemos id mediante el request
    const { id } = req.params;
    //buscamos la comanda mediante el id obtenido
    const comanda = await Comanda.findById(id);
    //Comprobamos si la comanda existe
    //Caso contrario devolvemos error 404
    if (!comanda) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    }
    //Comparamos el creador con el usuario para impedir la accion en caso de no ser el mismo
    if (comanda.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida");
        return res.status(401).json({ msg: error.message });
    }
    //Conectamos con la base de datos mediante un try Catch 
    try {
        //Esperamos la conexion y borramos la comanda
        await comanda.deleteOne();
        //retornamos el mensaje en forma de objeto
        res.json({ msg: "Comanda eliminada" });
    } catch (error) {
        //En caso de fallar devolvemos error
        res.json(error);
    }
}

//Buscamos colaborador
const buscarColaborador = async (req, res) => {
    const usuarios = await Usuario.find().select(`-password -confirmado -updatedAt  -token -createdAt`);
    res.json(usuarios)
};
//Agregamos colaborador a la comanda
const agregarColaborador = async (req, res) => {
    const comanda = await Comanda.findById(req.params.id)
    if (!comanda) {
        const error = new Error('Comanda no encontrada');
        return res.status(404).json({ msg: error.message });
    }
    /*if(comanda.creador.toString() !== req.usuario._id.toString()){
        const error = new Error ("Acción no valida");
        return res.status(404).json({msg: error.message});
    }*/
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email }).select("-confirmado -createdAt -password -token -__v");
    if (!usuario) {
        const error = new Error('Usuario no encontrado');
        return res.status(404).json({ msg: error.message });
    }
    //El colaborador no es el administrador
    /*if(comanda.creador.toString() === usuario._id.toString()){
        const error = new Error('El administrador no puede ser agregado como colaborador');
        return res.status(404).json({msg: error.message});        
    }*/

    if (comanda.colaboradores.includes(usuario._id)) {
        const error = new Error(
            "El usuario ya pertenece a la comanda"
        )
        return res.status(404).json({ msg: error.message });
    }

    //Agregar a la comanda

    comanda.colaboradores.push(usuario._id);
    await comanda.save();
    res.json({ msg: 'Colaborador agregado a comanda correctamente' });
}
//Eliminarmos colaborador de la comanda
const eliminarColaborador = async (req, res) => {
    const comanda = await Comanda.findById(req.params.id)
    if (!comanda) {
        const error = new Error('Comanda no encontrada');
        return res.status(404).json({ msg: error.message });
    }
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email }).select("-confirmado -createdAt -password -token -__v");
    //Eliminar colaborador
    comanda.colaboradores.pull(usuario?._id);
    await comanda.save();
    res.json({ msg: 'Colaborador Eliminado Correctamente' });
}





export {
    obtenerTareas,

    obtenerProducto,
    crearProducto,
    eliminarProducto,
    editarProducto,

    obtenerCliente,
    crearCliente,
    editarCuenta,
    eliminarCuenta,

    obtenerComandas,
    crearComanda,
    editarComanda,
    eliminarComanda,
    terminarComanda,

    crearTipoTarea,
    editarTipoTarea,
    eliminarTipoTarea,

    obtenerUsuarios,
    buscarColaborador,
    agregarColaborador,
    eliminarColaborador,

}