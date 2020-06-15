export default (timestamp: number) =>
  timestamp.toString().length === 10 ? timestamp : Math.floor(timestamp / 1000)
