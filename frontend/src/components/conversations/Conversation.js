import axios from "axios";
import { useEffect, useState } from "react";
import "./Style.scss";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  //console.log(user);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(
          `${process.env.REACT_APP_BACKEND_URL}/getProfileId/` + friendId
        );
        setUser(res.data);
        //console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation hover1">
      <img src={user?.picture} alt="" className="conversationImg" />
      <span className="conversationName">
        {user?.first_name} {user?.last_name}
      </span>
    </div>
  );
}
