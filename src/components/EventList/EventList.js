import { useContext } from "react";
import { EventDateContext, EventListContext, EventModalContext } from "../../App";
import { indexToMonth } from "../../utils/calendar-helper";

const EventList = () => {
  const { eventList } = useContext(EventListContext);
  const { selectedDate } = useContext(EventDateContext);
  const { setOpenModal } = useContext(EventModalContext);

  const style = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "white",
  };

  const eventBoxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "10%",
    border: "1px solid black",
    cursor: "pointer",
  };

  return (
    <div style={style}>
      <h2>
        {indexToMonth.get(selectedDate.month)} {selectedDate.day}, {selectedDate.year}
      </h2>
      {eventList.map((e) => {
        const dayEvent = new Date(e.date);
        if (dayEvent.getMonth() === selectedDate.month && dayEvent.getFullYear() === selectedDate.year && dayEvent.getDate() === selectedDate.day) {
          return (
            <button
              style={eventBoxStyle}
              key={e.id}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              {e.name}
            </button>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default EventList;
