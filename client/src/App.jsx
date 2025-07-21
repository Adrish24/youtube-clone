import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "./components";

const App = () => {
  // const theme = localStorage.getItem("theme") || "light";
  return (
    <main data-theme={"dark"}>
      <Header />
      <div className="min-h-screen scroll-mt-14 pt-14 bg-base-300">
        <Sidebar />
        <Outlet />
      </div>
    </main>
  );
};

export default App;
