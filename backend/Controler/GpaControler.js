const express = require('express')

const calculateGPA = async (req, res) => {
    try {
      // Retrieve the course data from the request body
      const { courses } = req.body;
  
      // Validate the input - ensure it's an array of courses
      if (!Array.isArray(courses)) {
        return res.status(400).json({ message: 'Invalid input. Expecting an array of courses.' });
      }
  
      // Define your GPA scale mapping for German grading
      const gpaScale = {
        'A+': 1.0,
        'A': 1.3,
        'A-': 1.7,
        'B+': 2.0,
        'B': 2.3,
        // Add more grades and their corresponding values as needed.
      };
  
      // Initialize variables for GPA calculation
      let totalWeight = 0;
      let weightedGradeSum = 0;
  
      // Iterate through the course data and calculate the weighted GPA
      for (const course of courses) {
        const { weight, grade } = course;
  
        // Check if the provided grade is in the GPA scale mapping
        if (gpaScale[grade]) {
          totalWeight += weight;
          weightedGradeSum += weight * gpaScale[grade];
        } else {
          // Handle cases where the grade is not in the GPA scale
          return res.status(400).json({ message: 'Invalid grade found in the course data.' });
        }
      }
  
      if (totalWeight === 0) {
        return res.status(400).json({ message: 'No valid courses found for GPA calculation.' });
      }
  
      // Calculate the GPA
      const gpa = weightedGradeSum / totalWeight;
  
      // Round the GPA to two decimal places
      const roundedGPA = gpa.toFixed(2);
  
      // Return the calculated GPA as a response
      res.status(200).json({ gpa: roundedGPA });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    calculateGPA,
  };
  