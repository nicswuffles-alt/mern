import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/students"
      );

      setStudents(response.data);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };


  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingId) {

        await axios.put(
          `http://localhost:5000/students/${editingId}`,
          {
            name,
            course,
            age: Number(age)
          }
        );

        alert("Student updated successfully!");

      } else {

        await axios.post(
          "http://localhost:5000/students",
          {
            name,
            course,
            age: Number(age)
          }
        );

        alert("Student added successfully!");
      }

      fetchStudents();

      setName("");
      setCourse("");
      setAge("");

      setEditingId(null);

    } catch (error) {
      console.log("Error:", error);
    }
  };



  const handleEdit = (student) => {
    setEditingId(student._id);

    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/students/${id}`
      );

      alert("Student deleted successfully!");
      fetchStudents();

    } catch (error) {
      console.log("Error deleting student:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);

    setName("");
    setCourse("");
    setAge("");
  };


  return (
    <div>

      <h1>Student Management System</h1>
      {}

      <h2>
        {editingId ? "Edit Student" : "Add Student"}
      </h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Name: </label>

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Enter name"
            required
          />
        </div>


        <div>
          <label>Course: </label>

          <input
            type="text"
            value={course}
            onChange={(event) =>
              setCourse(event.target.value)
            }
            placeholder="Enter course"
            required
          />
        </div>


        <div>
          <label>Age: </label>

          <input
            type="number"
            value={age}
            onChange={(event) =>
              setAge(event.target.value)
            }
            placeholder="Enter age"
            required
          />
        </div>


        <button type="submit">
          {editingId ? "Update Student" : "Add Student"}
        </button>


        {editingId && (
          <button
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}

      </form>


      {}

      <h2>Students</h2>

      {students.map((student) => (

        <div key={student._id}>

          <p>
            Name: {student.name}
          </p>

          <p>
            Course: {student.course}
          </p>

          <p>
            Age: {student.age}
          </p>

          {}

          <button
            onClick={() => handleEdit(student)}
          >
            Edit
          </button>


          {}

          <button
            onClick={() => handleDelete(student._id)}
          >
            Delete
          </button>

          <hr />

        </div>

      ))}

    </div>
  );
}

export default App;