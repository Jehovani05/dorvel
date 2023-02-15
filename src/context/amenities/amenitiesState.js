import React, { useReducer } from 'react'
import locationReducer from './amenitiesReducer'
import LocationContext from './amenitiesContext'
import clientAxios from '../../config/axios'
import axios from 'axios';
import { 
    MOSTRAR_COMODIDADES_PADRE,
    MOSTRAR_COMODIDADES_HIJOS,
    SELECCIONAR_CATEGORIA,
    SELECCIONAR_AMENIDAD,
    CONTENIDO_URL,
    CATEGORIA_ID
} from '../../types'

const AmenitiesState = props => {
    const initialState = {
        amenidadesPadre: [],
        amenidadesHijos: null,
        amenidadByCategoria: null,
        amenidadByTipo: null,
        amenidad: null,
        categoriaId: null,
        direcciones: {
            previous: null,
            next: null
        }
    }

    const [state, dispatch] = useReducer(locationReducer, initialState)

    const mostrarComodidadesPadre = async () => {
        await clientAxios.get('/api/cat-amenities-parents/?format=json')
        .catch(error => {
            if (error.response) {
                let result = error.response;
                let resume = result.data
                dispatch({
                    type: MOSTRAR_COMODIDADES_PADRE,
                    payload: resume.data
                })
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
          });
    }

    const mostrarComodidadesHijos = async () => {
        let result = await clientAxios.get('/api/cat-amenities-childs/?format=json');
        let data = await result.data
        dispatch({
            type: MOSTRAR_COMODIDADES_HIJOS,
            payload: await data.results
        })

        dispatch({
            type: CONTENIDO_URL,
            payload: {
                previous: data.previous ? data.previous : null,
                next: data.next ? data.next : null
            }
        })
    }

    const changePage = async (step) => {
        let dirs = await state.direcciones;
        let categoriaId = await state.categoriaId;
        let result = await axios.get(dirs[step]);
        let data = await result.data
        let results = await data.results
        let filterByParent = results ? await results.filter(parent => parent.amenity_parent === categoriaId) : null

        dispatch({
            type: SELECCIONAR_CATEGORIA,
            payload: await filterByParent
        })
        
        dispatch({
            type: MOSTRAR_COMODIDADES_HIJOS,
            payload: await data.results
        })

        dispatch({
            type: CONTENIDO_URL,
            payload: {
                previous: data.previous ? data.previous : null,
                next: data.next ? data.next : null
            }
        })
    }

    const seleccionCategoriaId = id =>{
        dispatch({
            type: CATEGORIA_ID,
            payload: id
        })
    }

    const seleccionarCategoria = async id => {
        console.log(id)
        let result = await clientAxios.get('/api/cat-amenities-childs/?format=json');
        let data = await result.data.results
        if(data){
            console.log(data)
            seleccionCategoriaId(id)
            let filterByParent = await data.filter(parent => parent.amenity_parent === id)
            dispatch({
                type: SELECCIONAR_AMENIDAD,
                payload: await filterByParent
            })
        }
    }

    const seleccionarAmenidad = async id => {
        let data = await state.amenidadesHijos;
        if(data){
            seleccionCategoriaId(id)
            let filterByParent = await data.filter(parent => parent.amenity_parent === id)
            dispatch({
                type: SELECCIONAR_AMENIDAD,
                payload: await filterByParent
            })
        }
    }

    return(
        <LocationContext.Provider
            value={{
                amenidadesPadre: state.amenidadesPadre,
                amenidadesHijos: state.amenidadesHijos,
                amenidadByCategoria: state.amenidadByCategoria, 
                amenidadByTipo: state.amenidadByTipo, 
                amenidad: state.amenidad,
                categoriaId: state.categoriaId,
                direcciones: state.direcciones,
                mostrarComodidadesHijos,
                mostrarComodidadesPadre,
                seleccionarCategoria,
                seleccionarAmenidad,
                changePage
            }}
        >
            {props.children}
        </LocationContext.Provider>
    )
}

export default AmenitiesState;  