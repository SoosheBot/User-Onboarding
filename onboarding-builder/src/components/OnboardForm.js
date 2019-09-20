import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardForm = ({ values, errors, touched, status }) => {

    const [users, setUsers] = useState([]);
        useEffect(() => {
            if (status) {
                status && setUsers(users => [...users, status]);
            }
},[status]);


return (
    <div className='onboard-form'>
        <Form>
            <label>Name: </label>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
            )}
            <label> Email: </label>
            <Field type="text" name="email" placeholder="Email" />
            {touched.email && errors.email && (
            <p className="email">{errors.email}</p>
            )} 
            <label> Password: </label>
            <Field type='password' name="password" placeholder="Password" />
            {touched.password && errors.password && (
            <p className="password">{errors.password}</p>
            )} 
            <label> Terms Of Service </label>
            <Field type="checkbox" name="tos" checked={values.tos} />
            {touched.tos && errors.tos && (
            <p className="tos">{errors.tos}</p>
            )} 
            <button type='submit'>Submit Info</button>
        </Form>
        {users.map(login => (
            <>
                <p><strong>Name:</strong> {login.name}</p>
                <p><strong>Email:</strong> {login.email}</p>
                <p><strong>Password:</strong> {login.password.replace(login.password,'For your safety, your password is hidden!')}</p>
            </>
        ))}
    </div>
);
};

const FormikOnboardForm = withFormik({
    mapPropsToValues({name, email, password, tos }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('You must add a name.'),
        email: Yup.string().required('Give us your email, please.'),
        password: Yup.string().required('What, no password?'),
        tos: Yup.bool().oneOf([true], "You must agree to the Terms of Service")
    }),

    handleSubmit(values, { setStatus, resetForm }) {
        axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
            console.log('Is this working', values);
            setStatus(res.data);
            resetForm('');            
        })
        .catch(err => console.log("An error", err.res));
    }
    
})(OnboardForm);



export default FormikOnboardForm;