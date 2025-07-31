import { Outlet } from "react-router-dom";

import { Provider } from "react-redux";

import store from "./context/redux/store/store";

import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { useThemeContext } from "./context/ThemeProvider";

const App = () => {
  const { mainContentRef } = useThemeContext();
  return (
    <Provider store={store}>
      <main
        data-theme={"black"}
        className="h-screen overflow-hidden scroll-smooth"
      >
        <Header />
        <Sidebar />

        <div
          ref={mainContentRef}
          className="
          scroll-mt-14 
          h-full 
          overflow-y-auto 
          "
        >
          <Outlet />
        </div>
      </main>
    </Provider>
  );
};

export default App;
