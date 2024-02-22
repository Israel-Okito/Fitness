import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const Footer = () => (
  <Box mt="80px" bgcolor="#FFF3F4">
    <Stack gap="40px" sx={{ alignItems: 'center' }} flexWrap="wrap" px="40px" pt="24px">
       <p style={{fontSize:"38px", color:"orange", fontWeight:"bold"}} >Fitness Joel Gym</p>
    </Stack>
    <Typography variant="h5" sx={{ fontSize: { lg: '28px', xs: '20px' } }} mt="41px" textAlign="center" pb="40px">Développer par {" "}
    <a href='https://okito.vercel.app'
     style={{ textDecoration:"none", borderBottom:"3px solid red",  fontSize: '22px'} }
    >
      
      Okito ❤️ Diesho</a>  
    </Typography>
  </Box>
);

export default Footer;
