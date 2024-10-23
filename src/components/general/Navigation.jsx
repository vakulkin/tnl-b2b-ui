import EntityIcon from "./EntityIcon";

const navigation = [
  // Internal Links
  {
    segment: "/",
    title: "Info",
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
    url: "/wp-admin/edit.php?post_type=product",
    title: "Produkty",
    icon: <EntityIcon icon="products" size={24} />,
    type: "external",
  },
  {
    url: "/wp-admin/users.php",
    title: "Użytkownicy",
    icon: <EntityIcon icon="users" size={24} />,
    type: "external",
  },
  {
    url: "/wp-admin/edit.php?post_type=product&page=product_attributes",
    title: "Woo Atrybuty",
    icon: <EntityIcon icon="terms" size={24} />,
    type: "external",
  },
];

export default navigation;
