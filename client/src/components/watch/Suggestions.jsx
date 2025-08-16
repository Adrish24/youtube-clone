import { Card } from "../ui";

const Suggestions = ({ suggestions }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:flex flex-col gap-4 lg:gap-0 lg:pr-6 lg:pt-6 lg:mb-2">
      {suggestions.length > 0 &&
        suggestions.map((vid) => (
          <Card
            key={vid._id}
            video={vid}
            // Pass styles as props
            styles={{
              cardContainer: "lg:mb-4 lg:p-0",
              card: "lg:card-side",
              thumbnailContainer: "flex lg:w-44 lg:pr-2",
              thumbnail: "w-full h-full aspect-video object-cover rounded-xl",
              cardBody: "flex lg:flex-1 relative",
              profile: "lg:hidden mt-3 mr-3 h-9 w-9",
              profileImage: "bg-gray-300 rounded-full object-fit",
              metadataContainer: "grow pr-6 pt-3 lg:p-0",
              title: "font-bold line-clamp-2 lg:pr-7",
              uploader:
                "text-xs text-base-content/50 hover:text-base-content",
              metadata: "text-sm text-base-content/50 line-clamp-1",
            }}
          >
            {/* addtional menu button for the card ui */}
            {/* this button only shows when device width is large */}
            <div className="absolute lg:top-0 lg:right-0 right-0 top-2">
              <button
                onClick={(e) => e.stopPropagation()}
                className="btn btn-sm btn-circle btn-ghost hover:bg-base-content/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
                </svg>
              </button>
            </div>
          </Card>
        ))}

      <button className="btn btn-outline btn-info rounded-full md:col-span-2">
        Show more
      </button>
    </div>
  );
};

export default Suggestions;
