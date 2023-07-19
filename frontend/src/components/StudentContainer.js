import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/StudentContainer";
import Student from "./Student";
import { getAllStudents } from "../features/students/allStudentsSlicer";

const StudentContainer = () => {
  const { isLoading, students, totalStudents, numOfPages, page } = useSelector(
    (store) => store.allStudents
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStudents());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (students?.length < 1) {
    return (
      <Wrapper>
        <h2>No Students available...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <>
        <h5>
          {totalStudents} Student{students.length > 1 && "s"} found
        </h5>
        <div className="students">
          {students.map((item) => {
            return <Student key={item._id} {...item} />;
          })}
        </div>
        {/* {numOfPages > 1 && <PageBtnContainer />} */}
      </>
    </Wrapper>
  );
};

export default StudentContainer;
