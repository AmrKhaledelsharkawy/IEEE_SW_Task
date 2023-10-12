import React, { useState } from 'react';
import '../CSS/GPAfront.css'

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

  const removeCourse = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
    calculateGPA(updatedCourses); // Recalculate GPA after removing the course
  };

  const calculateGPA = async (updatedCourses) => {
    try {
      const data = { courses: updatedCourses };

      const response = await fetch('/calculateGPA/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      const { gpa } = responseData;
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
          <div key={index} className='C'>
            Course {index + 1}: {course.weight} hours, Grade: {course.grade}
            <button onClick={() => removeCourse(index)}>Delete Course</button>
          </div>
        ))}
      </div>
      <button onClick={() => calculateGPA(courses)}>Calculate GPA</button>
      {gpa !== null && <div className='GPA'>GPA: {gpa}</div>}
    </div>
  );
}

export default GPACalculator;
