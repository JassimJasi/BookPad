import "./login.scss";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";
import { useState } from "react";

function Login() {
  const [visible, setVisible] = useState(false);
  //setVisible(setVisible);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
      </div>
    </div>
  );
}

export default Login;
