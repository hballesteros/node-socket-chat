const { Router } = require('express')
const { check } = require('express-validator')
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')
const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        borrarCategoria, 
        actualizarCategoria } = require('../controllers/categorias')
const { existeCategoriaPorId } = require('../helpers/db-validators')

const router = Router()

/**
 *  {{url}}/api/categorias
 */

// Obtener todas las categorías - público
router.get('/', obtenerCategorias)

// Obtener una categoría por id - público
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria)

// Crear una categoría - privado - cualquiera con token válido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre de la categoria es obligatorio').not().isEmpty(),
    validarCampos
    ], crearCategoria)

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nuevo nombre de la categoria es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria )

// Borrar una categoría - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria )


module.exports = router