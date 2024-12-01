import { Box, List } from "@mui/material";
import DrawerHeader from "./DrawerHeader";
import NavigationItem from "./NavigationItem";
import ToggleCollapseButton from "./ToggleCollapseButton";
import EntityIcon from "../general/EntityIcon";

import { getEntityStore } from "../../store";

const DrawerContent = ({ isCollapsed, handleToggleDrawer }) => {
  const navigation = [
    {
      segment: "/",
      title: "Informacje",
      icon: <EntityIcon icon="info" size={24} />,
      type: "internal",
    },
    {
      segment: "rules",
      title: "Reguły cenowe",
      icon: <EntityIcon icon="rules" size={24} />,
      type: "internal",
    },
    {
      segment: "logic-blocks",
      title: "Warunki logiczne",
      icon: <EntityIcon icon="logic_blocks" size={24} />,
      type: "internal",
    },
    {
      segment: "groups",
      title: "Grupy produktów",
      icon: <EntityIcon icon="groups" size={24} />,
      type: "internal",
    },
    {
      segment: "roles",
      title: "Role użytkowników",
      icon: <EntityIcon icon="roles" size={24} />,
      type: "internal",
    },
    {
      segment: "products",
      title: "Produkty",
      icon: <EntityIcon icon="products" size={24} />,
      type: "internal",
    },
    {
      segment: "users",
      title: "Użytkownicy",
      icon: <EntityIcon icon="users" size={24} />,
      type: "internal",
    },
    {
      segment: "terms",
      title: "Woo Atrybuty",
      icon: <EntityIcon icon="terms" size={24} />,
      type: "internal",
    },
    {
      segment: "product-kits",
      title: "Zestawy produktów",
      icon: <EntityIcon icon="kits" size={24} />,
      type: "internal",
    },
    {
      title: "Settings",
      icon: <EntityIcon icon="settings" size={24} />,
      type: "action",
      onClick: () => handleFormDialogOpen("edit", 1),
    },
  ];

  const useStore = getEntityStore('settings');
  const { handleFormDialogOpen } = useStore();

  return (
    <Box>
      <DrawerHeader isCollapsed={isCollapsed} />
      <NavigationList navigation={navigation} isCollapsed={isCollapsed} />
      <ToggleCollapseButton
        isCollapsed={isCollapsed}
        handleToggleDrawer={handleToggleDrawer}
      />
    </Box>
  );
};

const NavigationList = ({ navigation, isCollapsed }) => (
  <List>
    {navigation.map((item) => (
      <NavigationItem
        key={item.type === "internal" ? item.segment : item.title}
        item={item}
        isCollapsed={isCollapsed}
      />
    ))}
  </List>
);

export default DrawerContent;
