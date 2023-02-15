import { Box, Grid } from "@mui/material"
import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AmenitiesContext from "../../context/amenities/amenitiesContext";

const CustomCards = () => {
    const amenitiesContext = useContext(AmenitiesContext);
    const { amenidadByCategoria, amenidadByTipo, amenidadesHijos } = amenitiesContext;
    const [data, setData] = useState([amenidadesHijos])

    useEffect(()=>{setData(amenidadByTipo) },[amenidadByTipo])
    useEffect(()=>{setData(amenidadByCategoria) },[amenidadByCategoria])
    
    useEffect(()=>{
        const fetchData = async () => {
            console.log('data', data)
        }

        setTimeout(fetchData, 1000)
    }, [data])

    return(<Grid container spacing={2}>
        {data ? data.map((card, i) => (<Grid key={i} item xs={4}>
            <Card className={card.seo_friendly} sx={{ marginY: '10px' }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {card.id}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {card.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Grid>)): (<Box sx={{width: '100%'}}>
            <Typography sx={{textAlign: 'center', marginTop: '30px !important', width: '100%'}}>Seleccione una opción</Typography>
            </Box>)}
    </Grid>);
}

export default CustomCards