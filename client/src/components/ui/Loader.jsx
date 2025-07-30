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
        <div className="skeleton bg-base-content/50 h-50 w-full"></div>
        <div className="flex">
          <div>
            <div className="mt-3 mr-3 w-9">
              <div className="skeleton bg-base-content/40  h-9 w-full rounded-full"></div>
            </div>
          </div>

          <div className="grow pr-6 pt-3 flex flex-col space-y-2">
            <div className="skeleton bg-base-content/40  h-6 w-full"></div>
            <div className="skeleton bg-base-content/40  h-4 w-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
