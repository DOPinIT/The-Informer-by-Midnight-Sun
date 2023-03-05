/* Create timestamp for search request by date - 2020-02-01 - YYYY-MM-DD - symbol = '-'
 Data for card symbol = '/'
 */

export default class DateTimestamp {
  static createTimestamp(milliseconds, symbol) {
    const date = new Date(milliseconds);
    const year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();

    if (month < 10) {
      month = month.toString().padStart(2, '0');
    }
    if (day < 10) {
      day = day.toString().padStart(2, '0');
    }
    return `${year}${symbol}${month}${symbol}${day}`;
  }
}
