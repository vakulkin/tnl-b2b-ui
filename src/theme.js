import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';

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
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.15rem',
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
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
