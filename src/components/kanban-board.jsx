import React, { useState, useEffect } from "react";
import TicketColumn from "./ticket-column";
import { fetchKanbanData, groupAndSortTickets } from "../Utlis/fetching";
import groupImages from "../Utlis/group-images";
import { DragDropContext } from "react-beautiful-dnd"; // Import DragDropContext

// Priority mapping
const priorityLevels = {
	Urgent: 4,
	High: 3,
	Medium: 2,
	Low: 1,
	"No priority": 0,
};

const KanbanBoard = ({ filter }) => {
	const [boardData, setBoardData] = useState({ tickets: [] });
	const [groupedSortedTickets, setGroupedSortedTickets] = useState({});

	useEffect(() => {
		const loadBoardData = async () => {
			const data = await fetchKanbanData();
			setBoardData(data);
			const groupedTickets = groupAndSortTickets(filter, data.tickets);
			setGroupedSortedTickets(groupedTickets);
		};
		loadBoardData();
	}, [filter]);

	const onDragEnd = (result) => {
		const { destination, source } = result;
		console.log(result);

		if (!destination) return;

		let allTickets = [...boardData.tickets];
		const movedTicketIndex = allTickets.findIndex(
			(ticket) => ticket.id === result.draggableId
		);

		if (movedTicketIndex === -1) return;

		const movedTicket = allTickets[movedTicketIndex];
		allTickets.splice(movedTicketIndex, 1);

		const sourceGroupId = source.droppableId;
		const destinationGroupId = destination.droppableId;

		if (sourceGroupId !== destinationGroupId) {
			if (filter.groupBy === "status") {
				movedTicket.status = destinationGroupId;
			} else if (filter.groupBy === "priority") {
				movedTicket.priority = priorityLevels[destinationGroupId];
			} else if (filter.groupBy === "user") {
				movedTicket.user_name = destinationGroupId;
			}
		}

		allTickets.splice(destination.index, 0, movedTicket);
		const groupedSortedTickets = groupAndSortTickets(filter, allTickets);

		const updatedBoardData = {
			tickets: allTickets,
		};

		localStorage.setItem("kanbanData", JSON.stringify(updatedBoardData));

		setBoardData(updatedBoardData);
		setGroupedSortedTickets(groupedSortedTickets);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					gap: "2%",
				}}
			>
				{Object.entries(groupedSortedTickets).map(
					([groupName, tickets]) => (
						<TicketColumn
							key={groupName}
							group={{ groupName, tickets }}
							img={groupImages[groupName]}
							groupBy={filter.groupBy}
						/>
					)
				)}
			</div>
		</DragDropContext>
	);
};

export default KanbanBoard;
