import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Config from "../config/";
import { Student } from "../models/Student";
import NavBar from '../components/NavBar';
import AddStudentForm from '../components/AddStudentForm';
import EditStudentForm from "../components/EditStudentForm";
import NotFoundPage from "../components/NotFoundPage";
import StudentList from "../components/StudentList";

const StudentDetailPage = () => {
  const { id } = useParams<{ id?: string }>(); // id is optional
  const [studentInfo, setStudentInfo] = useState<Student | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const result = await fetch(`${Config.API_BASE_URL}students/${id}`);
        if (result.ok) {
          const body = await result.json();
          setStudentInfo(new Student(body.StudentId, body.FirstName, body.LastName, body.School));
        } else {
          setStudentInfo(null);
        }
      };
      fetchData();
    }
  }, [id]);
  if (!studentInfo) return <NotFoundPage />;
  const handleSave = (updatedStudent: Student) => {
    setStudentInfo(updatedStudent);
    setEditMode(false);
  };

  const handleDelete = async () => {
    if (id) {
      const result = await fetch(`${Config.API_BASE_URL}students/${id}`, {
        method: 'DELETE'
      });
      if (result.ok) {
        navigate('/list'); // Redirect to the list page after deletion
      }
    }
  };

  return (
    <section>
      <NavBar />
      <div style={{ width: "20%", float: "right" }}>
        <h3>Others:</h3>
        {/* Assuming studentInfo is not null and contains StudentId */}
        {studentInfo && <StudentList exceptId={studentInfo.StudentId} />}
      </div>

      <div style={{ width: "50%", float: "left" }}>
        {editMode && studentInfo ? (
          <>
            <EditStudentForm student={studentInfo} onSave={handleSave} />
            <hr />
          </>
        ) : studentInfo ? (
          <>
            <h4 className="text-muted">Student ID={studentInfo.StudentId}</h4>
            <div>
              <b>Name: </b>
              {studentInfo.FirstName} {studentInfo.LastName}
            </div>
            <div>
              <b>School: </b>
              {studentInfo.School}
            </div>
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <hr />
          </>
        ) : null}
        {/* Always show the AddStudentForm to allow adding a student at any time */}
        <AddStudentForm />
      </div>
    </section>
  );
};
export default StudentDetailPage;
