import { FaArrowLeft } from "react-icons/fa";
import { SearchBar } from "../features";
import { Modal } from "../ui";

const SearchModal = ({ setShowSearchBar }) => {
  return (
    <Modal
      overlay={false}
      className="
      absolute 
      top-0 left-0
      w-full h-14 
      flex items-center 
      gap-4 justify-between 
      px-2 bg-base-300
      "
    >
      <button className="btn btn-ghost" onClick={() => setShowSearchBar(false)}>
        <FaArrowLeft size={20} />
      </button>
      <SearchBar />
    </Modal>
  );
};

export default SearchModal;
