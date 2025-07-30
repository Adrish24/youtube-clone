import { memo } from "react";
import Drawer from "./Drawer";
import { Icon } from "../ui";
import SidebarMenu from "./SidebarMenu";

const Sidebar = memo(() => {
  return (
    <>
      <div className="fixed  z-[100] bg-base-300">
        <Drawer />
      </div>
      <SidebarMenu />
    </>
  );
});

export default Sidebar;
