import { useContext, useEffect, useState } from "react";
import { Day, DayPlaceholder, Weekday } from "./CalendarGridComponents";
import ChangeMonthButton from "./ChangeMonthButton";
import Modal from "../CalendarEvent/Modal";
import { EventEditForm, EventForm } from "../CalendarEvent/EventForm/";
import { EventDayContext, ToggleContext } from "../../App";
import {
  indexToMonth,
  indexToMonthShort,
  indexToWeekday,
  indexToWeekdayShort,
} from "../../utils/calendar-helper";
import menu from "../../assets/img/menu.png";
import { useMediaQuery } from "../../hooks";

const Calendar = ({ query1200 }) => {
  const query900 = useMediaQuery("(min-width: 900px)");
  const query600 = useMediaQuery("(min-width: 600px)");
  const query400 = useMediaQuery("(min-width: 400px)");

  const weekdayNames = Array(7).fill(0);
  const initialWeek = Array(42).fill(0);

  const calendarStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: query900 ? "center" : "flex-start",
    position: "relative",
    height: "100%",
  };

  const calendarGridStyle = {
    display: "grid",
    backgroundColor: "black",
    border: "1px solid black",
    height: "100%",
    width: "95%",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: "40px repeat(6, 1fr)",
    gridGap: "1px",
    marginBottom: "20px",
  };

  const calendarHeaderStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    padding: query600 ? "20px" : "10px",
  };

  const calendarHeaderMainGrpStyle = {
    display: "flex",
    alignItems: "center",
    gap: query600 ? "20px" : query400 ? "10px" : "3px",
  };

  const calendarMonthStyle = {
    width: query900 ? "250px" : query600 ? "180px" : query400 ? "90px" : "80px",
    fontSize: query900 ? "" : query600 ? "26px" : query400 ? "20px" : "18px",
    margin: "0",
  };

  const calendarButtonStyle = {
    height: query900 ? "40px" : "30px",
    width: query900 ? "60px" : "50px",
    fontSize: "13px",
    cursor: "pointer",
  };

  const menuButtonStyle = {
    backgroundColor: "lightgrey",
    border: "none",
    height: "50px",
    width: "50px",
    cursor: "pointer",
  };

  const burgerMenuStyle = {
    backgroundColor: "none",
    height: "40px",
    width: "40px",
  };

  const today = new Date();
  const getFirstDayInMonth = (year, monthIndex) => {
    return new Date(year, monthIndex, 1);
  };
  const getTotalDaysInMonth = (year, monthIndex) => {
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const [currMonthIndex, setCurrMonthIndex] = useState(today.getMonth());
  const [currYear, setCurrYear] = useState(today.getFullYear());
  const [firstDayInMonth, setFirstDayInMonth] = useState(
    getFirstDayInMonth(currYear, currMonthIndex)
  );
  const [totalDaysInMonth, setTotalDaysInMonth] = useState(
    getTotalDaysInMonth(currYear, currMonthIndex)
  );
  const { toggleState, toggleDispatch } = useContext(ToggleContext);
  const { eventDayDispatch } = useContext(EventDayContext);

  const handleChangeMonth = (direction) => {
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
                if (
                  JSON.parse(window.localStorage.getItem("eventList")) ===
                    null ||
                  JSON.parse(window.localStorage.getItem("eventList"))
                    .length === 0
                ) {
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
            <button
              style={menuButtonStyle}
              onClick={() => {
                if (toggleState.openEventList) {
                  toggleDispatch({ type: "closeEventList" });
                } else {
                  toggleDispatch({ type: "openEventList" });
                }
              }}
            >
              <img style={burgerMenuStyle} src={menu} alt="burger menu icon" />
            </button>
          ) : null}
        </div>
        <div style={calendarGridStyle}>
          {weekdayNames.map((_weekday, index) => {
            return (
              <Weekday
                key={index}
                weekday={
                  query900
                    ? indexToWeekday.get(index)
                    : indexToWeekdayShort.get(index)
                }
              />
            );
          })}
          {initialWeek.map((_day, index) => {
            switch (true) {
              case index === firstDayInMonth.getDay():
                return (
                  <Day
                    key={index}
                    day={index + 1 - firstDayInMonth.getDay()}
                    month={currMonthIndex}
                    year={currYear}
                  />
                );
              case index < firstDayInMonth.getDay():
                return <DayPlaceholder key={index} />;
              case index - firstDayInMonth.getDay() + 1 <= totalDaysInMonth:
                return (
                  <Day
                    key={index}
                    day={index - firstDayInMonth.getDay() + 1}
                    month={currMonthIndex}
                    year={currYear}
                  />
                );
              default:
                return <DayPlaceholder key={index} />;
            }
          })}
        </div>
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
