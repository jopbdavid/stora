import React from "react";
import Wrapper from "../../assets/wrappers/SingleClass";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { AddClass } from "../../components";
import StudentTable from "../../components/StudentTable";

const SingleClass = () => {
  const { isLoading, isEditing } = useSelector((store) => store.class);

  const dispatch = useDispatch();
  const location = useLocation();
  const item = location.state;
  const { name, year, letter, students, teachers, classProfessor } = item;

  return (
    <>
      <Wrapper>
        <header>
          <div className="main-icon">{name}</div>
          <div className="info">
            <h5>Year: {year}</h5>
            <p>Class: {letter}</p>
          </div>
        </header>
        <div className="content">
          <StudentTable studentsIds={students} />
        </div>
      </Wrapper>
      <AddClass />
    </>
  );
};

export default SingleClass;
