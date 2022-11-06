import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/login";
import { useState } from "react";
import * as Yup from "yup";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const loginInfos = {
  email: "",
  password: "",
};

function LoginForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  //console.log(login);
  const handleLoginChainge = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  //login form submit
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email,
          password,
        }
      );
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login_wrap">
      <div className="login_1">
        <h3 className="logoName">
          {/* Boo<span>kP</span>ad */}
          BookPad
        </h3>
        <span>BookPad help you to build an good friend circle</span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  name="email"
                  type="email"
                  label="Email Address"
                  onChange={handleLoginChainge}
                />
                <LoginInput
                  name="password"
                  type="password"
                  label="Password"
                  onChange={handleLoginChainge}
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          {loading && (
            <BeatLoader color="#1876f2" loading={loading} size={10} />
          )}
          {error && <div className="error_text">{error}</div>}
          <Link to="/forgot" className="forgot_password">
            Forgotten password?
          </Link>
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
