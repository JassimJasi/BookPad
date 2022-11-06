function GenderSelect({ handleRegisterChange, genderError }) {
  return (
    <div
      className="reg_col"
      style={{ marginBottom: `${genderError && "15px"}` }}
    >
      <div className="reg_line_header">
        Gender <i className="info_icon"></i>
      </div>
      <div className="reg_grid">
        <label htmlFor="male">
          Male
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            onChange={handleRegisterChange}
          />
        </label>
        <label htmlFor="female">
          Female
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            onChange={handleRegisterChange}
          />
        </label>
        <label htmlFor="custom">
          Custom
          <input
            type="radio"
            name="gender"
            id="custom"
            value="custom"
            onChange={handleRegisterChange}
          />
        </label>
        {genderError && <p className="input_error">{genderError}</p>}
      </div>
    </div>
  );
}

export default GenderSelect;
