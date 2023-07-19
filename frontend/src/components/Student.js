import React from "react";
import Wrapper from "../assets/wrappers/Student";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import calculateAge from "../utils/age";
import { BsTypeH3 } from "react-icons/bs";

const Student = ({
  firstName,
  lastName,
  dateOfBirth,
  gender,
  address,
  email,
  guardianName,
  guardianContact,
  guardianEmail,
  className,
  photo,
}) => {
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
            <button type="button" className="btn delete-btn" onClick="">
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Student;
