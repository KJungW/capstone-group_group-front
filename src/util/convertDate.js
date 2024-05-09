
  // 작성일자 데이터를 적절히 변형하는 메서드
  const convertDate = (date) => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const isToday = targetDate.getDate() === currentDate.getDate() &&
                    targetDate.getMonth() === currentDate.getMonth() &&
                    targetDate.getFullYear() === currentDate.getFullYear();
    return isToday
    ? `${String(targetDate.getHours()).padStart(2, "0")}:${String(targetDate.getMinutes()).padStart(2, "0")}` 
    : `${targetDate.getFullYear()}-${String(targetDate.getMonth()+1).padStart(2, "0")}-${String(targetDate.getDate()).padStart(2, "0")}`;
  }

  export default convertDate;