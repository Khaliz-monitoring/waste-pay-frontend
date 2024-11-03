import { Palette } from '@mui/material';

export const secondaryColor = {
   main: '#F4F7FC',
   light: '#DAE1EC',
   dark: '#7D90B2',
   contrastText: '#2E3B52',
};

export const frostBlue = {
   main: '#edf9fc',
   light: '#f4fcfe', // Lighter shade
   dark: '#d5e0e3', // Darker shade
   contrastText: '#000000',
};

const palette = {
   primary: {
      main: '#e7a800', // very red
      light: '#ffbe1a', // Lighter shade
      dark: '#c38f00', // Darker shade
      contrastText: '#000000', // Black, as the main color is quite bright
   },
   secondary: secondaryColor,
   frostBlue,
};

export default palette;
