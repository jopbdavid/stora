import React, { useEffect } from "react";
import Wrapper from "../../assets/wrappers/addStudentForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { handleStudentInput } from "../../features/students/studentsSlicer";
import { getAllClasses } from "../../features/classes/allClassesSlicer";

const AddStudent = () => {
  const {
    isLoading,
    isEditing,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    address,
    email,
    guardianName,
    guardianContact,
    year,
    studentClassName,
    photo,
  } = useSelector((store) => store.students);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClasses());
  }, []);
  const { classes } = useSelector((store) => store.allClasses);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(handleStudentInput({ name, value }));
  };

  const handleClear = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!year || !firstName || !lastName) {
      toast.error("Please fill out all the fields");
      return;
    }
    dispatch();
  };
  return (
    <>
      <Link to="/student" className="btn btn-hero">
        Back to students
      </Link>
      <Wrapper>
        <form className="form" onSubmit={handleSubmit}>
          <h3>{isEditing ? "Edit student" : "Add student"}</h3>
          <div className="form-center">
            <div className="form-row">
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                values={firstName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                values={lastName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label htmlFor="studentClassName" className="form-label">
                Class:
              </label>
              <select
                name="studentClassName"
                type="text"
                values={studentClassName}
                className="form-select"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="">Please Select a Class</option>
                {classes.map((item) => {
                  return <option value={item.name}>{item.name}</option>;
                })}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="dateOfBirth" className="form-label">
                date of birth:
              </label>
              <input
                type="text"
                name="dateOfBirth"
                values={dateOfBirth}
                onChange={handleChange}
                className="form-input"
                defaultValue="dd / mm / yyyy"
              />
            </div>
            <div className="form-row">
              <label htmlFor="gender" className="form-label">
                gender:
              </label>
              <select
                name="gender"
                type="text"
                values={gender}
                className="form-select"
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="year" className="form-label">
                Year:
              </label>
              <select
                name="year"
                type="text"
                values={year}
                className="form-select"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="">Select a Grade</option>
                <option value={5}>5º grade</option>
                <option value={6}>6º grade</option>
                <option value={7}>7º grade</option>
                <option value={8}>8º grade</option>
                <option value={9}>9º grade</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="address" className="form-label">
                Address:
              </label>
              <input
                type="text"
                name="address"
                values={address}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                name="email"
                values={email}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label htmlFor="guardianName" className="form-label">
                Guardian Name:
              </label>
              <input
                type="text"
                name="guardianName"
                values={guardianName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label htmlFor="guardianContact" className="form-label">
                Guardian Contact:
              </label>
              <input
                type="text"
                name="guardianContact"
                values={guardianContact}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
        </form>
        <br />
        <div className="btn-container">
          <button
            className="btn btn-block clear-btn"
            type="button"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="btn btn-block submit-btn"
            type="submit"
            disabled={isLoading}
          >
            {!isLoading ? "Submit" : "Loading..."}
          </button>
        </div>
      </Wrapper>
    </>
  );
};

export default AddStudent;
