export const __courseMock = [
  {
    id: 'lesson_001',
    title: 'Introduction to Programming',
    content: 'This lesson introduces the basics of programming.',
    author: 'huy',
    idCourse: 'course_101',
    price: 25000,
    ordinalNumber: 1,
    isPublish: true,
    videos: [
      {
        id: 'video_001',
        title: 'Welcome to the Course',
        description: 'mock desc',
        preview: true,
        type: 'video',
        videoUrl: '/videos/course-example',
      },
      {
        id: 'video_002',
        description: 'mock desc',
        preview: true,
        type: 'video',
        title: 'Setting Up Your Environment',
        videoUrl: '/videos/course-example',
      },
    ],
  },
  {
    id: 'lesson_002',
    title: 'Variables and Data Types',
    author: 'huy',
    price: 27000,
    content:
      'This lesson covers variables and different data types in programming.',
    idCourse: 'course_101',
    ordinalNumber: 2,
    isPublish: true,
    videos: [
      {
        id: 'video_003',
        description: 'mock desc',
        preview: true,
        type: 'video',
        title: 'Introduction to Variables',
        videoUrl: '/videos/course-example',
      },
      {
        id: 'video_004',
        description: 'mock desc',
        preview: true,
        type: 'video',
        title: 'Understanding Data Types',
        videoUrl: '/videos/course-example',
      },
    ],
  },
  {
    id: 'lesson_003',
    title: 'Control Structures',
    author: 'huy',
    price: 55000,
    content:
      'This lesson explains control structures such as loops and conditionals.',
    idCourse: 'course_101',
    ordinalNumber: 3,
    isPublish: false,
    videos: [
      {
        id: 'video_005',
        title: 'If Statements',
        description: 'mock desc',
        preview: true,
        type: 'video',
        videoUrl: 'https://example.com/video_005',
      },
      {
        id: 'video_006',
        description: 'mock desc',
        preview: true,
        type: 'video',
        title: 'Loops',
        videoUrl: 'https://example.com/video_006',
      },
    ],
  },
];

export const __mockChartCompleted = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 90],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};
export const __mockChartProgress = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 25, 40],
      fill: false,
      borderColor: 'rgb(220,20,60)',
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

export const __mockChartMonth = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 25, 40],
      fill: false,
      borderColor: 'rgb(5,135,67)',
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

export const __mockChartMonthOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

export const __mockChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
};
