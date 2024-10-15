import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Logo from "./Logo";
import { Link } from "@tanstack/react-router";

function Header() {
  const mainMenu = [
    { title: "Info", link: "/" },
    { title: "Reguły cenowe", link: "/rules" },
    { title: "Warunki logiczne", link: "/logic-blocks" },
    { title: "Grupy produktów", link: "/groups" },
    { title: "Role użytkowników", link: "/roles" },
  ];

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <List component={Stack} direction="row">
            {mainMenu.map((item) => (
              <ListItem key={item.link} sx={{ whiteSpace: "nowrap", p: 0 }}>
                <ListItemButton key={item.link} component={Link} to={item.link}>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Header;