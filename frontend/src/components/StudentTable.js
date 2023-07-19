import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getAllStudents,
  getStudents,
} from "../features/students/allStudentsSlicer";

const StudentTable = (studentsIds) => {
  const { studentsById } = useSelector((store) => store.allStudents);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStudents());
    dispatch(getStudents(studentsIds));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {studentsById.map((student) => (
          <tr key={student._id}>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
            <td>{student.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
