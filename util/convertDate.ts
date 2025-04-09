export const convertDate = (date: string) => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const isMorning = dateObj.getHours() >= 13 ? "오후" : "오전";
  const hour =
    dateObj.getHours() >= 13 ? dateObj.getHours() - 12 : dateObj.getHours();
  const minute = dateObj.getMinutes();
  return `${month}월 ${day}일 ${isMorning} ${hour}:${minute}`;
};
