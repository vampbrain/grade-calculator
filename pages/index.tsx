import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [marks, setMarks] = useState<string>('');
  const [grades, setGrades] = useState<string>('');
  const [result, setResult] = useState<{ mean: number; std_dev: number; grades: string[] } | null>(null);

  const handleCalculateGrades = async () => {
    const marksArray = marks.split(',').map(mark => parseFloat(mark.trim()));
    const response = await axios.post('/api/grades', { marks: marksArray });
    setResult(response.data);
  };

  return (
    <div>
      <h1>Grade and GPA Calculator</h1>
      <div>
        <h2>Calculate Grades from Marks</h2>
        <textarea
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          placeholder="Enter marks separated by commas"
        />
        <button onClick={handleCalculateGrades}>Calculate Grades</button>
        {result && (
          <div>
            <h2>Results</h2>
            <p>Mean: {result.mean}</p>
            <p>Standard Deviation: {result.std_dev}</p>
            <ul>
              {result.grades.map((grade, index) => (
                <li key={index}>Student {index + 1}: {grade}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <h2>Calculate GPA from Grades</h2>
        <textarea
          value={grades}
          onChange={(e) => setGrades(e.target.value)}
          placeholder="Enter grades separated by commas"
        />
        <Link href={{ pathname: '/gpa', query: { grades } }}>
          <button>Calculate GPA</button>
        </Link>
      </div>
      <Link href="/cgpa">Go to CGPA Calculator</Link>
    </div>
  );
}
