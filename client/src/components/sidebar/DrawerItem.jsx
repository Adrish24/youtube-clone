import { Icon } from "../ui";

const DrawerItem = ({ item }) => {
  return (
    <li title={item.name}>
      <Icon
        path={item.name === "Home" ? "/" : "#"}
        className="py-2 flex items-center text-sm"
      >
        <div className="px-3">{item.svg}</div>
        <p>{item.name}</p>
      </Icon>
    </li>
  );
};

export default DrawerItem;
