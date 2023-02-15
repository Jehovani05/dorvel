import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AmenitiesContext from '../../context/amenities/amenitiesContext';
import { Box, Typography } from '@mui/material';

export default function BasicTable() {
  const [data, setData] = useState([])
  const amenitiesContext = useContext(AmenitiesContext);
    const { amenidadByCategoria, amenidadByTipo } = amenitiesContext;
        
    useEffect(()=>{ setData(amenidadByTipo) },[amenidadByTipo])
    useEffect(()=>{ setData(amenidadByCategoria) },[amenidadByCategoria])

    if(data){
        return (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Categoría</TableCell>
                  <TableCell align="right">SEO Frendly</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.property_category}</TableCell>
                    <TableCell align="right">{row.seo_friendly}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
    }
    return (<Box sx={{width: '100%'}}>
      <Typography
        sx={{
          textAlign: 'center',
          marginTop: '30px !important',
          width: '100%'
        }}>Seleccione una opción</Typography>
    </Box>)
}