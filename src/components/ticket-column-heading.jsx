import { getRandomHexColor, getInitials } from "../Utlis/color_initials";
import add from "../assets/icons_FEtask/add.svg";
import threedot from "../assets/icons_FEtask/3 dot menu.svg";
import groupImages from "../Utlis/group-images";
export default function TicketColumnHeading({
	groupName,
	ticketsLength,
	groupBy,
}) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				width: "100%",
				alignItems: "center",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "15px",
				}}
			>
				{groupBy != "user" ? (
					<img
						src={groupImages[groupName]}
						alt="Group Icon"
						style={{ width: "15px", height: "15px" }}
					/>
				) : (
					<button
						style={{
							backgroundColor: getRandomHexColor(groupName),
							width: "20px",
							height: "20px",
							color: "#fff",
							border: "none",
							borderRadius: "50%",
							fontSize: "10px",
							padding: "0",
						}}
					>
						{getInitials(groupName)}
					</button>
				)}
				<h4 style={{ color: "#3f3f40", fontWeight: "bold" }}>
					{groupName}
				</h4>
				<h5>{ticketsLength}</h5>
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "15px",
				}}
			>
				<img
					src={add}
					alt="Group Icon"
					style={{ width: "20px", height: "20px" }}
				/>
				<img
					src={threedot}
					alt="Group Icon"
					style={{ width: "20px", height: "20px" }}
				/>
			</div>
		</div>
	);
}
