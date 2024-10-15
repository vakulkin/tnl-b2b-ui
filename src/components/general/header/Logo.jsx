import { Box } from '@mui/material';
import LogoTNL from '../../../assets/logo-tnl.svg';

const Logo = () => {
  return <Box component="img" src={LogoTNL} sx={{maxWidth: 250}} />
}

export default Logo;