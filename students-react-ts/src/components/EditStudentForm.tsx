import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import Config from '../config'; // Use Config instead of CONSTANTS
import { Student } from '../models/Student'; // Import Student model

interface EditStudentFormProps {
  student: Student;
  onSave: (student: Student) => void;
}

const EditStudentForm: React.FC<EditStudentFormProps> = ({ onSave }) => {
  const { id } = useParams<{ id: string }>(); // Specify the type of useParams
  const [formData, setFormData] = useState<Student>(new Student(0, '', '', '')); // Use Student model for state
  const navigate = useNavigate();

  useEffect(() => {
    if (id) { // Check if id is not undefined
      const fetchStudentData = async () => {
        const response = await fetch(`${Config.API_BASE_URL}students/${id}`);
        const data = await response.json();
        setFormData(new Student(parseInt(id, 10), data.FirstName, data.LastName, data.School));
      };

      fetchStudentData();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${Config.API_BASE_URL}students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        StudentId: formData.StudentId,
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        School: formData.School,
      }),
    });

    if (response.ok) {
      onSave(formData);  // Pass back the updated data
      navigate('/list', { state: { refresh: true } }); // Navigate after save
    } else {
      console.error('Failed to update student');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="FirstName"
          value={formData.FirstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="LastName"
          value={formData.LastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>School</label>
        <input
          type="text"
          name="School"
          value={formData.School}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update Student</button>
    </form>
  );
};

export default EditStudentForm;
