import express from 'express';


import {
    crearProducto,
    obtenerProducto,
    crearCliente,
    obtenerCliente,
    crearComanda,
    editarComanda,
    eliminarColaborador,
    eliminarComanda,
    buscarColaborador,
    agregarColaborador,
    crearTipoTarea,
    terminarComanda,
    obtenerTareas,
    obtenerUsuarios,
    eliminarProducto,
    editarProducto,
    editarCuenta,
    eliminarCuenta,
    editarTipoTarea,
    eliminarTipoTarea,
    obtenerComandas,
} from '../controllers/adminController.js';
import { obtenerComanda } from '../controllers/viewController.js';

//Controlador
//CheckAuth
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();
//Buscamos colaboradores
router.post('/tipo-tarea', checkAuth, crearTipoTarea);
router.put('/editar-tipo-tarea', checkAuth, editarTipoTarea)
router.post('/eliminar-tipo-tarea', checkAuth, eliminarTipoTarea)
router.get('/tareas', checkAuth, obtenerTareas);
router.put('/editar-cuenta', checkAuth, editarCuenta)
router.post('/eliminar-cuenta', checkAuth, eliminarCuenta)
router.post('/eliminar-producto', checkAuth, eliminarProducto)
router.put('/editar-producto', checkAuth, editarProducto)
router.put('/editar-comanda', checkAuth, editarComanda)
router.get('/obtenerComandas', checkAuth, obtenerComandas)


router.get('/comanda/colaboradores', buscarColaborador);


router.route('/')
    .get(checkAuth, obtenerTareas)
    .post(checkAuth, crearComanda)


router.route('/cliente')
    .post(checkAuth, crearCliente)
    .get(checkAuth, obtenerCliente)
router.route('/producto')
    .get(checkAuth, obtenerProducto)
    .post(checkAuth, crearProducto)
router.route('/usuarios')
    .get(checkAuth, obtenerUsuarios);
router.route('/:id')
    .post(checkAuth, terminarComanda)

router.route('/comanda/:id')
    .get(checkAuth, obtenerComanda)
    .put(checkAuth, editarComanda)
    .delete(checkAuth, eliminarComanda)
router.put('/comanda/colaboradores/:id', checkAuth, agregarColaborador);
router.post('/comanda/eliminar-colaboradores/:id', checkAuth, eliminarColaborador);




export default router;