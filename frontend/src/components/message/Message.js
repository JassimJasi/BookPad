import "./Style.scss";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Message({ message, own }) {
  const [userDet, setUserDet] = useState(null);
  //console.log(user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios(
          `${process.env.REACT_APP_BACKEND_URL}/getProfileId/` + message.sender
        );
        setUserDet(res.data);
        //console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userDet]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={userDet?.picture} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
