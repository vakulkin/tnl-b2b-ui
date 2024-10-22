import EntityIcon from "./EntityIcon";

const navigation = [
  // Internal Links
  {
    segment: "rules",
    title: "Reguły cenowe",
    icon: <EntityIcon icon="rules" size={30} />,
    type: "internal",
  },
  {
    segment: "logic-blocks",
    title: "Warunki logiczne",
    icon: <EntityIcon icon="logic_blocks" size={30} />,
    type: "internal",
  },
  {
    url: "http://btwob.local/wp-admin/edit.php?post_type=product",
    title: "Products",
    icon: <EntityIcon icon="products" size={30} />,
    type: "external",
  },
  {
    segment: "groups",
    title: "Grupy produktów",
    icon: <EntityIcon icon="groups" size={30} />,
    type: "internal",
  },
  {
    url: "http://btwob.local/wp-admin/edit.php?post_type=product&page=product_attributes",
    title: "Woo Atrybuty",
    icon: <EntityIcon icon="terms" size={30} />,
    type: "external",
  },
  {
    url: "http://btwob.local/wp-admin/users.php",
    title: "Users",
    icon: <EntityIcon icon="users" size={30} />,
    type: "external",
  },
  {
    segment: "roles",
    title: "Role użytkowników",
    icon: <EntityIcon icon="roles" size={30} />,
    type: "internal",
  },
];

export default navigation;
