import { useState, useEffect } from "react";
import { Student } from "../models/Student";
import Config from "../config";
import { Link } from "react-router-dom";
import List from "./List";

type Props = {
  exceptId?: number;
};

const StudentList = ({ exceptId = undefined }: Props) => {

  const [studentInfo, setStudentInfo] = useState([]);

  const getData = async () => {
    const response = await fetch(`${Config.API_BASE_URL}students/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const jsonData = await response.json();
    setStudentInfo(jsonData);
  };

  useEffect(() => {
    getData();
  }, []);

  let filteredStudents = studentInfo;

  if (exceptId !== undefined) {
    filteredStudents = studentInfo.filter(
      (p: Student) => p.StudentId !== +exceptId
    );
  }

  return (
    <div>
  <List
    items={filteredStudents}
    render={(student: Student) => (
      <Link to={`/detail/${student.StudentId}`}>
        <h6 className="text-muted">
          {student.StudentId} {student.FirstName} {student.LastName}
        </h6>
      </Link>
    )}
  />
</div>

  );  
};

export default StudentList;
