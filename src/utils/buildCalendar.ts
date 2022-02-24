import { Dayjs } from "dayjs";

export default function calendarLogic(now: Dayjs) {
	const startOfYear = now.subtract(3, "years").startOf("year");
	const endOfYear = now.subtract(3, "years").endOf("year");
	let day = startOfYear.subtract(1, "day");
	const temp: Dayjs[][] = [];
	for (let i = 0; i < 7; i++) {
		temp.push([]);
	}
	while (day.isBefore(endOfYear, "day")) {
		const myDay = day.get("day");
		temp[myDay].push((day = day.add(1, "day")));
	}

	return temp;
}

const isSelected = (value: Dayjs, day: Dayjs) => {
	return value.isSame(day);
};
const isBefore = (day: Dayjs) => {
	return day.isBefore(new Date(), "day");
};
const isToday = (day: Dayjs) => {
	return day.isSame(new Date(), "day");
};

export const dayStyles = (value: Dayjs, day: Dayjs) => {
	if (isSelected(value, day)) return "selected";
	if (isToday(day)) return "today";
	return "";
};
