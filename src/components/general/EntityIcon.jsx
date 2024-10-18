import PropTypes from "prop-types";

import GroupsIcon from "../../assets/icons/groups.svg?react";
import LogicBlocksIcon from "../../assets/icons/logic_blocks.svg?react";
import ProductsIcon from "../../assets/icons/products.svg?react";
import RolesIcon from "../../assets/icons/roles.svg?react";
import RulesIcon from "../../assets/icons/rules.svg?react";
import TermsIcon from "../../assets/icons/terms.svg?react";
import UsersIcon from "../../assets/icons/users.svg?react";


const iconMap = {
  groups: GroupsIcon,
  logic_blocks: LogicBlocksIcon,
  products: ProductsIcon,
  roles: RolesIcon,
  rules: RulesIcon,
  terms: TermsIcon,
  users: UsersIcon,
};

const EntityIcon = ({ icon, size }) => {
  const IconComponent = iconMap[icon] || null;

  if (!IconComponent) {
    console.warn(`Icon with name "${icon}" does not exist.`);
    return null;
  }

  return <IconComponent style={{ width: size, height: size }} />;
};

EntityIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default EntityIcon;
