import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardForm = ({ values, errors, touched, status }) => {

    const [users, setUser] = useState([]);
    useEffect(() => {
        if (status) {
            setUser([...users, status]);
        }
},[users,status]);


return (
    <div className='onboard-form'>
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
            )}
            <label> Terms Of Service
            <Field type="checkbox" name="tos" checked={values.tos} />
            </label>
            <button type='submit'>Submit Info</button>
        </Form>
        {users.map(user => (
            <ul key={user.id}>
            <li>Name: {user.name}</li>
            <li>Terms of Service: {user.tos}</li>
            {/* <li>Diet: {animal.diet}</li> */}
            </ul>
        ))}
    </div>
);
};

const FormikOnboardForm = withFormik({
    mapPropsToValues({name, email, password, tos }) {
        return {
            name: name || '',
            // email: email || '',
            // password: password || '',
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('You must add a name'),
        // email: Yup.string().required(),
    }),

    handleSubmit(values, { setStatus }) {
        axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
            setStatus(res.data);
        })
        .catch(err => console.log("An error", err.res));
    }
})(OnboardForm);

export default FormikOnboardForm;