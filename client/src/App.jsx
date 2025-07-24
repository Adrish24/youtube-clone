import { Outlet } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./context/store/store";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";

const App = () => {
  // const theme = localStorage.getItem("theme") || "light";
  return (
    <Provider store={store}>
      <main data-theme={"dark"}>
        <Header />

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
    </Provider>
  );
};

export default App;
