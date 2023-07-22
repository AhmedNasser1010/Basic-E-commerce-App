import "../style/contact.css";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Form(props) {
	const [values, setValues] = useState({
		name: "",
		subject: "message-of-thanks",
		email: "",
		details: ""
	});

	useEffect(() => {
		// console.log(values);
	}, [values]);

	function handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;

		setValues({...values, [name]: value});
	}

	function handleSubmit(e) {
		e.preventDefault();

		const name = values.name;
		const email = values.email;
		const details = values.details;

		if (name === "" || email === "" || details === "") {props.isValid(false); return false}

		props.isValid(true);
		return true;
	}

	return (

		<>
			<div className="intro">
				<h1 className="title">Contact Us</h1>
				<p className="p">Contact the help team 😊</p>
			</div>
			<form className="form" onSubmit={handleSubmit}>
				<label className="name">
					Your Name:
					{values.name === "" && <span className="validation">*</span>}
					<input placeholder="Write your name here" name="name" type="text" onChange={handleChange} value={values.name} />
				</label>
				<label className="subject">
					Subject:
					<select name="subject" value={values.subject} onChange={handleChange}>
						<option value="message-of-thanks">Message Of Thanks</option>
						<option value="problem-report">Problem Report</option>
						<option value="development-message">Development Message</option>
					</select>
				</label>
				<label className="email">
					Email:
					{values.email === "" && <span className="validation">*</span>}
					<input placeholder="Write your email here" name="email" type="email" onChange={handleChange} />
				</label>
				<label className="details">
					Details:
					{values.details === "" && <span className="validation">*</span>}
					<textarea placeholder="Write the details here" name="details" onChange={handleChange} />
				</label>
				<input className="submit-btn" type="submit" value="Submit" />
			</form>
		</>

	);
}

function Submited() {
	return (

		<div className="msg-of-thanks">
			<h3 className="title">Thank You! 🤗</h3>
			<p className="paragraph">
				Thank you for your time and for fill the form and help our team,
				<Link className="link" to="/"> Back To Home</Link>
			</p>
		</div>

	);
}

function Contact() {
	const [isValid, setIsValid] = useState(false);

	function handleValidation(validation) {
		setIsValid(validation);
	}

	return (

		<div className="contact">
			{isValid ? <Submited /> : <Form isValid={handleValidation} />}
		</div>

	);
}

export default Contact;