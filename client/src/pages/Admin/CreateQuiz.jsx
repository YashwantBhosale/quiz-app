import React, { useState, useEffect } from "react";
import TextInput from "../../components/ui/TextInput";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "../../components/ui/DateTimePicker";
import BackButton from "../../components/ui/BackButton";

const BASE_URL = "http://localhost:4000";

const CreateQuiz = () => {
	// title, subject, description, startsAt, endsAt, duration, total_marks, passing_marks, max_attempts
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		subject: "",
		description: "",
		startsAtDate: "",
		startsAtTime: "",
		endsAtDate: "",
		endsAtTime: "",
		startsAt: "",
		endsAt: "",
		duration: "",
		total_marks: "",
		passing_marks: "",
		max_attempts: "",
	});

	const handleChange = (e) => {
		e.preventDefault();
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleNumericInput = (e) => {
		if (/^\d+$/.test(e.target.value) || e.target.value === "") {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	const combineDateAndTime = (date, time) => {
		if (!date || !time) return null;
		return new Date(`${date}T${time}`);
	};

	const handleDateChange = (e, field) => {
		setFormData({ ...formData, [field]: e.target.value });
	};

	useEffect(() => {
		const startsAt = combineDateAndTime(
			formData.startsAtDate,
			formData.startsAtTime
		);
		const endsAt = combineDateAndTime(formData.endsAtDate, formData.endsAtTime);

		setFormData((prevData) => ({
			...prevData,
			startsAt: startsAt ? startsAt.toISOString() : "",
			endsAt: endsAt ? endsAt.toISOString() : "",
		}));
	}, [
		formData.startsAtDate,
		formData.startsAtTime,
		formData.endsAtDate,
		formData.endsAtTime,
	]);

	// calculate duration from startsAt and endsAt
	function getDuration(startsAt, endsAt) {
		const diff = new Date(endsAt) - new Date(startsAt);
		return Math.floor(diff / 60000);
	}

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const formdata = {
				title: formData.title,
				subject: formData.subject,
				description: formData.description,
				startsAt: formData.startsAt,
				endsAt: formData.endsAt,
				duration: getDuration(formData.startsAt, formData.endsAt),
				total_marks: formData.total_marks,
				passing_marks: formData.passing_marks,
				max_attempts: formData.max_attempts,
			};

			const response = await fetch(`${BASE_URL}/api/admin/createquiz`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				},
				body: JSON.stringify(formdata),
			});
			if (response.ok) {
				const data = await response.json();
				alert(data.message);
			} else {
				const error = await response.json();
				alert(error.message);
			}
		} catch (e) {
			console.log(e);
			alert("An error occurred. Please try again later!");
		} finally {
			setFormData({
				title: "",
				subject: "",
				description: "",
				startsAtDate: "",
				startsAtTime: "",
				endsAtDate: "",
				endsAtTime: "",
				startsAt: "",
				endsAt: "",
				duration: "",
				total_marks: "",
				passing_marks: "",
				max_attempts: "",
			});
		}
	};

	return (
		<div className=" mt-[50px] ml-[80px]">
			<h1 className="font-bold text-3xl">Create New Quiz</h1>
			<BackButton path={"/admindashboard"} />
			<form
				className="mt-5 space-y-4 md:space-y-6 my-8"
				onSubmit={handleSubmit}
			>
				<TextInput
					label="Title"
					id="title"
					value={formData.title}
					onChange={handleChange}
					placeholder="Enter the title"
					required
				/>
				<TextInput
					label="Subject"
					id="subject"
					value={formData.subject}
					onChange={handleChange}
					placeholder="Enter the subject"
					required
				/>
				<div className="mb-5 max-w-[80%]">
					<label
						htmlFor="description-input"
						className="block text-sm font-medium text-gray-700"
					>
						Description
					</label>
					<textarea
						id="description-input"
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Enter the description"
						required
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
				<DateTimePicker
					label="Starts At"
					id="startsAt"
					dateValue={formData.startsAtDate}
					timeValue={formData.startsAtTime}
					onDateChange={(e) => handleDateChange(e, "startsAtDate")}
					onTimeChange={(e) => handleDateChange(e, "startsAtTime")}
				/>
				<DateTimePicker
					label="Ends At"
					id="endsAt"
					dateValue={formData.endsAtDate}
					timeValue={formData.endsAtTime}
					onDateChange={(e) => handleDateChange(e, "endsAtDate")}
					onTimeChange={(e) => handleDateChange(e, "endsAtTime")}
				/>
				<TextInput
					label="Total Marks"
					id="total_marks"
					value={formData.total_marks}
					onChange={handleNumericInput}
					placeholder="Enter the total marks"
					required
				/>
				<TextInput
					label="Passing Marks"
					id="passing_marks"
					value={formData.passing_marks}
					onChange={handleNumericInput}
					placeholder="Enter the passing marks"
					required
				/>
				<TextInput
					label="Max Attempts"
					id="max_attempts"
					value={formData.max_attempts}
					onChange={handleNumericInput}
					placeholder="Enter the max attempts"
					required
				/>
				<button
					type="submit"
					className="bg-green-500 text-white px-5 py-3 rounded-md font-bold"
				>
					Create Quiz
				</button>
			</form>
		</div>
	);
};

export default CreateQuiz;
