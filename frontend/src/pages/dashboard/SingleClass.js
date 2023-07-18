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
  console.log(location);
  const item = location.state;

  const { name, year, letter, students, teachers, classProfessor } = item;
  console.log(item);

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
          <StudentTable students={students} />
        </div>
      </Wrapper>
      <AddClass />
    </>
  );
};

export default SingleClass;
