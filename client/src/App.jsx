import { Outlet } from "react-router-dom";

import { Provider } from "react-redux";

import store from "./context/redux/store/store";

import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";

const App = () => {
  return (
    <Provider store={store}>
      <main data-theme={"dark"} className="h-screen overflow-hidden">
        <Header />
        <Sidebar />
        <div
          className="
          scroll-mt-14 
          h-full 
          bg-base-300 overflow-y-auto
          "
        >
          <Outlet />
        </div>
      </main>
    </Provider>
  );
};

export default App;
