import { useContext, useEffect, useState } from "react";
import ChangeMonthButton from "./ChangeMonthButton";
import Modal from "../CalendarEvent/Modal";
import { EventEditForm, EventForm } from "../CalendarEvent/EventForm";
import { EventDayContext, ToggleContext } from "../../context";
import {
  indexToMonth,
  indexToMonthShort,
  getFirstDayInMonth,
  getTotalDaysInMonth,
} from "../../utils/calendar-helper";
import menu from "../../assets/img/menu.png";
import IconButton from "@mui/material/IconButton";
import { useMediaQuery } from "../../hooks";
import CalenderGrid from "./CalendarGridComponents/CalendarGrid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

interface Props {
  query1200: boolean;
}

const Calendar = ({ query1200 }: Props) => {
  const query900 = useMediaQuery("(min-width: 900px)");
  const query600 = useMediaQuery("(min-width: 600px)");
  const query450 = useMediaQuery("(min-width: 450px)");

  const calendarStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    height: "100%",
  };

  const calendarMonthStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    width: query900 ? "250px" : query600 ? "180px" : "90px",
    fontSize: query900 ? "" : query600 ? "23px" : query450 ? "20px" : "18px",
    paddingTop: "3px",
    margin: "0",
  };

  const burgerMenuStyle: React.CSSProperties = {
    backgroundColor: "none",
    height: "40px",
    width: "40px",
  };

  const today = new Date();

  const [currMonthIndex, setCurrMonthIndex] = useState(today.getMonth());
  const [currYear, setCurrYear] = useState(today.getFullYear());
  const { toggleState, toggleDispatch } = useContext(ToggleContext);
  const { eventDayDispatch } = useContext(EventDayContext);

  const [firstDayInMonth, setFirstDayInMonth] = useState(
    getFirstDayInMonth(currYear, currMonthIndex)
  );
  const [totalDaysInMonth, setTotalDaysInMonth] = useState(
    getTotalDaysInMonth(currYear, currMonthIndex)
  );

  const handleChangeMonth = (direction: string) => {
    switch (direction) {
      case "left":
        if (currMonthIndex === 0) {
          setCurrMonthIndex(11);
          setCurrYear(currYear - 1);
          break;
        }
        setCurrMonthIndex(currMonthIndex - 1);
        break;
      case "right":
        if (currMonthIndex === 11) {
          setCurrMonthIndex(0);
          setCurrYear(currYear + 1);
          break;
        }
        setCurrMonthIndex(currMonthIndex + 1);
        break;
      default:
        setCurrYear(today.getFullYear());
        setCurrMonthIndex(today.getMonth());
        break;
    }
  };

  useEffect(() => {
    setFirstDayInMonth(getFirstDayInMonth(currYear, currMonthIndex));
    setTotalDaysInMonth(getTotalDaysInMonth(currYear, currMonthIndex));
  }, [currYear, currMonthIndex]);

  return (
    <>
      <div style={calendarStyle}>
        <Box display="flex" padding="15px 10px">
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              gap: query600 ? "20px" : query450 ? "10px" : "5px",
              padding: query600 ? "" : "0px",
            }}
          >
            <h1 style={calendarMonthStyle}>
              {query600
                ? indexToMonth.get(currMonthIndex)
                : indexToMonthShort.get(currMonthIndex)}{" "}
              {currYear}
            </h1>
            {["left", "right"].map((direction) => {
              return (
                <ChangeMonthButton
                  key={direction}
                  handleChangeMonth={handleChangeMonth}
                  direction={direction}
                />
              );
            })}
            <Button
              variant="contained"
              sx={{
                fontSize: query600 ? "12px" : "10px",
                padding: query600 ? "" : "6px",
                minWidth: query600 ? "" : "55px",
              }}
              onClick={() => {
                handleChangeMonth("reset");
                eventDayDispatch({
                  type: "setEventYear",
                  payload: today.getFullYear(),
                });
                eventDayDispatch({
                  type: "setEventMonth",
                  payload: today.getMonth(),
                });
                eventDayDispatch({
                  type: "setEventDay",
                  payload: today.getDate(),
                });
                toggleDispatch({ type: "closeModal" });
                toggleDispatch({ type: "closeModalEdit" });
                toggleDispatch({ type: "closeEventList" });
              }}
            >
              Reset {query900 ? "Date" : ""}
            </Button>
            <Button
              variant="contained"
              sx={{
                fontSize: query600 ? "12px" : "10px",
                padding: query600 ? "" : "6px",
                minWidth: query600 ? "" : "55px",
              }}
              onClick={() => {
                toggleDispatch({ type: "openModal" });
              }}
            >
              Add {query900 ? "Event" : ""}
            </Button>
            <Button
              variant="contained"
              sx={{
                fontSize: query600 ? "12px" : "10px",
                padding: query600 ? "" : "6px",
                minWidth: query600 ? "" : "55px",
              }}
              onClick={() => {
                const localEventList = window.localStorage.getItem("eventList");
                if (!localEventList) {
                  return;
                }
                if (
                  window.confirm(
                    "Warning: You're about to delete all events from this calendar. Do you wish to continue?"
                  )
                ) {
                  window.localStorage.clear();
                  window.location.reload();
                }
              }}
            >
              Clear {query900 ? "Events" : ""}
            </Button>
          </Container>
          {query1200 ? null : query900 ? (
            <Box>
              <IconButton
                onClick={() => {
                  if (toggleState.openEventList) {
                    toggleDispatch({ type: "closeEventList" });
                  } else {
                    toggleDispatch({ type: "openEventList" });
                  }
                }}
              >
                <img
                  style={burgerMenuStyle}
                  src={menu}
                  alt="burger menu icon"
                />
              </IconButton>
            </Box>
          ) : null}
        </Box>
        <CalenderGrid
          firstDayInMonth={firstDayInMonth}
          totalDaysInMonth={totalDaysInMonth}
          currMonthIndex={currMonthIndex}
          currYear={currYear}
        />
        <Modal
          openModal={toggleState.openModal}
          onClose={() => {
            toggleDispatch({ type: "closeModal" });
          }}
        >
          <EventForm indexToMonth={indexToMonth} />
        </Modal>
        <Modal
          openModal={toggleState.openModalEdit}
          onClose={() => {
            toggleDispatch({ type: "closeModalEdit" });
          }}
        >
          <EventEditForm indexToMonth={indexToMonth} />
        </Modal>
      </div>
    </>
  );
};

export default Calendar;
