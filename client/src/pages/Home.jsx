import { VideoGrid } from "../components/home";

const Home = () => {
  return (
    <div
      id="home"
      className="flex-2 grid justify-center p-3 mt-24 md:ml-20  bg-base-300 overflow-hidden"
    >
      <div
        id="categories"
        className="fixed md:left-20 top-14 h-14 w-full bg-red-400 z-1"
      ></div>
      <VideoGrid />
    </div>
  );
};

export default Home;
