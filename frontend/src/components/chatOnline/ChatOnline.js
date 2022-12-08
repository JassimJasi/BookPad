import axios from "axios";
import { useEffect, useState } from "react";
import "./Style.scss";

export default function ChatOnline({
  onlineUsers,
  currentId,
  setCurrentChat,
  // user,
}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  //const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/friends/${currentId}`
      );
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  // console.log("akakaka", onlineUsers);
  //console.log(user);
  const handleClick = async (user) => {
    try {
      const res = await axios.post(
        // `${process.env.REACT_APP_BACKEND_URL}/conversations/find/ +
        //   ${currentId} +/+
        //   ${user.id}`
        `${process.env.REACT_APP_BACKEND_URL}/conversations`,
        {
          senderId: user._id,
          receiverId: currentId,
        }
      );
      //console.log(res.data);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={o?.picture} alt="" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">
            {o?.first_name} {o?.last_name}
          </span>
        </div>
      ))}
    </div>
  );
}
