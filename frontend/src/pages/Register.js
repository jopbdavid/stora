import React, { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlicer";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //Inicializar state values locais
  const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: false,
  };
  //Gestir valores de login em conjunto e atualizar no store redux
  const [values, setValues] = useState(initialState);
  //Inicializar store para acesso valores de estado global
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  //Redirect to home page se utilizador existente
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!name && !isMember)) {
      toast.error("Please fill out all the requested fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    } else {
      dispatch(registerUser({ name: name, email: email, password: password }));
      return;
    }
  };
  const handleClick = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        {values.isMember ? <h3>Login</h3> : <h3>Register</h3>}
        {!values.isMember && (
          <div className="form-row">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              className="form-input"
              onChange={handleChange}
            />
          </div>
        )}
        <div className="form-row">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={values.password}
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-block" type="submit">
          {" "}
          {!isLoading ? "Submit" : "Loading..."}{" "}
        </button>
        {values.isMember ? (
          <p>
            Not a member yet?{" "}
            <button type="button" className="member-btn" onClick={handleClick}>
              Register
            </button>
          </p>
        ) : (
          <p>
            Already a member{" "}
            <button type="button" className="member-btn" onClick={handleClick}>
              Login
            </button>
          </p>
        )}
      </form>
    </Wrapper>
  );
};

export default Register;
