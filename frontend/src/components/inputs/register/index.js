import "./style.scss";
import { TextField } from "@mui/material";
import { ErrorMessage, Form, useField } from "formik";

function RegisterInput({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="input_wrap">
      {/* {meta.touched && meta.error && (
        <div className="input_error">
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
        </div>
      )} */}
      <TextField
        type={field.type}
        ref={field.type}
        name={field.name}
        className="inputField"
        //id="outlined-basic"
        label={label}
        variant="outlined"
        {...field}
        {...props}
        color={meta.touched && meta.error ? "warning" : ""}
        error={meta.touched && meta.error}
        helperText={
          meta.touched && meta.error && <ErrorMessage name={field.name} />
        }
      />
      {meta.touched && meta.error ? <i className="error_icon"></i> : ""}
    </div>
  );
}

export default RegisterInput;
