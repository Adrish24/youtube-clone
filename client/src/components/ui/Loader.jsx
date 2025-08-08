import { useLoaderData } from "react-router-dom";

const Loader = () => {
  return <div></div>;
};

export default Loader;

// Placeholder for HomeLoader and CardLoader components
// These components will be used to show loading states in the Home page and Card components respectively.
export const HomeLoader = () => {
  return (
    <div className="p-3 mt-24 md:ml-20  bg-base-300">
      <div
        className="
          fixed 
          top-14 left-0 md:left-20 right-4
          h-14 px-4
          border-y border-base-content/20 
          "
      ></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 pt-6 relative">
        <CardLoader />
        <CardLoader />
        <CardLoader />
        <CardLoader />
        <CardLoader />
        <CardLoader />
        <CardLoader />
        <CardLoader />
        <CardLoader />
        <CardLoader />
      </div>
    </div>
  );
};

// Placeholder for CardLoader component
export const CardLoader = () => {
  return (
    <div className="mb-10 px-2">
      <div className="card cursor-pointer">
        <div className="animate-pulse bg-base-content/50 h-50 w-full"></div>
        <div className="flex">
          <div>
            <div className="mt-3 mr-3 w-9">
              <div className="animate-pulse bg-base-content/40  h-9 w-full rounded-full"></div>
            </div>
          </div>

          <div className="grow pr-6 pt-3 flex flex-col space-y-2">
            <div className="animate-pulse bg-base-content/40  h-6 w-full"></div>
            <div className="animate-pulse bg-base-content/40  h-4 w-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder for WatchVideoLoader component
// This component will be used to show loading state in the WatchVideo page.
export const WatchVideoLoader = () => {
  const { currentVideo } = useLoaderData();

  return (
    <div className="mt-14 p-2 bg-base-300 flex justify-center pb-20">
      <div className="flex flex-col lg:flex-row w-full h-full 2xl:w-[90vw]">
        <div className="w-full lg:pr-6 lg:pt-6 lg:ml-6">
          <div
            className="w-full lg:w-[640px] xl:w-[800px] 2xl:w-[1268px]
            h-50 md:h-[432px] lg:h-90 xl:h-[450px] 2xl:h-[713px] 
            rounded-2xl overflow-hidden relative"
          >
            <img
              className="w-full h-full object-fit"
              src={currentVideo.thumbnailUrl}
            />
            <span className="loading loading-spinner loading-xl bg-neutral absolute top-1/2 right-1/2"></span>
          </div>

          <div className="py-4 lg:w-[640px] xl:w-[800px] 2xl:w-[1268px] mx-3">
            <div className="flex justify-between">
              <div className="w-1/2">
                <div className="animate-pulse bg-base-content/40 h-6 w-full mb-2"></div>
                <div className="animate-pulse bg-base-content/40 h-4 w-40"></div>
              </div>
              <div className="flex space-x-2 mt-auto">
                <div className="animate-pulse bg-base-content/40 w-5 h-5 rounded-full"></div>
                <div className="animate-pulse bg-base-content/40 w-5 h-5 rounded-full"></div>
                <div className="animate-pulse bg-base-content/40 w-5 h-5 rounded-full"></div>
                <div className="animate-pulse bg-base-content/40 w-5 h-5 rounded-full"></div>
              </div>
            </div>
            <hr className="my-3 border-base-content/40" />

            <div className="flex items-center space-x-6">
              <div className="flex items-center ">
                <div className="mr-3 w-9">
                  <div className="animate-pulse bg-base-content/40  h-9 w-full rounded-full"></div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="animate-pulse bg-base-content/40 h-4 w-40"></div>
                  <div className="animate-pulse bg-base-content/40 h-4 w-40"></div>
                </div>
              </div>
              <div className="animate-pulse bg-base-content/40 h-10 w-40"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CommentSectionLoader = () => {
  return (
    <div>
      <div className="mt-6 mb-8 flex flex-col  space-y-3 justify-center">
        <div className="flex space-x-6">
          <div className="animate-pulse bg-base-content/40 h-8 w-40"></div>
          <div className="animate-pulse bg-base-content/40 h-8 w-20"></div>
        </div>
        <div className="flex">
          <div className="mr-4">
            <div className="animate-pulse bg-base-content/40 w-10 h-10 rounded-full"></div>
          </div>
          <div className="grow flex flex-col space-y-2 mr-4">
            <div className="animate-pulse bg-base-content/40 h-4 w-20"></div>
            <div className="animate-pulse bg-base-content/40 h-[2px] w-full"></div>
          </div>
        </div>

        <div className="flex flex-col space-y-3 justify-center ">
          <div className="flex">
            <div className="mr-4">
              <div className="animate-pulse bg-base-content/40 w-10 h-10 rounded-full"></div>
            </div>
            <div className="grow flex flex-col space-y-2 mr-4">
              <div className="animate-pulse bg-base-content/40 h-4 w-full"></div>
              <div className="animate-pulse bg-base-content/40 h-4 w-60"></div>
              <div className="flex space-x-2 ">
                <div className="animate-pulse bg-base-content/40 h-4 w-20"></div>
                <div className="animate-pulse bg-base-content/40 h-4 w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
