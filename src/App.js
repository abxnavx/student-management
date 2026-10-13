
import React, { useState } from "react";
import "./App.css";

function App() {
  // Store the student list
  const [students, setStudents] = useState([]);

  // Store form inputs
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [studentClass, setStudentClass] = useState("");

  // Store search input
  const [search, setSearch] = useState("");

  // Store the ID of the student being edited
  const [editId, setEditId] = useState(null);

  // Store edited student details
  const [editName, setEditName] = useState("");
  const [editRoll, setEditRoll] = useState("");
  const [editClass, setEditClass] = useState("");

  // Add a new student
  function handleSubmit(e) {
    e.preventDefault();

    // Check whether fields are empty
    if (
      name.trim() === "" ||
      roll.trim() === "" ||
      studentClass.trim() === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Check whether roll number already exists
    const duplicate = students.some(
      (student) =>
        student.roll.toLowerCase() === roll.trim().toLowerCase()
    );

    if (duplicate) {
      alert("Roll number already exists");
      return;
    }

    // Generate student ID
    const newStudent = {
      id: students.length + 1,
      name: name.trim(),
      roll: roll.trim(),
      studentClass: studentClass.trim(),
    };

    // Add student to the list
    setStudents([...students, newStudent]);

    // Clear the form
    setName("");
    setRoll("");
    setStudentClass("");
  }

  // Start editing a student
  function handleEdit(student) {
    setEditId(student.id);
    setEditName(student.name);
    setEditRoll(student.roll);
    setEditClass(student.studentClass);
  }

  // Save edited student details
  function handleSave(id) {
    if (
      editName.trim() === "" ||
      editRoll.trim() === "" ||
      editClass.trim() === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Check whether another student uses this roll number
    const duplicate = students.some(
      (student) =>
        student.id !== id &&
        student.roll.toLowerCase() === editRoll.trim().toLowerCase()
    );

    if (duplicate) {
      alert("Roll number already exists");
      return;
    }

    // Update the selected student
    const updatedStudents = students.map((student) =>
      student.id === id
        ? {
            ...student,
            name: editName.trim(),
            roll: editRoll.trim(),
            studentClass: editClass.trim(),
          }
        : student
    );

    setStudents(updatedStudents);
    setEditId(null);
  }

  // Cancel editing
  function handleCancel() {
    setEditId(null);
  }

  // Delete a student
  function handleDelete(id) {
    const updatedStudents = students.filter(
      (student) => student.id !== id
    );

    setStudents(updatedStudents);
    setEditId(null);
  }

  // Search students by name
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Student List Management</h1>

      {/* Add Student Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />

        <input
          type="text"
          placeholder="Class (e.g. 10A)"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
        />

        <button type="submit">Add Student</button>
      </form>

      {/* Search Input */}
      <input
        className="search"
        type="text"
        placeholder="Search student by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Student Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Roll Number</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan="5">No students found</td>
            </tr>
          ) : (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>

                <td>
                  {editId === student.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    student.name
                  )}
                </td>

                <td>
                  {editId === student.id ? (
                    <input
                      value={editRoll}
                      onChange={(e) => setEditRoll(e.target.value)}
                    />
                  ) : (
                    student.roll
                  )}
                </td>

                <td>
                  {editId === student.id ? (
                    <input
                      value={editClass}
                      onChange={(e) => setEditClass(e.target.value)}
                    />
                  ) : (
                    student.studentClass
                  )}
                </td>

                <td>
                  {editId === student.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSave(student.id)}
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleEdit(student)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

