import React from "react";
import Wrapper from "../assets/wrappers/AddClassForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addStudent } from "../features/students/studentsSlicer";
import { handleStudentInput } from "../features/students/studentsSlicer";

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
    className,
    photo,
  } = useSelector((store) => store.students);
  const dispatch = useDispatch();

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
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "Edit student" : "Add student"}</h3>
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
          <label htmlFor="dateOfBirth" className="form-label">
            date of birth:
          </label>
          <input
            type="text"
            name="dateOfBirth"
            values={dateOfBirth}
            onChange={handleChange}
            className="form-input"
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
            defaultValue=""
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-center">
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
              <option value=""></option>
              <option value={5}>5º grade</option>
              <option value={6}>6º grade</option>
              <option value={7}>7º grade</option>
              <option value={8}>8º grade</option>
              <option value={9}>9º grade</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="letter" className="form-label">
              Letter:
            </label>
            <input
              type="text"
              name="letter"
              values=""
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-row">
            <label htmlFor="classProfessor" className="form-label">
              Diretor de Turma:
            </label>
            <input
              type="text"
              name="classProfessor"
              values=""
              onChange={handleChange}
              className="form-input"
            />
          </div>

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
        </div>
      </form>
    </Wrapper>
  );
};

export default AddStudent;
