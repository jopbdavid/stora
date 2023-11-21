import React from "react";
import Wrapper from "../assets/wrappers/Class";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteClass } from "../features/classes/classSlicer";

const Class = (item) => {
  const dispatch = useDispatch();
  const { class_id, class_name, year, director_id, students, director_name } =
    item;

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{class_name}</div>
        <div className="info">
          <h5>Class: {class_name}</h5>
          <p>year: {year}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <h5>Number of students:</h5>

          <div className="status interview">{students?.length || 0}</div>
          {/* <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} /> */}
        </div>
        <div className="content-center">
          <h5>Class Professor: </h5>
          <div className="status interview">{director_name}</div>
        </div>

        <Link to="/singleClass" state={item} className="btn open-btn">
          Open Class
        </Link>

        <footer>
          <div className="actions">
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteClass(class_id))}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Class;
