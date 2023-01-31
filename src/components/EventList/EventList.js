import { EventDateContext } from "../../App";
import { indexToMonth } from "../../utils/calendar-helper";

const EventList = () => {
  const style = {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
  };
  return (
    <div style={style}>
      <EventDateContext.Consumer>
        {({ selectedDate }) => (
          <h2>
            {indexToMonth.get(selectedDate.month)} {selectedDate.day}, {selectedDate.year}
          </h2>
        )}
      </EventDateContext.Consumer>
    </div>
  );
};

export default EventList;
