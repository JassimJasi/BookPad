import "./Style.scss";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  Friends,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import { useRef, useState } from "react";
import AllMenu from "./AllMenu";
import useClickOutside from "../../helpers/clickOutside";
import UserMenu from "./userMenu/Index";

function Header({ page }) {
  const { user } = useSelector((user) => ({ ...user }));
  //console.log(user);

  const color = "#65676b";
  const [showSearchMenu, setShowSearchMenu] = useState(false);

  //hide & show menu bar
  const [showAllMenu, setShowAllMenu] = useState(false);
  const allMenu = useRef();
  useClickOutside(allMenu, () => {
    setShowAllMenu(false);
  });

  //hide & show user menu
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenu = useRef();
  useClickOutside(userMenu, () => {
    setShowUserMenu(false);
  });

  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search BookPad"
            className="hide_input"
          />
        </div>
      </div>

      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}

      <div className="header_middle">
        <Link
          to={"/"}
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
        >
          {page === "home" ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link to={"/"} className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to={"/"} className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        {/* <Link to={"/"} className="middle_icon hover1">
          <Market color={color} />
        </Link> */}
        <Link to={"/"} className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link
          to={"/profile"}
          className={`profile_link hover1 ${
            page === "profile" ? "active_link" : ""
          }`}
        >
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>
        <div
          className={`circle_icon hover1
        ${showAllMenu && "active_header"}
          `}
          ref={allMenu}
        >
          <div
            onClick={() => {
              /*{
              showAllMenu ? setShowAllMenu(false) : setShowAllMenu(true);
            }*/
              setShowAllMenu((prev) => !prev);
            }}
          >
            <Menu />
          </div>
          {showAllMenu && <AllMenu />}
        </div>
        <Link to={"/messenger"}>
          <div className="circle_icon hover1">
            <Messenger />
          </div>
        </Link>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
          ref={userMenu}
        >
          <div
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            <ArrowDown />
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
