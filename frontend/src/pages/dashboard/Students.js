import React from "react";
import { StudentContainer } from "../../components";
import { Link } from "react-router-dom";

const Students = () => {
  return (
    <>
      <Link to="/addStudent" className="btn btn-hero">
        Add New Student
      </Link>
      <StudentContainer />
    </>
  );
};

export default Students;
