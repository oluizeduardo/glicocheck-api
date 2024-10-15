export default class DateTimeUtil {
  /**
   * Returns a string with a formatted current date and time.
   * @return {string} with the current date and time.
   */
  static getCurrentDateTime = () => {   
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(6, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  };
  /**
   * This function calculates if has passed 60 minutes (1 hour)
   * from the initial datetime.
   * @param {Date} initialDateTime the initial date object.
   * @return {boolean} True if has passed 60 minutes from the initial date.
   * Returns false otherwise.
   */
  static isPassedOneHour = (initialDateTime) => {
    const initialTime = new Date(initialDateTime).getTime();
    const now = new Date().getTime();
    const seconds = (now - initialTime) / 1000;
    const diffMinutes = Math.round(seconds / 60);
    return diffMinutes > 60;
  };
}
