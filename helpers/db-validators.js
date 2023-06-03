const { Categoria, Producto } = require('../models')
const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no está registrado en la DB`)
    }
}

const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo })
    if( existeEmail ) {
        throw new Error(`El correro ${ correo } ya existe`)
    }
}

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById(id)
    if( !existeUsuario ) {
        throw new Error(`El id ${ id } del usuario no existe`)
    }
}

// existeCategoria -> parecido a existeUsuarioPorId
const existeCategoriaPorId = async( id ) => {
    const existeCategoria = await Categoria.findById(id)
    if( !existeCategoria) {
        throw new Error(`El id ${ id } de la categoría existe`)
    }
}


const existeProductoPorId = async( id ) => {
    const existeProducto = await Producto.findById(id)
    if( !existeProducto) {
        throw new Error(`El id ${ id } del producto existe`)
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida - se permiten: ${ colecciones }`)
    }

    return true;
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}