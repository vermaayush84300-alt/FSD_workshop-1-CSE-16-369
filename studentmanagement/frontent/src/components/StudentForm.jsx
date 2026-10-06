import {
    useEffect,
    useState
} from "react";


const emptyForm = {
    id: "",
    name: "",
    email: "",
    branch: "CSE",
    semester: "",
    mobile: ""
};


function StudentForm({
    onSubmit,
    editingStudent,
    onCancel
}) {

    const [formData, setFormData] =
        useState(emptyForm);


    const [errors, setErrors] =
        useState({});


    const [submitting, setSubmitting] =
        useState(false);


    /*
      When editingStudent changes,
      load student information into form.
    */
    useEffect(() => {

        if (editingStudent) {

            setFormData({
                id: editingStudent.id,
                name: editingStudent.name,
                email: editingStudent.email,
                branch: editingStudent.branch,
                semester: editingStudent.semester,
                mobile: editingStudent.mobile
            });

        } else {

            setFormData(emptyForm);
        }

        setErrors({});

    }, [editingStudent]);


    /*
      Handle input changes
    */
    function handleChange(event) {

        const {
            name,
            value
        } = event.target;


        setFormData(
            (current) => ({
                ...current,
                [name]: value
            })
        );


        setErrors(
            (current) => ({
                ...current,
                [name]: ""
            })
        );
    }


    /*
      Frontend validation
    */
    function validate() {

        const newErrors = {};


        if (!formData.id) {
            newErrors.id =
                "Student ID is required.";
        }


        if (!formData.name.trim()) {
            newErrors.name =
                "Name is required.";
        }


        if (!formData.email.trim()) {

            newErrors.email =
                "Email is required.";

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(formData.email)
        ) {

            newErrors.email =
                "Enter a valid email.";
        }


        if (
            ![
                "CSE",
                "CS",
                "IT",
                "ECE"
            ].includes(formData.branch)
        ) {

            newErrors.branch =
                "Select a valid branch.";
        }


        if (
            !formData.semester ||
            Number(formData.semester) < 1 ||
            Number(formData.semester) > 8
        ) {

            newErrors.semester =
                "Semester must be from 1 to 8.";
        }


        if (
            !/^\d{10}$/.test(
                formData.mobile
            )
        ) {

            newErrors.mobile =
                "Mobile must contain exactly 10 digits.";
        }


        return newErrors;
    }


    /*
      Submit form
    */
    async function handleSubmit(event) {

        event.preventDefault();


        const validationErrors =
            validate();


        if (
            Object.keys(
                validationErrors
            ).length > 0
        ) {

            setErrors(
                validationErrors
            );

            return;
        }


        try {

            setSubmitting(true);


            await onSubmit({

                id: Number(formData.id),

                name:
                    formData.name.trim(),

                email:
                    formData.email.trim(),

                branch:
                    formData.branch,

                semester:
                    Number(formData.semester),

                mobile:
                    formData.mobile
            });


            // Clear form after adding
            if (!editingStudent) {
                setFormData(emptyForm);
            }

        } catch {

            // Error is displayed by App.jsx

        } finally {

            setSubmitting(false);
        }
    }


    return (

        <form
            className="student-form"
            onSubmit={handleSubmit}
        >

            <div className="form-grid">


                {/* Student ID */}
                <div className="form-group">

                    <label htmlFor="id">
                        Student ID
                    </label>

                    <input
                        id="id"
                        name="id"
                        type="number"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="e.g. 101"
                    />

                    {errors.id && (
                        <small>
                            {errors.id}
                        </small>
                    )}

                </div>


                {/* Name */}
                <div className="form-group">

                    <label htmlFor="name">
                        Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                    />

                    {errors.name && (
                        <small>
                            {errors.name}
                        </small>
                    )}

                </div>


                {/* Email */}
                <div className="form-group">

                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rahul@gmail.com"
                    />

                    {errors.email && (
                        <small>
                            {errors.email}
                        </small>
                    )}

                </div>


                {/* Branch */}
                <div className="form-group">

                    <label htmlFor="branch">
                        Branch
                    </label>

                    <select
                        id="branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                    >

                        <option value="CSE">
                            CSE
                        </option>

                        <option value="CS">
                            CS
                        </option>

                        <option value="IT">
                            IT
                        </option>

                        <option value="ECE">
                            ECE
                        </option>

                    </select>

                    {errors.branch && (
                        <small>
                            {errors.branch}
                        </small>
                    )}

                </div>


                {/* Semester */}
                <div className="form-group">

                    <label htmlFor="semester">
                        Semester
                    </label>

                    <input
                        id="semester"
                        name="semester"
                        type="number"
                        min="1"
                        max="8"
                        value={formData.semester}
                        onChange={handleChange}
                        placeholder="1 - 8"
                    />

                    {errors.semester && (
                        <small>
                            {errors.semester}
                        </small>
                    )}

                </div>


                {/* Mobile */}
                <div className="form-group">

                    <label htmlFor="mobile">
                        Mobile Number
                    </label>

                    <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        inputMode="numeric"
                        maxLength="10"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="10 digit mobile number"
                    />

                    {errors.mobile && (
                        <small>
                            {errors.mobile}
                        </small>
                    )}

                </div>

            </div>


            {/* Buttons */}
            <div className="form-actions">

                <button
                    className="primary-btn"
                    type="submit"
                    disabled={submitting}
                >

                    {submitting
                        ? "Saving..."
                        : editingStudent
                            ? "Update Student"
                            : "Add Student"}

                </button>


                {editingStudent && (

                    <button
                        className="secondary-btn"
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                )}

            </div>

        </form>
    );
}


export default StudentForm;