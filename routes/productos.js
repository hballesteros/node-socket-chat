const { Router } = require('express')
const { check } = require('express-validator')
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')
const { crearProducto, 
        obtenerProductos, 
        obtenerProducto, 
        borrarProducto, 
        actualizarProducto } = require('../controllers/productos')

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators')


const router = Router()

/**
 *  {{url}}/api/productos
 */

// Obtener productos - público
router.get('/', obtenerProductos )

// Obtener productos por id - Público
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto )

// Crear un producto - privado - con token
router.post('/', [
    validarJWT,
    check('nombre','El nombre del nuevo producto es obligatorio').not().isEmpty(),
    check('categoria', 'No es una categoría válida').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto )

// Actualizar producto - privado - con token
router.put('/:id', [
    validarJWT,
    //check('categoria', 'No es una categoría válida').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto )

// Borrar un producto - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId),
    validarCampos
], borrarProducto )

module.exports = router

