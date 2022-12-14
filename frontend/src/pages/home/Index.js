//import { useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost/Index";
import Header from "../../components/header/Index";
import LeftHome from "../../components/Home/left";
import RightHome from "../../components/Home/right";
import SendVerification from "../../components/Home/sendVerification/Index";
import Stories from "../../components/Home/stories";
import Post from "../../components/post/Index";
import "./Home.scss";

function Home({ setVisible, posts }) {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="home">
      <Header page="home" />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        {user.verified === false && <SendVerification user={user} />}

        <CreatePost user={user} setVisible={setVisible} />
        <div className="posts">
          {/* {console.log(posts)} */}
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
}

export default Home;
