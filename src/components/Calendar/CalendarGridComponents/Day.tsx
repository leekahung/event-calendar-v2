import { EventDayContext, EventListContext } from "../../../context";
import { useContext } from "react";
import { useMediaQuery } from "../../../hooks";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface Props {
  index: number;
  year: number;
  month: number;
  day: number;
}

const Day = ({ index, year, month, day }: Props) => {
  const { eventDayState, eventDayDispatch } = useContext(EventDayContext);
  const { eventList } = useContext(EventListContext);
  const query900 = useMediaQuery("(min-width: 900px)");
  const query600 = useMediaQuery("(min-width: 600px)");

  const numEvents = eventList.filter((e) => {
    const eventDate = e.date as Date;
    const eventDay = new Date(eventDate);
    if (
      eventDay.getDate() === day &&
      eventDay.getMonth() === month &&
      eventDay.getFullYear() === year
    ) {
      return e;
    }
    return null;
  }).length;

  return (
    <>
      <Button
        sx={{
          fontSize: query900 ? "16px" : "14px",
          borderRadius: 0,
          color: "rgb(30, 30, 30)",
          padding: query600 ? "" : "0",
          minWidth: "45px",
          backgroundColor:
            index % 7 === 0 || index % 7 === 6 ? "rgb(220, 220, 220)" : "white",
          "&:hover": {
            backgroundColor: "rgb(200, 160, 200)",
            "&:active": {
              backgroundColor: "lightgrey",
            },
          },
        }}
        onClick={() => {
          eventDayDispatch({ type: "setEventYear", payload: year });
          eventDayDispatch({ type: "setEventMonth", payload: month });
          eventDayDispatch({ type: "setEventDay", payload: day });
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          position="relative"
          height="100%"
          width="100%"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            top="10%"
            height={query600 ? "30px" : "25px"}
            width={query600 ? "30px" : "25px"}
            borderRadius="20px"
            sx={{
              backgroundColor:
                JSON.stringify({
                  year: eventDayState.eventYear,
                  month: eventDayState.eventMonth,
                  day: eventDayState.eventDay,
                }) === JSON.stringify({ year, month, day })
                  ? "lightblue"
                  : "",
            }}
          >
            {day}
          </Box>
          <Box position="absolute" bottom="10%" right="15%">
            {numEvents ? (
              query900 ? (
                numEvents
              ) : (
                <Box
                  height="3px"
                  width="3px"
                  borderRadius="5px"
                  sx={{ backgroundColor: "black" }}
                />
              )
            ) : null}
          </Box>
        </Box>
      </Button>
    </>
  );
};

export default Day;
