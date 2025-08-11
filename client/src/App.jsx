import { Outlet } from "react-router-dom";

import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { useThemeContext } from "./context/ThemeProvider";

const App = () => {
  const { mainContentRef } = useThemeContext();

  return (
    <main
      data-theme={"black"}
      className="h-screen overflow-hidden scroll-smooth bg-base-300 fill-base-content"
    >
      <Header />
      <Sidebar />

      <div
        ref={mainContentRef}
        className="
          scroll-mt-14 h-full
          overflow-y-auto 
          "
      >
        <Outlet />
      </div>
    </main>
  );
};

export default App;
