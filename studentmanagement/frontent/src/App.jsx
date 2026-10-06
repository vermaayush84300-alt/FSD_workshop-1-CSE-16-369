import { useEffect, useState } from "react";

import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import SearchStudent from "./components/SearchStudent";


const API_URL =
    "http://localhost:5000/api/students";


function App() {

    // Student records
    const [students, setStudents] = useState([]);

    // Student currently being edited
    const [editingStudent, setEditingStudent] =
        useState(null);

    // Search text
    const [searchTerm, setSearchTerm] =
        useState("");

    // Success/error message
    const [message, setMessage] =
        useState("");

    const [messageType, setMessageType] =
        useState("success");

    // Loading state
    const [loading, setLoading] =
        useState(true);


    /*
      useEffect runs when component loads.
      It fetches students from backend.
    */
    useEffect(() => {
        fetchStudents();
    }, []);


    /*
      GET all students
    */
    async function fetchStudents() {

        try {

            setLoading(true);

            const response =
                await fetch(API_URL);

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Could not fetch students."
                );
            }

            setStudents(data);

        } catch (error) {

            showMessage(
                error.message,
                "error"
            );

        } finally {

            setLoading(false);
        }
    }


    /*
      Display notification
    */
    function showMessage(
        text,
        type = "success"
    ) {

        setMessage(text);
        setMessageType(type);

        setTimeout(() => {
            setMessage("");
        }, 3000);
    }


    /*
      POST - Add student
    */
    async function addStudent(student) {

        try {

            const response =
                await fetch(API_URL, {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(student)
                });


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Could not add student."
                );
            }


            // Add new student to state
            setStudents(
                (currentStudents) => [
                    ...currentStudents,
                    data.student
                ]
            );


            showMessage(data.message);

        } catch (error) {

            showMessage(
                error.message,
                "error"
            );

            throw error;
        }
    }


    /*
      PUT - Update student
    */
    async function updateStudent(student) {

        try {

            const response =
                await fetch(
                    `${API_URL}/${editingStudent.id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(student)
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Could not update student."
                );
            }


            setStudents(
                (currentStudents) =>
                    currentStudents.map(
                        (item) =>
                            item.id === editingStudent.id
                                ? data.student
                                : item
                    )
            );


            setEditingStudent(null);

            showMessage(data.message);

        } catch (error) {

            showMessage(
                error.message,
                "error"
            );

            throw error;
        }
    }


    /*
      Select student for editing
    */
    function handleEdit(student) {

        setEditingStudent(student);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /*
      DELETE - Delete student
    */
    async function handleDelete(id) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this student?"
            );


        if (!confirmed) {
            return;
        }


        try {

            const response =
                await fetch(
                    `${API_URL}/${id}`,
                    {
                        method: "DELETE"
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Could not delete student."
                );
            }


            setStudents(
                (currentStudents) =>
                    currentStudents.filter(
                        (student) =>
                            student.id !== id
                    )
            );


            if (
                editingStudent &&
                editingStudent.id === id
            ) {
                setEditingStudent(null);
            }


            showMessage(data.message);

        } catch (error) {

            showMessage(
                error.message,
                "error"
            );
        }
    }


    /*
      Cancel editing
    */
    function handleCancelEdit() {
        setEditingStudent(null);
    }


    /*
      Search students by:
      - ID
      - Name
  
      Name search is case-insensitive.
    */
    const filteredStudents =
        students.filter((student) => {

            const search =
                searchTerm
                    .trim()
                    .toLowerCase();


            if (!search) {
                return true;
            }


            return (
                String(student.id)
                    .includes(search) ||

                student.name
                    .toLowerCase()
                    .includes(search)
            );
        });


    return (

        <div className="app">

            {/* Header */}
            <header className="header">

                <div>

                    <h1>
                        Student Management System
                    </h1>

                    <p>
                        React + Node.js + Express
                    </p>

                </div>

            </header>


            <main className="container">


                {/* Notification */}
                {message && (

                    <div
                        className={`message ${messageType}`}
                    >
                        {message}
                    </div>

                )}


                {/* Student Form */}
                <section className="card">

                    <h2>
                        {editingStudent
                            ? "Update Student"
                            : "Add Student"}
                    </h2>


                    <StudentForm
                        onSubmit={
                            editingStudent
                                ? updateStudent
                                : addStudent
                        }

                        editingStudent={
                            editingStudent
                        }

                        onCancel={
                            handleCancelEdit
                        }
                    />

                </section>


                {/* Student List */}
                <section className="card">

                    <div className="section-heading">

                        <h2>
                            Students
                        </h2>

                        <span className="count">
                            {filteredStudents.length}
                            {" "}
                            record(s)
                        </span>

                    </div>


                    {/* Search */}
                    <SearchStudent
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />


                    {loading ? (

                        <p className="status">
                            Loading students...
                        </p>

                    ) : (

                        <StudentList
                            students={
                                filteredStudents
                            }

                            onEdit={
                                handleEdit
                            }

                            onDelete={
                                handleDelete
                            }

                            hasSearch={
                                Boolean(
                                    searchTerm.trim()
                                )
                            }
                        />

                    )}

                </section>

            </main>

        </div>
    );
}


export default App;