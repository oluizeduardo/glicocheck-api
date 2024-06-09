class GlycemiaStatistics {
  constructor(readings) {
    this.readings = readings;
  }

  // Calculate average
  getAverage() {
    const total = this.readings.reduce((acc, value) => acc + value, 0);
    return total / this.readings.length;
  }

  // Calculate minimum value
  getMin() {
    return Math.min(...this.readings);
  }

  // Calculate maximum value
  getMax() {
    return Math.max(...this.readings);
  }

  // Calculate standard deviation
  getStandardDeviation() {
    const average = this.getAverage();
    const variance =
      this.readings.reduce(
        (acc, value) => acc + Math.pow(value - average, 2),
        0
      ) / this.readings.length;
    return Math.round(Math.sqrt(variance) * 100) / 100;
  }

  // Count of readings
  getCount() {
    return this.readings.length;
  }

  // High reading counts
  getHighReadingCount(threshold) {
    return this.readings.filter((r) => r > threshold).length;
  }

  // Low reading counts
  getLowReadingCount(threshold) {
    return this.readings.filter((r) => r < threshold).length;
  }

  // Get all statistics as a JSON object
  getAllStatistics() {
    const count = this.getCount();
    const average = this.getAverage();
    const min = this.getMin();
    const max = this.getMax();
    const standard_deviation = this.getStandardDeviation();
    const high_reading_count = this.getHighReadingCount(160);
    const low_reading_count = this.getLowReadingCount(60);

    return {
      count,
      average,
      min,
      max,
      standard_deviation,
      high_reading_count,
      low_reading_count,
    };
  }
}

export default GlycemiaStatistics;
