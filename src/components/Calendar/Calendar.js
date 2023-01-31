import { useEffect, useState } from "react";
import Modal from "../CalendarEvent/Modal";
import EventForm from "../CalendarEvent/EventForm";

const Day = ({ day, month, year, setOpenModal, setEventDate }) => {
  const style = {
    display: "flex",
    fontSize: "16px",
    backgroundColor: "white",
    height: "130px",
    padding: "15px 20px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <>
      <button
        style={style}
        onClick={() => {
          setOpenModal(true);
          setEventDate(new Date(year, month, day));
        }}
      >
        {day}
      </button>
    </>
  );
};

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

const Calendar = () => {
  const weekdayNames = Array(7).fill(0);
  const initialWeek = Array(42).fill(0);
  const indexToWeekday = new Map([
    [0, "Sunday"],
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wednesday"],
    [4, "Thursday"],
    [5, "Friday"],
    [6, "Saturday"],
  ]);
  const indexToMonth = new Map([
    [0, "January"],
    [1, "February"],
    [2, "March"],
    [3, "April"],
    [4, "May"],
    [5, "June"],
    [6, "July"],
    [7, "August"],
    [8, "September"],
    [9, "October"],
    [10, "November"],
    [11, "December"],
  ]);

  const calendarStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    width: "1200px",
    height: "100%",
  };

  const calendarGridStyle = {
    display: "grid",
    backgroundColor: "black",
    border: "1px solid black",
    width: "100%",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridGap: "1px",
  };

  const calendarHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  const calendarMonthStyle = {
    width: "250px",
  };

  const calendarButtonStyle = {
    height: "40px",
    width: "60px",
    fontSize: "16px",
    cursor: "pointer",
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
  const [openModal, setOpenModal] = useState(false);
  const [eventDate, setEventDate] = useState(today);

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

  return (
    <>
      <div style={calendarStyle}>
        <div style={calendarHeaderStyle}>
          <h1 style={calendarMonthStyle}>
            {indexToMonth.get(currMonthIndex)} {currYear}
          </h1>
          <button style={calendarButtonStyle} onClick={() => handleChangeMonth("left")}>{`<`}</button>
          <button style={calendarButtonStyle} onClick={() => handleChangeMonth("right")}>{`>`}</button>
          <button style={calendarButtonStyle} onClick={() => handleChangeMonth("reset")}>
            reset
          </button>
        </div>
        <div style={calendarGridStyle}>
          {weekdayNames.map((_weekday, index) => {
            return <Weekday key={index} weekday={indexToWeekday.get(index)} />;
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
      </div>
    </>
  );
};

export default Calendar;
