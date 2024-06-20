import { useRouter } from 'next/router';

export default function Results() {
  const router = useRouter();
  const { mean, std_dev, grades } = router.query;

  if (!mean || !std_dev || !grades) {
    return <div>No results to display</div>;
  }

  const gradeList = Array.isArray(grades) ? grades : grades.split(',');

  return (
    <div>
      <h1>Grade Results</h1>
      <p>Mean: {mean}</p>
      <p>Standard Deviation: {std_dev}</p>
      <ul>
        {gradeList.map((grade, index) => (
          <li key={index}>Student {index + 1}: {grade}</li>
        ))}
      </ul>
    </div>
  );
}
