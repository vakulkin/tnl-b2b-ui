import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';

const theme = createTheme({
  palette: {
    background: {
      default: "#F0F2F7",
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '1.6rem',
      
    },
    h2: {
      fontSize: '1.4rem',
    },
    h3: {
      fontSize: '1.15rem',
      fontWeight: 300,
    },
    h4: {
      fontSize: '1.1rem',
    },
    h5: {
      fontSize: '1.07rem',
    },
    h6: {
      fontSize: '1.03rem',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 300,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 300,
    },
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
