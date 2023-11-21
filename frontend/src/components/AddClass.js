import React, { useState } from "react";
import Wrapper from "../assets/wrappers/AddClassForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addClass } from "../features/classes/classSlicer";
import { handleClassInput } from "../features/classes/classSlicer";
import { getAllClasses } from "../features/classes/allClassesSlicer";

const AddClass = () => {
  const {
    isLoading,
    isEditing,
    class_name,
    year,
    classProfessor,
    students,
    letter,
  } = useSelector((store) => store.class);
  const { allUsers } = useSelector((store) => store.user);
  const [selectedUser, setSelectedUser] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(handleClassInput({ name, value }));
  };

  const handleClear = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!year || !classProfessor || !letter) {
      toast.error("Please fill out all the fields");
      return;
    }

    dispatch(addClass({ year, letter, classProfessor }));
    setSelectedUser("");
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "Edit class" : "Add class"}</h3>
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
              <option value="">Select Year</option>
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
              values={letter}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-row">
            <label htmlFor="director" className="form-label">
              Class Director:
            </label>
            <select
              name="classProfessor"
              values={classProfessor}
              className="form-select"
              onChange={handleChange}
            >
              <option value="">Select a Teacher</option>
              {allUsers.map((user) => (
                <option key={user.teacher_id} value={user.email}>
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>
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

export default AddClass;
