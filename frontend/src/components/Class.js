import React from "react";
import Wrapper from "../assets/wrappers/Class";
import { Link } from "react-router-dom";

const Class = ({ name, year, letter, students, teachers, classProfessor }) => {
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{name}</div>
        <div className="info">
          <h5>Year: {year}</h5>
          <p>Class: {letter}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <h5>Number of students:</h5>

          <div className="status interview">{students.length}</div>
          {/* <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} /> */}
        </div>
        <div className="content-center">
          <h5>Class Professor: </h5>
          <div className="status interview">{classProfessor}</div>
        </div>

        <Link to="" className="btn open-btn" onClick="">
          Open Class
        </Link>

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

export default Class;
