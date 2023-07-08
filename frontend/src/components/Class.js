import React from "react";
import Wrapper from "../assets/wrappers/Class";
import { Link } from "react-router-dom";

const Class = ({ name }) => {
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{name.charAt(0)}</div>
        <div className="info">
          {/* <h5>{position}</h5>
          <p>{company}</p> */}
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          {/* <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} /> */}
          {/* <div className={`status ${status}`}>{status}</div> */}
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

export default Class;
