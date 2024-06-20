import { useState } from 'react';

interface Course {
  grade: string;
  credits: number;
}

const gradePoints: { [key: string]: number } = {
  S: 10,
  A: 9,
  B: 8,
  C: 7,
  F: 0,
};

const calculateGPA = (courses: Course[]): number => {
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const totalPoints = courses.reduce((sum, course) => sum + gradePoints[course.grade] * course.credits, 0);
  return totalPoints / totalCredits;
};

const calculateCGPA = (prevCgpa: number, prevCredits: number, currentGpa: number, currentCredits: number): number => {
  const totalCredits = prevCredits + currentCredits;
  const totalPoints = (prevCgpa * prevCredits) + (currentGpa * currentCredits);
  return totalPoints / totalCredits;
};

export default function CGPA() {
  const [prevCgpa, setPrevCgpa] = useState<number>(0);
  const [prevCredits, setPrevCredits] = useState<number>(0);
  const [courses, setCourses] = useState<Course[]>([]);
  const [grade, setGrade] = useState<string>('');
  const [credits, setCredits] = useState<number>(0);
  const [cgpa, setCgpa] = useState<number | null>(null);

  const addCourse = () => {
    setCourses([...courses, { grade, credits }]);
    setGrade('');
    setCredits(0);
  };

  const calculate = () => {
    const currentGpa = calculateGPA(courses);
    const result = calculateCGPA(prevCgpa, prevCredits, currentGpa, courses.reduce((sum, course) => sum + course.credits, 0));
    setCgpa(result);
  };

  return (
    <div>
      <h1>CGPA Calculator</h1>

      <div>
        <h2>Previous CGPA</h2>
        <input
          type="number"
          value={prevCgpa}
          onChange={(e) => setPrevCgpa(parseFloat(e.target.value))}
        />
        <h2>Total Credits from Previous Semesters</h2>
        <input
          type="number"
          value={prevCredits}
          onChange={(e) => setPrevCredits(parseFloat(e.target.value))}
        />
      </div>

      <div>
        <h2>Add Current Semester Courses</h2>
        <input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value.toUpperCase())}
          placeholder="Grade (e.g., A, B, C, S)"
        />
        <input
          type="number"
          value={credits}
          onChange={(e) => setCredits(parseFloat(e.target.value))}
          placeholder="Credits"
        />
        <button onClick={addCourse}>Add Course</button>
      </div>

      <div>
        <h2>Current Courses</h2>
        <ul>
          {courses.map((course, index) => (
            <li key={index}>
              Grade: {course.grade}, Credits: {course.credits}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={calculate}>Calculate CGPA</button>

      {cgpa !== null && (
        <div>
          <h2>Your CGPA:</h2>
          <p>{cgpa.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
