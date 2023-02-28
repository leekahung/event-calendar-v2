import Day from "./Day";
import DayPlaceholder from "./DayPlaceholder";
import Weekday from "./Weekday";
import {
  indexToWeekday,
  indexToWeekdayShort,
} from "../../../utils/calendar-helper";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "../../../hooks";

interface Props {
  firstDayInMonth: Date;
  totalDaysInMonth: number;
  currMonthIndex: number;
  currYear: number;
}

const CalenderGrid = ({
  firstDayInMonth,
  totalDaysInMonth,
  currMonthIndex,
  currYear,
}: Props) => {
  const query900 = useMediaQuery("(min-width: 900px)");

  const weekdayNames = Array(7).fill(0);
  const initialWeek = Array(42).fill(0);

  return (
    <Grid
      display="grid"
      gridTemplateColumns="repeat(7, 1fr)"
      gridTemplateRows={
        query900 ? "40px repeat(6, 1fr)" : "30px repeat(6, 1fr)"
      }
      gap="1px"
      sx={{
        backgroundColor: "black",
        border: "1px solid black",
        height: "100%",
        width: "95%",
        marginBottom: "30px",
      }}
    >
      <>
        {weekdayNames.map((_weekday, index) => {
          const weekday = query900
            ? (indexToWeekday.get(index) as string)
            : (indexToWeekdayShort.get(index) as string);
          return <Weekday key={index} index={index} weekday={weekday} />;
        })}
      </>
      <>
        {initialWeek.map((_day, index) => {
          switch (true) {
            case index === firstDayInMonth.getDay():
              return (
                <Day
                  key={index}
                  index={index}
                  day={index + 1 - firstDayInMonth.getDay()}
                  month={currMonthIndex}
                  year={currYear}
                />
              );
            case index < firstDayInMonth.getDay():
              return <DayPlaceholder key={index} index={index} />;
            case index - firstDayInMonth.getDay() + 1 <= totalDaysInMonth:
              return (
                <Day
                  key={index}
                  index={index}
                  day={index - firstDayInMonth.getDay() + 1}
                  month={currMonthIndex}
                  year={currYear}
                />
              );
            default:
              return <DayPlaceholder key={index} index={index} />;
          }
        })}
      </>
    </Grid>
  );
};

export default CalenderGrid;
