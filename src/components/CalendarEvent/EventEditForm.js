import { useContext } from "react";
import { EventIdContext, EventListContext } from "../../App";
import { useField } from "../../hooks";

const EventEditForm = ({ indexToMonth, eventDate, onClose }) => {
  let { clearValue: clearEventName, ...eventName } = useField("text");
  let { clearValue: clearEventDescription, type, ...eventDescription } = useField("textarea");
  const { eventList, setEventList } = useContext(EventListContext);
  const { eventId } = useContext(EventIdContext);
  const eventToEdit = eventList.find((e) => e.id === eventId);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedEvent = {
      ...eventToEdit,
      name: eventName.value,
      description: eventDescription.value,
    };
    setEventList(eventList.map((e) => (e.id === eventId ? updatedEvent : e)));
    window.localStorage.setItem("eventList", JSON.stringify([eventList]));
    clearEventName();
    clearEventDescription();
    onClose();
  };

  console.log(eventList);

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
      <p>Edit Event?</p>
      <form style={style} onSubmit={handleFormSubmit}>
        <div>Date:</div>
        <div>
          {indexToMonth.get(eventDate.getMonth())} {eventDate.getDate()}, {eventDate.getFullYear()}
        </div>
        <label>Event: </label>
        <input style={inputStyle} placeholder={eventToEdit.name} {...eventName} />
        <label style={fullWidthStyle}>Event Description: </label>
        <textarea style={{ ...fullWidthStyle, ...textAreaStyle }} placeholder={eventToEdit.description} {...eventDescription} />
        <button style={{ ...buttonStyle, gridColumn: "1 / 3", width: "70px" }}>submit</button>
      </form>
    </>
  );
};

export default EventEditForm;
