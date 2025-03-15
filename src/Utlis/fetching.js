export const addUserNamesToTickets = (tickets, users) => {
	return tickets.map((ticket) => {
		const user = users.find((u) => u.id === ticket.userId);
		return { ...ticket, user_name: user ? user.name : "Unknown User" };
	});
};


export const fetchKanbanData = async () => {
	const storedData = localStorage.getItem("kanbanData");

	if (storedData) {
		return JSON.parse(storedData);
	} else {
		const response = await fetch(
			"https://api.quicksell.co/v1/internal/frontend-assignment"
		);
		if (!response.ok) throw new Error("Error fetching data");
		const data = await response.json();
        const ticketsWithUserNames = addUserNamesToTickets(
            data.tickets,
            data.users
        );
		localStorage.setItem("kanbanData", JSON.stringify({ tickets: ticketsWithUserNames }));
		return { tickets: ticketsWithUserNames };
	}
};

export const priorityLevels = {
	4: "Urgent",
	3: "High",
	2: "Medium",
	1: "Low",
	0: "No priority",
};
export const groupAndSortTickets = (filter, tickets) => {
	const groupedData = {};

	if (filter.groupBy === "status") {
		const statusGroups = [
			"Backlog",
			"Todo",
			"In progress",
			"Completed",
			"Canceled",
		];

		statusGroups.forEach((status) => {
			groupedData[status] = tickets.filter(
				(ticket) => ticket.status.toLowerCase() === status.toLowerCase()
			);
		});
	} 
	else if (filter.groupBy === "user") {
		tickets.forEach((ticket) => {
			const userName = ticket.user_name;
			if (!groupedData[userName]) {
				groupedData[userName] = [];
			}
			groupedData[userName].push(ticket);
		});
	} 
	
	else if (filter.groupBy === "priority") {
		Object.keys(priorityLevels).forEach((priority) => {
			groupedData[priorityLevels[priority]] = tickets.filter(
				(ticket) => ticket.priority === parseInt(priority)
			);
		});
	}


	const sortTickets = (tickets) => {
		if (filter.orderBy === "priority") {
			return tickets.sort((a, b) => b.priority - a.priority);
		} else if (filter.orderBy === "title") {
			return tickets.sort((a, b) => a.title.localeCompare(b.title));
		}
		return tickets;
	};

	Object.keys(groupedData).forEach((groupKey) => {
		groupedData[groupKey] = sortTickets(groupedData[groupKey]);
	});

	return groupedData;
};
