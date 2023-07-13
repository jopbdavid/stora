import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/ClassesContainer";
import Class from "./Class";
import { getAllClasses } from "../features/classes/allClassesSlicer";

const ClassesContainer = () => {
  const { isLoading, classes, totalClasses, numOfPages, page } = useSelector(
    (store) => store.allClasses
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClasses());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (classes.length < 1) {
    return (
      <Wrapper>
        <h2>No Classes available...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalClasses} Class{classes.length > 1 && "es"} found
      </h5>
      <div className="jobs">
        {classes.map((item) => {
          return <Class key={item._id} {...item} />;
        })}
      </div>
      {/* {numOfPages > 1 && <PageBtnContainer />} */}
    </Wrapper>
  );
};

export default ClassesContainer;
