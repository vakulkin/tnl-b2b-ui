import {
  Typography,
  Box,
  List,
  ListItem,
  Divider,
  ListItemText,
} from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import EntityIcon from "../components/general/EntityIcon";

const Index = () => (
  <Box sx={{ p: 4, background: "#fff" }}>
    <Typography variant="h4" gutterBottom>
      Zdefiniuj role i grupy
    </Typography>
    <List>
      <RoleAndGroupDefinition />
    </List>
    <Divider sx={{ my: 4 }} />
    <Typography variant="h4" gutterBottom>
      <PriceRuleCreationHeader />
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
      <LogicBlockCreationHeader />
    </Typography>
    <Typography variant="body1" gutterBottom>
      Są to warunki, przy spełnieniu których reguła zostanie zastosowana do ceny produktu.
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
        <ListItemText primary="Atrybuty WooCommerce (kategorie, tagi, atrybuty)" />
      </ListItem>
    </List>
  </Box>
);

const RoleAndGroupDefinition = () => (
  <>
    <ListItem>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: 2 }}>Określ</Typography>
        <EntityIcon icon="roles" size={26} />
        <Typography sx={{ mr: 2, ml: 1 }}>role użytkowników oraz</Typography>
        <EntityIcon icon="groups" size={26} />
        <Typography sx={{ mr: 2, ml: 1 }}>grupy produktów</Typography>
      </Box>
    </ListItem>
    <ListItem>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: 2 }}>Przypisz odpowiednich</Typography>
        <EntityIcon icon="users" size={26} />
        <Typography sx={{ mr: 2, ml: 1 }}>użytkowników do ról</Typography>
      </Box>
    </ListItem>
    <ListItem>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: 2 }}>Przypisz</Typography>
        <EntityIcon icon="products" size={26} />
        <Typography sx={{ mr: 2, ml: 1 }}>produkty do odpowiednich grup</Typography>
      </Box>
    </ListItem>
  </>
);

const PriceRuleCreationHeader = () => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Typography sx={{ mr: 2 }}>Utwórz</Typography>
    <EntityIcon icon="rules" size={26} />
    <Typography sx={{ mr: 2, ml: 1 }}>reguły cenowe</Typography>
  </Box>
);

const LogicBlockCreationHeader = () => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Typography sx={{ mr: 2 }}>Utwórz</Typography>
    <EntityIcon icon="logic_blocks" size={26} />
    <Typography sx={{ mr: 2, ml: 1 }}>warunki logiczne</Typography>
  </Box>
);

export const Route = createLazyFileRoute("/")({
  component: Index,
});

export default Index;
