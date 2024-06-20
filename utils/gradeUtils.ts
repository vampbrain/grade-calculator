export function calculateMeanAndStd(marks: number[]): { mean: number; std_dev: number } {
    const mean = marks.reduce((a, b) => a + b, 0) / marks.length;
    const std_dev = Math.sqrt(marks.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / marks.length);
    return { mean, std_dev };
  }
  
  export function assignGrades(marks: number[], mean: number, std_dev: number): string[] {
    return marks.map(mark => {
      if (mark > mean + 1.5 * std_dev) return 'S';
      if (mark > mean + 0.5 * std_dev) return 'A';
      if (mark > mean - 0.5 * std_dev) return 'B';
      if (mark > mean - 1.5 * std_dev) return 'C';
      return 'F';
    });
  }
  