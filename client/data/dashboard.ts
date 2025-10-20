const dashboardData = {
  summary: { students: 356, feeding_days: 18, alerts: 7, attendance: 92 },
  attendanceData: [
    { day: 1, feeding: 320, attendance: 340 },
    { day: 2, feeding: 330, attendance: 350 },
    { day: 3, feeding: 0, attendance: 260 },
    { day: 4, feeding: 340, attendance: 355 },
    { day: 5, feeding: 315, attendance: 338 },
    { day: 6, feeding: 0, attendance: 255 },
    { day: 7, feeding: 335, attendance: 352 },
    { day: 8, feeding: 340, attendance: 358 }
  ],
  nutritionTrends: [
    { month: "July", avgBMI: 17.8 },
    { month: "August", avgBMI: 18.1 },
    { month: "September", avgBMI: 17.5 },
    { month: "October", avgBMI: 17.9 }
  ],
  flaggedStudents: [
    { name: "Uwimana Aline", age: 9, bmi: 14.2, status: "Underweight", last_check: "2025-10-15" },
    { name: "Mugisha Eric", age: 11, bmi: 13.8, status: "Malnourished", last_check: "2025-10-12" },
    { name: "Iradukunda Diane", age: 10, bmi: 15.1, status: "Normal", last_check: "2025-10-18" }
  ]
} as const;

export default dashboardData;
