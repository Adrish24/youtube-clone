import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "./components/main";
import { Drawer } from "./components/ui";

const App = () => {
  // const theme = localStorage.getItem("theme") || "light";
  return (
    <main data-theme={"dark"}>
      <Header />
      {/* <Drawer /> */}
      <div
        className="
      overflow-hidden 
      min-h-screen 
      scroll-mt-14 
      h-full 
      bg-base-300 flex
      "
      >
        <Sidebar />
        <Outlet />
      </div>
    </main>
  );
};

export default App;
