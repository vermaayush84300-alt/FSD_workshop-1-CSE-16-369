const express = require("express");

const router = express.Router();

/*
  In-memory student array.

  Data will be lost when the Node.js
  server is restarted.
*/
let students = [
    {
        id: 101,
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        branch: "CSE",
        semester: 3,
        mobile: "9876543210"
    }
];

const allowedBranches = ["CSE", "CS", "IT", "ECE"];

/*
  Server-side validation
*/
function validateStudent(data) {
    const errors = {};

    // Student ID
    if (data.id === undefined || data.id === "") {
        errors.id = "Student ID is required.";
    } else if (
        !Number.isInteger(Number(data.id)) ||
        Number(data.id) <= 0
    ) {
        errors.id = "Student ID must be a positive number.";
    }

    // Name
    if (!data.name || String(data.name).trim() === "") {
        errors.name = "Name is required.";
    }

    // Email
    if (!data.email || String(data.email).trim() === "") {
        errors.email = "Email is required.";
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))
    ) {
        errors.email = "Enter a valid email address.";
    }

    // Branch
    if (!allowedBranches.includes(data.branch)) {
        errors.branch = "Branch must be CSE, CS, IT or ECE.";
    }

    // Semester
    if (
        data.semester === undefined ||
        data.semester === "" ||
        !Number.isInteger(Number(data.semester)) ||
        Number(data.semester) < 1 ||
        Number(data.semester) > 8
    ) {
        errors.semester = "Semester must be between 1 and 8.";
    }

    // Mobile
    if (!/^\d{10}$/.test(String(data.mobile || ""))) {
        errors.mobile = "Mobile number must contain exactly 10 digits.";
    }

    return errors;
}


/*
  GET /api/students

  Fetch all students
*/
router.get("/", (req, res) => {
    res.json(students);
});


/*
  GET /api/students/:id

  Fetch one student by ID
*/
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(
        (student) => student.id === id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found."
        });
    }

    res.json(student);
});


/*
  POST /api/students

  Add new student
*/
router.post("/", (req, res) => {
    const errors = validateStudent(req.body);

    // Validation failed
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            message: "Validation failed.",
            errors
        });
    }

    const id = Number(req.body.id);

    // Check duplicate ID
    const duplicate = students.some(
        (student) => student.id === id
    );

    if (duplicate) {
        return res.status(409).json({
            message: "Student ID already exists."
        });
    }

    const newStudent = {
        id: id,
        name: String(req.body.name).trim(),
        email: String(req.body.email).trim(),
        branch: req.body.branch,
        semester: Number(req.body.semester),
        mobile: String(req.body.mobile)
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully.",
        student: newStudent
    });
});


/*
  PUT /api/students/:id

  Update existing student
*/
router.put("/:id", (req, res) => {
    const oldId = Number(req.params.id);

    const studentIndex = students.findIndex(
        (student) => student.id === oldId
    );

    // Student doesn't exist
    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found."
        });
    }

    const errors = validateStudent(req.body);

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            message: "Validation failed.",
            errors
        });
    }

    const newId = Number(req.body.id);

    // Check whether changed ID already belongs to another student
    const duplicate = students.some(
        (student, index) =>
            student.id === newId &&
            index !== studentIndex
    );

    if (duplicate) {
        return res.status(409).json({
            message: "Student ID already exists."
        });
    }

    const updatedStudent = {
        id: newId,
        name: String(req.body.name).trim(),
        email: String(req.body.email).trim(),
        branch: req.body.branch,
        semester: Number(req.body.semester),
        mobile: String(req.body.mobile)
    };

    students[studentIndex] = updatedStudent;

    res.json({
        message: "Student updated successfully.",
        student: updatedStudent
    });
});


/*
  DELETE /api/students/:id

  Delete student
*/
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const studentIndex = students.findIndex(
        (student) => student.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found."
        });
    }

    const deletedStudent = students.splice(
        studentIndex,
        1
    )[0];

    res.json({
        message: "Student deleted successfully.",
        student: deletedStudent
    });
});


module.exports = router;