import { memo } from "react";
import Drawer from "./Drawer";
import SidebarMenu from "./SidebarMenu";

const Sidebar = memo(() => {
  return (
    <>
      <div className="fixed z-[100]">
        <Drawer />
      </div>
      <SidebarMenu />
    </>
  );
});

export default Sidebar;
