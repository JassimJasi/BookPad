import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/Home/left";

function Home() {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div>
      <Header />
      <LeftHome user={user} />
    </div>
  );
}

export default Home;
