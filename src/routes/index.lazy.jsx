import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Zdefiniuj role i grupy, przypisz do nich użytkowników i produkty
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary="Określ role użytkowników oraz grupy produktów" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Przypisz odpowiednich użytkowników do ról" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Przypisz produkty do odpowiednich grup" />
        </ListItem>
      </List>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h4" gutterBottom>
        Utwórz reguły cenowe
      </Typography>
      <Typography variant="body1" gutterBottom>
        Każda reguła może działać na jeden z trzech sposobów:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Odjąć lub dodać kwotę do bazowej ceny produktu" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Odjąć lub dodać procent do bazowej ceny produktu" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Ustawić cenę na konkretną kwotę zamiast ceny bazowej" />
        </ListItem>
      </List>

      <Typography variant="body1" gutterBottom>
        Przykłady:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Reguła 1: Odjąć od ceny bazowej 10%" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Reguła 2: Dodać do ceny bazowej 15 PLN" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Reguła 3: Ustawić cenę na 300 PLN" />
        </ListItem>
      </List>

      <Divider sx={{ my: 4 }} />
      <Typography variant="h4" gutterBottom>
        Utwórz i przypisz do reguł cenowych bloki logiczne
      </Typography>
      <Typography variant="body1" gutterBottom>
        Są to warunki, przy spełnieniu których reguła zostanie zastosowana do
        ceny produktu.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Warunki można ustawiać, wybierając:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Role użytkowników" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Grupy produktów" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Terminy WooCommerce (kategorie, tagi, atrybuty)" />
        </ListItem>
      </List>
    </Box>
  );
}
