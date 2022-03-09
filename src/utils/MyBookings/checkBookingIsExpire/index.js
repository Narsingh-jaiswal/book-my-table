import { getFormatedDate } from "../../getAvailableSlots";

export const getBookingTimeStamp = (bookingDate, time) => {
  const bookingDateObject = new Date(bookingDate).setMonth(
    new Date(bookingDate).getMonth() + 1
  );
  let bookingTimeStamp = new Date(bookingDateObject).setHours(time[0]);
  bookingTimeStamp = new Date(bookingTimeStamp).setMinutes(time[1]);

  return bookingTimeStamp;
};

export const checkBookingIsExpire = (bookingData) => {
  const formatedDate = getFormatedDate(new Date());

  if (formatedDate === bookingData.bookingDate) {
    const time = bookingData.time.split("-");
    const startTime = time[0].split(":");
    const endTime = time[1].split(":");
    const bookingStartTime = getBookingTimeStamp(
      bookingData.bookingDate,
      startTime
    );

    const bookingEndTime = getBookingTimeStamp(
      bookingData.bookingDate,
      endTime
    );

    const currentTime = new Date().getTime();

    if (currentTime < bookingStartTime) {
      return null;
    } else if (
      currentTime >= bookingStartTime &&
      currentTime <= bookingEndTime
    ) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
};
