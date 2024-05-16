 const makeDate = (
  	month = dayjs().month(),
	year = dayjs().year()
) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    const arrayOfDates = []

    //generate prefixes 

    for (let i = 0; i < firstDateOfMonth.day(); i++) {
      const date = firstDateOfMonth.day(i)
      arrayOfDates.push({currentMonth: false, date})
       
    }
    
    //generate current month dates
    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
		arrayOfDates.push({
			currentMonth: true,
			date: firstDateOfMonth.date(i),
			today: firstDateOfMonth.date(i).isSame(dayjs(), 'day')
		});
	}
    

    //generate suffixes
    const remainingDays = 42 - arrayOfDates.length;

	for (let i = lastDateOfMonth.date() + 1;i <= lastDateOfMonth.date() + remainingDays;i++) {
		arrayOfDates.push({
			currentMonth: false,
			date: lastDateOfMonth.date(i),
		});
	}
    return arrayOfDates
}
 const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const date = makeDate()
console.log(date)
