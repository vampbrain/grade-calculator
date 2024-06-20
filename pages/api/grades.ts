import { NextApiRequest, NextApiResponse } from 'next';
import { calculateMeanAndStd, assignGrades } from '../../pages/utils/gradeUtils';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { marks } = req.body;
    const { mean, std_dev } = calculateMeanAndStd(marks);
    const grades = assignGrades(marks, mean, std_dev);
    res.status(200).json({ mean, std_dev, grades });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
