import { getBookingTimeStamp } from "../checkBookingIsExpire";

const mapStartTime = (bookingData) => {
  return bookingData.map((data) => {
    const time = data.time.split("-");
    const startTime = time[0].split(":");
    const bookingStartTime = getBookingTimeStamp(data.bookingDate, startTime);
    return { ...data, bookingStartTime };
  });
};

export const sortBookingsByBookingDate = (bookingData) => {
  const mapedData = mapStartTime(bookingData);
  return mapedData.sort((firstBooking, secondBooking) =>
    firstBooking.bookingStartTime < secondBooking.bookingStartTime ? 1 : -1
  );
};
