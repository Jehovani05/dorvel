import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AmenitiesContext from '../../context/amenities/amenitiesContext';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{
        width: '100%',
        padding: '30px'
      }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = index => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const TabsVertical = ({tabs = [], children}) => {
    const amenitiesContext = useContext(AmenitiesContext);
    const { seleccionarAmenidad } = amenitiesContext;
    
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {setValue(newValue);};

    if(tabs){
        return (<Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', minWidth: '150px'}}
            >
              <Tab label='Filtros' disabled/>
                {tabs.map((tab, i)=> {
                    return(
                        <Tab
                            key={i}
                            onClick={()=>{ seleccionarAmenidad(tab.id)}}
                            label={tab.name}
                            {...a11yProps(i)}
                        />
                    )
                })}
            </Tabs>
            {tabs.map((tab, i)=>(
                <TabPanel key={i} value={value} index={i}>
                    <Box>{children}</Box>
                </TabPanel>
            ))}
        </Box>
        );
    }

    return (<Box sx={{
        width: '100%',
        height: '80vh',
        overflowY: 'scroll'
    }}><Typography>none</Typography></Box>)
}

export default TabsVertical;