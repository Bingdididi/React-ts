import { useState} from "react";
import Config from "../config/";
import { useNavigate } from 'react-router-dom';
import { Student } from "../models/Student";

const AddStudentForm = () => {
    const [studentInfo, setStudentInfo] = useState<Student>({
        StudentId: 0,
        FirstName: "",
        LastName: "",
        School: "",
      });
      
    const navigate = useNavigate();

    const addStudent =()=>{
        const result = fetch(`${Config.API_BASE_URL}students/`,{
            method:'post',
            body:JSON.stringify({
                FirstName: studentInfo.FirstName,
                LastName: studentInfo.LastName,
                School: studentInfo.School,
            }),
            headers:{'Content-Type':'application/json'}
        });
        result
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        
        navigate('/list',{state:{refresh:true}});
    }
    return(
    <div className="panel panel-default">
      <form>
        <h3>Add Student</h3>
        <div className="form-group">
          <label>First Name:</label>
          <input className="form-control" type="text" placeholder="First Name"
            value={studentInfo.FirstName} 
            onChange={(event) => setStudentInfo({...studentInfo, FirstName: event.target.value})}  />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input className="form-control" type="text" placeholder="Last Name"
            value={studentInfo.LastName} 
            onChange={(event) => setStudentInfo({...studentInfo, LastName: event.target.value})}  />
        </div>
        <div className="form-group">
          <label>School:</label>
          <input className="form-control" type="text" placeholder="School"
            value={studentInfo.School} onChange={(event) => setStudentInfo({...studentInfo, School: event.target.value})} />
        </div>

        <input type="submit" 
        onClick={() => addStudent()} className="btn btn-success" value="Add" />
      </form>
    </div>
);

}
export default AddStudentForm;
