export const getInitials = (name) => {
	const nameParts = name.split(" ");
	const initials = nameParts
		.map((part) => part.charAt(0).toUpperCase())
		.join("");
	return initials;
};


export const getRandomHexColor = (name) => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	const firstLetter = name[1].toUpperCase();
	for (let i = 0; i < 6; i++) {
		color += letters[(firstLetter.charCodeAt(0) + i + 17) % 16];
	}
	return color;
};


