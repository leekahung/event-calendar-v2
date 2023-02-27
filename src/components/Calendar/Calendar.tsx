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

interface Props {
  query1200: boolean;
}

const Calendar = ({ query1200 }: Props) => {
  const query900 = useMediaQuery("(min-width: 900px)");
  const query600 = useMediaQuery("(min-width: 600px)");
  const query400 = useMediaQuery("(min-width: 400px)");

  const calendarStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    height: "100%",
  };

  const calendarHeaderStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    padding: query900 ? "20px" : "10px",
  };

  const calendarHeaderMainGrpStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: query600 ? "20px" : query400 ? "10px" : "3px",
  };

  const calendarMonthStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    width: query900 ? "250px" : query600 ? "180px" : query400 ? "90px" : "80px",
    fontSize: query900 ? "" : query600 ? "23px" : query400 ? "20px" : "18px",
    margin: "0",
  };

  const calendarButtonStyle: React.CSSProperties = {
    height: query900 ? "40px" : "30px",
    width: query900 ? "60px" : "50px",
    fontSize: "13px",
    cursor: "pointer",
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
        <div style={calendarHeaderStyle}>
          <div style={calendarHeaderMainGrpStyle}>
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
            <button
              style={calendarButtonStyle}
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
            </button>
            <button
              style={calendarButtonStyle}
              onClick={() => {
                toggleDispatch({ type: "openModal" });
              }}
            >
              Add {query900 ? "Event" : ""}
            </button>
            <button
              style={{ ...calendarButtonStyle, backgroundColor: "" }}
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
            </button>
          </div>
          {query1200 ? null : query900 ? (
            <>
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
            </>
          ) : null}
        </div>
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