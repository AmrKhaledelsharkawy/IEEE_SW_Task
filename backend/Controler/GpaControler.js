const express = require('express');

const calculateGPA = async (req, res) => {
    try {
        const { courses } = req.body;

        if (!Array.isArray(courses)) {
            return res.status(400).json({ message: 'Invalid input data. Please provide an array of courses.' });
        }

        const gpaScale = {
            'A+': 0.7,
            'A': 1,
            'A-': 1.3,
            'B+': 1.7,
            'B': 2.0,
            'B-': 2.3,
            'C+': 2.7,
            'C': 3.0,
            'C-': 3.3,
            'D+': 3.7,
            'D': 4,
            'F': 5
            // Add more grades and their corresponding values as needed.
        };

        let totalWeight = 0;
        let weightedGradeSum = 0;

        for (const course of courses) {
            const { weight, grade } = course;

            if (gpaScale[grade]) {
                totalWeight += weight;
                weightedGradeSum += weight * gpaScale[grade];
            } else {
                return res.status(400).json({ message: 'Invalid grade found in the course data. Please provide valid grades.' });
            }
        }

        if (totalWeight === 0) {
            return res.status(400).json({ message: 'No valid courses found for GPA calculation.' });
        }

        const gpa = weightedGradeSum / totalWeight;
        const roundedGPA = gpa.toFixed(2);

        res.status(200).json({ gpa: roundedGPA });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An internal server error occurred. Please try again later.' });
    }
};

module.exports = {
    calculateGPA,
};
