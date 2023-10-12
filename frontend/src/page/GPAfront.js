import React, { useState } from 'react';
import axios from 'axios';

function GPACalculator() {
  const [courses, setCourses] = useState([]);
  const [courseHours, setCourseHours] = useState('');
  const [courseGrade, setCourseGrade] = useState('');
  const [gpa, setGPA] = useState(null);

  const addCourse = () => {
    if (courseHours && courseGrade) {
      const newCourse = { weight: parseInt(courseHours), grade: courseGrade };
      setCourses([...courses, newCourse]);
      setCourseHours('');
      setCourseGrade('');
    }
  };

  const calculateGPA = async () => {
    try {
        console.log(courses[0])
      const response = await axios.post('/api/gpa/calculateGPA',  courses[0] );
      const { gpa } = response.data;
      console.log(gpa)
      setGPA(gpa);
    } catch (error) {
      console.error('Error calculating GPA:', error);
    }
  };

  return (
    <div>
      <h1>GPA Calculator</h1>
      <div>
        <input
          type="text"
          placeholder="Course Hours"
          value={courseHours}
          onChange={(e) => setCourseHours(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course Grade"
          value={courseGrade}
          onChange={(e) => setCourseGrade(e.target.value)}
        />
        <button onClick={addCourse}>Add Course</button>
      </div>
      <div>
        {courses.map((course, index) => (
          <div key={index}>
            Course {index + 1}: {course.weight} hours, Grade: {course.grade}
          </div>
        ))}
      </div>
      <button onClick={calculateGPA}>Calculate GPA</button>
      {gpa !== null && <div>GPA: {gpa}</div>}
    </div>
  );
}

export default GPACalculator;
