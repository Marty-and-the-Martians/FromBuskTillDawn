const cleanMyCal = (array) => (
  array.map((eventsArr) => {
    const result = eventsArr.attendingEvents.concat(eventsArr.hostedEvents);
    return result;
  })
);

export default cleanMyCal;
