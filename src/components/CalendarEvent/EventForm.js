import { useField } from "../../hooks";

const EventForm = ({ indexToMonth, eventDate, onClose }) => {
  const { clearValue: clearEventName, ...eventName } = useField("text");
  const { clearValue: clearEventDescription, ...eventDescription } = useField("textarea");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(eventName.value);
    console.log(eventDescription.value);
    clearEventName();
    clearEventDescription();
    onClose();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        Date: {indexToMonth.get(eventDate.getMonth())} {eventDate.getDate()} {eventDate.getFullYear()}
      </div>
      <div>
        <label>Event: </label>
        <input {...eventName} />
      </div>
      <div>
        <label>Event Description: </label>
        <input {...eventDescription} />
      </div>
      <button>submit</button>
    </form>
  );
};

export default EventForm;
