import React from 'react';

import Logo from '../assets/Logo.png';
import { Button, Stack } from '@mui/material';
import FloatingButtons from './FloatingButtons';

const Navbar = (props) => {

  return(
    <Stack position="sticky" top="0px" zIndex="99" bgcolor="white"  direction="row" justifyContent="space-around" sx={{   gap: { sm: '123px', xs: '40px' }, mt: { sm: '32px', xs: '20px' } }} px="5px">
   
      <img src={Logo} alt="logo" style={{ width: '48px', height: '48px', margin: '0px 10px' }} />

    <Stack
      direction={{xs:"column", sm:"row"}}
      gap={{lg:"30px", xs:"8px"}}
      fontFamily="Alegreya"
      fontSize="24px"
      alignItems="flex-end"
    >
      <Button 
          onClick={() => {
              // setMoreOpts(false);
              props.changeView("Home");
          }} 
          style={{ textDecoration: 'none', border:"none", color: '#3A1212', borderBottom: '3px solid #FF2625', cursor:"pointer" }}>
        Accueil
      </Button>
      <Button 
         onClick={() => {
          // setMoreOpts(false);
          props.changeView("Library");
        }}
           style={{ textDecoration: 'none', color: '#3A1212', borderBottom: '3px solid #FF2625', cursor:"pointer" }}>
        Objectif
      </Button>
      <Button   
         onClick={() => {
              // setMoreOpts(false);
              props.changeView("History");
         }}  
         style={{ textDecoration: 'none', color: '#3A1212', borderBottom: '3px solid #FF2625', cursor:"pointer" }}>
       Historique
     </Button>   

    </Stack>
   
   {/* <Stack>
     <FloatingButtons/>
   </Stack> */}

  </Stack>

  )

  };

export default Navbar;
