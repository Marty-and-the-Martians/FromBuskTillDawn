const cleanPerformerEvents = (array) => (
  array.map((eventsArr) => {
    const result = eventsArr.hostedEvents;
    return result;
  })
);

export default cleanPerformerEvents;
