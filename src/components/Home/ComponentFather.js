import LocationContext from "../../context/amenities/amenitiesContext";
import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import TabsVertical from "../Material/TabsVertical";

const ComponentFather = ({children}) =>{
    const locationContext = useContext(LocationContext);
    const { 
        amenidadesPadre,
        mostrarComodidadesHijos,
        mostrarComodidadesPadre
    } = locationContext;

    useEffect(()=>{
        mostrarComodidadesHijos();
        mostrarComodidadesPadre();
    },[])

    return(<Box>
        <TabsVertical tabs={amenidadesPadre ? amenidadesPadre : []}>{children}
        </TabsVertical>
    </Box>)
}

export default ComponentFather;