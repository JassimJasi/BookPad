import Contact from "./Contact";
import "./style.scss";

export default function RightHome({ user }) {
  return (
    <div className="right_home">
      <div className="contacts_wrap">
        <div className="contacts_header">
          <div className="contacts_header_left">Friends</div>
        </div>
        <div className="splitter1"></div>
        <div className="contacts_list">
          <Contact user={user} />
          <div className="OnlineDot"></div>
        </div>
      </div>
    </div>
  );
}
