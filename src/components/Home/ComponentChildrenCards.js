
import { Box, Button, Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import LocationContext from "../../context/amenities/amenitiesContext";
import CustomCards from "../Material/CustomCards";

const ComponentChildren = () => {
    const locationContext = useContext(LocationContext);
    const {
        direcciones,
        changePage,
        amenidadByTipo
    } = locationContext;

    return(<Box sx={{ height: '90vh' }}>
        <Box className='component-children scroll-custom'>
            <CustomCards/>
        </Box>
        <Grid container spacing={2} sx={{marginTop: '20px'}}>
            <Grid item xs={4} sx={{textAlign: 'center'}}>
                <Button
                    variant="outlined"
                    disabled={!direcciones.previous || !amenidadByTipo ? true : false}
                    onClick={()=>{
                    if(direcciones.previous){ changePage('previous') }
                }}>Previous</Button>
            </Grid>
            <Grid item xs={4} sx={{textAlign: 'center'}}></Grid>
            <Grid item xs={4} sx={{textAlign: 'center'}}>
                <Button
                    variant="outlined"
                    disabled={!direcciones.next || !amenidadByTipo ? true : false}
                    onClick={
                    ()=>{
                        if(direcciones.next){ changePage('next')}
                    }
                }>Next</Button>
            </Grid>
        </Grid>
    </Box>)
}

export default ComponentChildren;