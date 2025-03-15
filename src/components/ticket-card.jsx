import React from "react";
import { Draggable } from "react-beautiful-dnd"; // Import Draggable component
import { getInitials, getRandomHexColor } from "../Utlis/color_initials";
import groupImages from "../Utlis/group-images";

const priorityLevels = {
	4: "Urgent",
	3: "High",
	2: "Medium",
	1: "Low",
	0: "No priority",
};

const TicketCardBody = ({ ticket , groupBy}) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "8px",
			}}
		>
			<h6 style={{ margin: 0, fontWeight: "normal" }}>{ticket.id}</h6>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "10px",
				}}
			>
				{groupBy !== "status" && (
					<img
						src={groupImages[ticket.status]}
						alt="Group Icon"
						style={{ width: "12px", height: "12px" }}
					/>
				)}
				<h5 style={{ color: "#3f3f40", margin: 0 }}>{ticket.title}</h5>
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "10px",
				}}
			>
				{groupBy !== "priority" && (
					<img
						src={groupImages[priorityLevels[ticket.priority]]}
						alt="Group Icon"
						style={{ width: "12px", height: "12px" }}
					/>
				)}
				<div
					style={{
						width: "10px",
						height: "10px",
						backgroundColor: "#5c5c5e",
						borderRadius: "50%",
					}}
				></div>
				<h6 style={{ margin: 0, fontWeight: "normal" }}>
					{ticket.tag.join(", ")}
				</h6>
			</div>
		</div>
	);
};

const TicketCard = ({ ticket, groupBy, index }) => {
	return (
		<Draggable draggableId={ticket.id.toString()} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={{
						...provided.draggableProps.style,
						display: "flex",
						justifyContent: "space-between",
						gap: "10px",
						backgroundColor: "#fff",
						padding: "15px",
						borderRadius: "7px",
						border: "0.5px solid #c5c5c538",
						boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
						width: "100%",
						maxWidth: "300px",
					}}
				>
					<TicketCardBody ticket={ticket} groupBy={groupBy}/>
					{groupBy !== "user" && (
						<div>
							<button
								style={{
									backgroundColor: getRandomHexColor(ticket.user_name),
									width: "20px",
									height: "20px",
									color: "#fff",
									border: "none",
									borderRadius: "50%",
									fontSize: "10px",
									padding: "0",
								}}
							>
								{getInitials(ticket.user_name)}
							</button>
						</div>
					)}
				</div>
			)}
		</Draggable>
	);
};

export default TicketCard;
