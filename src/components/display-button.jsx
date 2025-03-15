import React, { useState } from "react";
import down from "../assets/icons_FEtask/down.svg";
import display from "../assets/icons_FEtask/display.svg";

const DisplayButton = ({ filter, setFilter }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	const toggleDropdown = () => setShowDropdown(!showDropdown);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFilter((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}));
	};

	const dropdownButtonStyle = {
		padding: "10px 10px",
		color: "#5c5c5e",
		border: "0.5px solid #ccc",
		borderRadius: "9px",
		cursor: "pointer",
		transition: "background-color 0.3s ease",
		display: "flex",
		alignItems: "center",
		gap: "10px",
	};

	const imageStyle = {
		width: "15px",
		height: "15px",
	};

	const dropdownMenuStyle = {
		position: "absolute",
		backgroundColor: "white",
		border: "0.5px solid #ccc",
		color: "#5c5c5e",
		fontSize: "14px",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
		borderRadius: "5px",
		padding: "8px",
		width: "250px",
		marginTop: "10px",
		zIndex: 1,
	};

	const dropdownItemStyle = {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "5px",
	};

	const dropdownSelectStyle = {
		padding: "8px",
		width: "70%",
		borderRadius: "5px",
		border: "1px solid #ccc",
	};

	return (
		<div style={{ position: "relative" }}>
			<button style={dropdownButtonStyle} onClick={toggleDropdown}>
				<img src={display} alt="left icon" style={imageStyle} />
				Display
				<img src={down} alt="right icon" style={imageStyle} />
			</button>

			{showDropdown && (
				<div style={dropdownMenuStyle}>
					<div style={dropdownItemStyle}>
						<label htmlFor="groupBy">Grouping</label>
						<select
							id="groupBy"
							name="groupBy"
							value={filter.groupBy}
							onChange={handleChange}
							style={dropdownSelectStyle}
						>
							<option value="status">Status</option>
							<option value="user">User</option>
							<option value="priority">Priority</option>
						</select>
					</div>

					<div style={dropdownItemStyle}>
						<label htmlFor="orderBy">Ordering</label>
						<select
							id="orderBy"
							name="orderBy"
							value={filter.orderBy}
							onChange={handleChange}
							style={dropdownSelectStyle}
						>
							<option value="priority">Priority</option>
							<option value="title">Title</option>
						</select>
					</div>
				</div>
			)}
		</div>
	);
};

export default DisplayButton;
