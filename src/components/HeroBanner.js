import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import HeroBannerImage from '../assets/joel5.jpg';
import { TypeAnimation } from 'react-type-animation';
import WorkoutList from './Home/WorkoutList';

const HeroBanner = (props) => {
  return(
    <Box sx={{ mt: { lg: '1px'}, ml: { sm: '1px' }}} position="relative"   
    >
      <Box sx={{ display:'flex', justifyContent:'space-between'}} >
        <Typography>
           <Typography color="#FF2625" fontWeight="600" fontSize="26px">Fitness Joel</Typography>
           <Typography fontWeight={700} sx={{ fontSize: { lg: '40px', xs: '30px' } }} mb="23px" mt="10px">
             Notre devise est <br/>
             Transpirer, sourire <br />
              Et répétez
           </Typography>
           <Typography fontSize="20px" fontFamily="Alegreya" lineHeight="35px">
           Découvrez les exercices les plus efficaces personnalisés pour vous
           </Typography>
           <Stack mt="30px">
             <div >
               <WorkoutList changeView={props.changeView}/>
             </div>
           </Stack>
           <Typography className='TypeAnimation' fontWeight={600} color="#FF2625" sx={{ opacity: '0.1', display:{lg:"block"} , fontSize: '80px', mt:"50px" }}>
          
          <TypeAnimation
             sequence={[
               "Exercice",
               2000,
               "Fitness",
               2000,
               "Joel",
               2000,
             ]}
             wrapper="span"
             speed={50}
             repeat={Infinity}
           />
     
         </Typography>
  
       </Typography>
    

        <Typography sx={{display:{ lg:"block",xs:"none"}}}>
           <img src={HeroBannerImage} alt="hero-banner" className="hero-banner-img" />
        </Typography>
      </Box>
    
     </Box>
  )
};

export default HeroBanner;
