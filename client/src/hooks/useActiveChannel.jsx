import { useSelector } from "react-redux";

const useActiveChannel = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const activeChannel = userInfo?.ownedChannels?.find(
    (channel) => channel._id === userInfo.currentUser?.activeChannel
  );

  return { userInfo, activeChannel };
};

export default useActiveChannel;
