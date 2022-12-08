import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home/Index";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/Activate";
import Reset from "./pages/reset/Index";
import CreatePostPopup from "./components/createPostPopup/Index";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { postsReducer } from "./functions/reducers";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: "",
  });
  useEffect(() => {
    getAllPosts();
  }, []);

  //to get posts
  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POST_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POST_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  //to get posts ends...
  return (
    <div>
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/profile"
            element={<Profile setVisible={setVisible} />}
            exact
          />
          <Route
            path="/profile/:username"
            element={<Profile setVisible={setVisible} />}
            exact
          />
          <Route path="/messenger" element={<Messenger />} exact />
          <Route
            path="/"
            element={<Home setVisible={setVisible} posts={posts} />}
            exact
          />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
