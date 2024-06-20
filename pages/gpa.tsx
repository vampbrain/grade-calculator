import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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

export default function GPA() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [grade, setGrade] = useState<string>('');
  const [credits, setCredits] = useState<number>(0);
  const [gpa, setGpa] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.grades) {
      const grades = (router.query.grades as string).split(',');
      const defaultCredits = 3; // assume default credits if not provided
      const courses = grades.map(grade => ({ grade, credits: defaultCredits }));
      setCourses(courses);
    }
  }, [router.query]);

  const addCourse = () => {
    setCourses([...courses, { grade, credits }]);
    setGrade('');
    setCredits(0);
  };

  const calculate = () => {
    const result = calculateGPA(courses);
    setGpa(result);
  };

  return (
    <div>
      <h1>GPA Calculator</h1>
      <div>
        <input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value.toUpperCase())}
          placeholder="Grade (e.g., A, B, C, S)"
        />
        <input
          type="number"
          value={credits}
          onChange={(e) => setCredits(parseInt(e.target.value))}
          placeholder="Credits"
        />
        <button onClick={addCourse}>Add Course</button>
      </div>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            Grade: {course.grade}, Credits: {course.credits}
          </li>
        ))}
      </ul>
      <button onClick={calculate}>Calculate GPA</button>
      {gpa !== null && <p>Your GPA: {gpa.toFixed(2)}</p>}
    </div>
  );
}
