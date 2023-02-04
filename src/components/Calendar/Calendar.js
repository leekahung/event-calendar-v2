import { useContext, useEffect, useState } from "react";
import Day from "./Day";
import ChangeMonthButton from "./ChangeMonthButton";
import Modal from "../CalendarEvent/Modal";
import EventForm from "../CalendarEvent/EventForm";
import EventEditForm from "../CalendarEvent/EventEditForm";
import { EventDateContext, EventEditModalContext, EventModalContext } from "../../App";
import { indexToMonth, indexToWeekday, indexToWeekdayShort } from "../../utils/calendar-helper";
import menu from "../../assets/img/menu.png";
import { useMediaQuery } from "../../hooks";

const DayPlaceholder = () => {
  const style = {
    backgroundColor: "white",
    height: "110px",
    padding: "10px",
  };

  return <div style={style} />;
};

const Weekday = ({ weekday }) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "20px",
    padding: "10px",
  };

  return <div style={style}>{weekday}</div>;
};

const Calendar = ({ query1200, handleOpenEventList }) => {
  const query900 = useMediaQuery("(min-width: 900px)");

  const weekdayNames = Array(7).fill(0);
  const initialWeek = Array(42).fill(0);

  const calendarStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  const calendarGridStyle = {
    display: "grid",
    backgroundColor: "black",
    border: "1px solid black",
    width: "95%",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridGap: "1px",
    marginBottom: "40px",
  };

  const calendarHeaderStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    padding: "20px",
  };

  const calendarHeaderMainGrpStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  const calendarMonthStyle = {
    width: "250px",
    margin: "0",
  };

  const calendarButtonStyle = {
    height: "40px",
    width: "60px",
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
  const [firstDayInMonth, setFirstDayInMonth] = useState(getFirstDayInMonth(currYear, currMonthIndex));
  const [totalDaysInMonth, setTotalDaysInMonth] = useState(getTotalDaysInMonth(currYear, currMonthIndex));
  const [eventDate, setEventDate] = useState(today);
  const { openModal, setOpenModal } = useContext(EventModalContext);
  const { openModalEdit, setOpenModalEdit } = useContext(EventEditModalContext);
  const { setSelectedDate } = useContext(EventDateContext);

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

  const onClose = () => {
    setOpenModal(false);
  };

  const onCloseEdit = () => {
    setOpenModalEdit(false);
  };

  return (
    <>
      <div style={calendarStyle}>
        <div style={calendarHeaderStyle}>
          <div style={calendarHeaderMainGrpStyle}>
            <h1 style={calendarMonthStyle}>
              {indexToMonth.get(currMonthIndex)} {currYear}
            </h1>
            {["left", "right"].map((direction) => {
              return <ChangeMonthButton key={direction} handleChangeMonth={handleChangeMonth} direction={direction} />;
            })}
            <button
              style={calendarButtonStyle}
              onClick={() => {
                handleChangeMonth("reset");
                setSelectedDate(today.getFullYear(), today.getMonth(), today.getDate());
                onClose();
              }}
            >
              Reset Date
            </button>
            <button
              style={calendarButtonStyle}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Add Event
            </button>
          </div>
          <div>
            {query1200 ? null : (
              <button style={menuButtonStyle} onClick={handleOpenEventList}>
                <img style={burgerMenuStyle} src={menu} alt="burger menu icon" />
              </button>
            )}
          </div>
        </div>
        <div style={calendarGridStyle}>
          {weekdayNames.map((_weekday, index) => {
            return <Weekday key={index} weekday={query900 ? indexToWeekday.get(index) : indexToWeekdayShort.get(index)} />;
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
                    setOpenModal={setOpenModal}
                    setEventDate={setEventDate}
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
                    setOpenModal={setOpenModal}
                    setEventDate={setEventDate}
                  />
                );
              default:
                return <DayPlaceholder key={index} />;
            }
          })}
        </div>
        <Modal openModal={openModal} onClose={onClose}>
          <EventForm eventDate={eventDate} indexToMonth={indexToMonth} onClose={onClose} />
        </Modal>
        <Modal openModal={openModalEdit} onClose={onCloseEdit}>
          <EventEditForm eventDate={eventDate} indexToMonth={indexToMonth} onClose={onCloseEdit} />
        </Modal>
      </div>
    </>
  );
};

export default Calendar;
