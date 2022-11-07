import LeftLink from "./LeftLink";
import "./style.scss";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import { ArrowDown1 } from "../../../svg";
import { useState } from "react";

export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="left_home scrollbar">
      <Link className="left_link hover1">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {/* <div className="left_link hover1">
        <div className="small_circle">
          <ArrowDown1 />
        </div>
        <span>See more</span>
      </div>
      <div className="more_left">
        {left.slice(8, left.length).map((link, i) => (
          <LeftLink
            key={i}
            img={link.img}
            text={link.text}
            notification={link.notification}
          />
        ))}
      </div> */}
      <div className="fb_copyright ">
        <Link to="/">Privacy </Link>
        <span>. </span>
        <Link to="/">Terms </Link>
        <span>. </span>
        <Link to="/">Advertising </Link>
        <span>. </span>
        <Link to="/">
          Ad Choices <i className="ad_choices_icon"></i>{" "}
        </Link>
        <span>. </span>
        <Link to="/"></Link>Cookies <span>. </span>
        <Link to="/">More </Link>
        <span>. </span> <br />
        Jaseem © 2022
      </div>
    </div>
  );
}
