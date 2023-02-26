import React, { useContext } from "react";
import {
  EventDayContext,
  EventListContext,
  ToggleContext,
} from "../../../context";
import { useField } from "../../../hooks";

interface Props {
  indexToMonth: Map<number, string>;
}

const EventForm = ({ indexToMonth }: Props) => {
  const { clearValue: clearEventName, ...eventName } = useField("text");
  const {
    clearValue: clearEventDescription,
    type,
    ...eventDescription
  } = useField("textarea");
  const { eventList, setEventList } = useContext(EventListContext);
  const { toggleDispatch } = useContext(ToggleContext);
  const { eventDayState } = useContext(EventDayContext);

  const generateId = () => {
    return Number((Math.random() * 10000000).toFixed(0));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const monthCalendar =
      eventDayState.eventMonth === 12 ? 1 : eventDayState.eventMonth + 1;
    const newEvent = {
      date: new Date(
        `${monthCalendar}/${eventDayState.eventDay}/${eventDayState.eventYear}`
      ),
      name: eventName.value,
      description: eventDescription.value,
      id: generateId(),
    };
    setEventList(eventList.concat([newEvent]));
    window.localStorage.setItem("eventList", JSON.stringify(eventList));
    clearEventName();
    clearEventDescription();
    toggleDispatch({ type: "closeModal" });
  };

  const style = {
    display: "grid",
    gridTemplateColumns: "40px 1fr",
    alignItems: "center",
    gap: "10px",
  };

  const inputStyle = {
    padding: "5px",
  };

  const textAreaStyle = {
    fontFamily: "Arial",
    padding: "5px",
  };

  const fullWidthStyle = {
    gridColumn: "1 / 3",
  };

  const buttonStyle = {
    padding: "5px 10px",
    borderRadius: "15px",
    borderStyle: "none",
    cursor: "pointer",
  };

  return (
    <>
      <p>Add Event?</p>
      <form style={style} onSubmit={handleFormSubmit}>
        <div>Date:</div>
        <div>
          {indexToMonth.get(eventDayState.eventMonth)} {eventDayState.eventDay},{" "}
          {eventDayState.eventYear}
        </div>
        <label>Event: </label>
        <input style={inputStyle} {...eventName} />
        <label style={fullWidthStyle}>Event Description: </label>
        <textarea
          style={{ ...fullWidthStyle, ...textAreaStyle }}
          {...eventDescription}
        />
        <button style={{ ...buttonStyle, gridColumn: "1 / 3", width: "70px" }}>
          submit
        </button>
      </form>
    </>
  );
};

export default EventForm;
