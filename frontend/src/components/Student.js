import React, { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/Student";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import calculateAge from "../utils/age";
import { BsTypeH3 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getSingleClass } from "../features/classes/classSlicer";
import { deleteStudent } from "../features/students/studentsSlicer";

const Student = ({
  student_id,
  first_name: firstName,
  last_name: lastName,
  date_of_birth: dateOfBirth,
  gender,
  address,
  email,
  guardian_name,
  guardian_contact,
  guardian_email,
  class_id,
  photo,
}) => {
  const dispatch = useDispatch();
  const [className, setClassName] = useState("");

  useEffect(() => {
    const fetchClassName = async (class_id) => {
      const response = await dispatch(getSingleClass(class_id));

      setClassName(response.payload);
    };
    if (class_id) {
      fetchClassName(class_id);
    }
  }, [dispatch, class_id]);

  return (
    <Wrapper>
      <div className="container">
        <header>
          <div className="main-icon">
            {photo ? (
              <img src={photo} alt="StudentPhoto" />
            ) : (
              <CgProfile style={{ fontSize: "30px" }} />
            )}
          </div>

          <div className="info">
            <h5>
              <b>
                {firstName} {lastName}
              </b>
            </h5>
            <h5>{className}</h5>
          </div>
        </header>
        <div className="content">
          <div className="content-center">
            <p>
              <b>Gender:</b> {gender}
            </p>
            <p>
              <b>Age:</b> {calculateAge(dateOfBirth)}
            </p>
            <p>
              <b>Address:</b> {address}
            </p>
            <p>
              <b>Email: </b>
              {email}
            </p>
            {/* <div className="actions">
              <Link to="/add-job" className="btn edit-btn" onClick="">
                Edit
              </Link>
              <button type="button" className="btn delete-btn" onClick="">
                Delete
              </button>
            </div> */}
          </div>
        </div>
        <footer>
          <div className="actions">
            <Link to="/add-job" className="btn edit-btn" onClick="">
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteStudent(student_id))}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Student;
