//import { TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/register";
import * as Yup from "yup";
import { useMediaQuery } from "react-responsive";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function RegisterForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const desktopView = useMediaQuery({
    query: "(min-width:536px)",
  });
  const userInfo = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };

  const [user, setUser] = useState(userInfo);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const yearTemp = new Date().getFullYear();
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  //console.log(years, days);

  //validation
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("first_name required")
      .min(2, "Should be minimum 2 characters.")
      .max(16, "Should only be maximum 16 characters.")
      .matches(/^[aA-zZ\s]+$/, "Number and special characters are not allowed"),
    last_name: Yup.string()
      .required("first_name required")
      .min(2, "Should be minimum 2 characters.")
      .max(16, "Should only be maximum 16 characters.")
      .matches(/^[aA-zZ\s]+$/, "Number and special characters are not allowed"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Should be minimum 6 characters."),
  });

  //date and gender validation
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  //register form submit
  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setLoading(true);
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>SignUp</span>
          <span>It's quick and easy</span>
        </div>
        <hr />
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atLeast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (current_date - picked_date < atLeast14) {
              setDateError("Your to young...");
            } else if (current_date - picked_date > noMoreThan70) {
              setDateError("Your to old...");
            } else if (gender === "") {
              setDateError("");
              setGenderError("Gender Required");
            } else {
              setDateError("");
              setGenderError("");
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  name="first_name"
                  type="text"
                  label="First name"
                  onChange={handleRegisterChange}
                  style={{
                    paddingRight: `${desktopView ? "10px" : "0"}`,
                  }}
                />
                <RegisterInput
                  name="last_name"
                  type="text"
                  label="Last name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  name="email"
                  type="email"
                  label="Email Address"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  name="password"
                  type="password"
                  label="Password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of Birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              <GenderSelect
                handleRegisterChange={handleRegisterChange}
                genderError={genderError}
              />
              <div className="reg_infos">
                By clicking Sign Up, you agree to our <span>Terms</span> . Learn
                how we collect, use and share your data in our{" "}
                <span>Privacy Policy</span> and how we use cookies and similar
                technology in our <span>Cookies Policy</span>.
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup">Sign Up</button>
              </div>
              {loading && (
                <BeatLoader color="green" loading={loading} size={10} />
              )}
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterForm;
