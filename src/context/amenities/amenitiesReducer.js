import { 
    MOSTRAR_COMODIDADES_PADRE,
    MOSTRAR_COMODIDADES_HIJOS,
    CONTENIDO_URL,
    CATEGORIA_ID,
    SELECCIONAR_CATEGORIA,
    SELECCIONAR_AMENIDAD
 } from '../../types'

export default( state, action) => {
    switch(action.type){
        case MOSTRAR_COMODIDADES_PADRE:
            return {
                ...state,
                amenidadesPadre: action.payload
            };
        case MOSTRAR_COMODIDADES_HIJOS:
            return {
                ...state,
                amenidadesHijos: action.payload
            };
        case SELECCIONAR_CATEGORIA:
            return {
                ...state,
                amenidadByCategoria: action.payload
            };
        case SELECCIONAR_AMENIDAD:
            return {
                ...state,
                amenidadByTipo: action.payload
            };
        case CONTENIDO_URL:
            return {
                ...state,
                direcciones: action.payload
            };
        case CATEGORIA_ID:
            return {
                ...state,
                categoriaId: action.payload
            };
        default:
            return state;
    }
}
