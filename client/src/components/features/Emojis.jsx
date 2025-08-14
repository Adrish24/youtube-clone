import { emojiGroups } from "../../constants/emojis";

// Emojis component to display a list of emojis grouped by categories
// It accepts an onClick prop to handle emoji selection

const Emojis = ({ onClick }) => {
  return (
    <div className="w-70 h-full bg-neutral p-4 rounded-xl flex flex-col space-y-2 z-50">
      {emojiGroups.map((group) => (
        <div key={group.label}>
          <h1>{group.label}</h1>
          <div className="flex flex-wrap space-x-1">
            {group.emojis.map((emoji) => (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(emoji.symbol);
                }}
                className="text-xl cursor-pointer hover:bg-base-content/20 rounded"
                title={emoji.name}
                key={emoji.name}
              >
                {emoji.symbol}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Emojis;
