export const GOALS = [
  {
    id: 'ai', name: 'AI / Data Science', icon: '🤖',
    blurb: 'Turn data into insight and build intelligent systems.',
    skills: ['Python', 'Statistics', 'Pandas & NumPy', 'Data Visualization', 'Machine Learning', 'SQL'],
    roadmap: [
      { t: 'Learn Python basics', d: 'Variables, loops, functions and data structures.' },
      { t: 'Math & statistics', d: 'Probability, averages, distributions and basic linear algebra.' },
      { t: 'Data analysis', d: 'Clean and explore datasets with Pandas, NumPy and charts.' },
      { t: 'Machine learning', d: 'Train and evaluate your first models with scikit-learn.' },
      { t: 'Build a portfolio project', d: 'Publish 2 small projects on GitHub or Kaggle.' },
    ],
  },
  {
    id: 'web', name: 'Web Development', icon: '🌐',
    blurb: 'Design and build modern websites and web apps.',
    skills: ['HTML & CSS', 'JavaScript', 'React', 'Git & GitHub', 'Responsive Design', 'APIs'],
    roadmap: [
      { t: 'HTML & CSS', d: 'Structure pages and style them responsively.' },
      { t: 'JavaScript fundamentals', d: 'DOM, events, arrays, functions and async code.' },
      { t: 'Learn React', d: 'Components, props, state and hooks.' },
      { t: 'Git & GitHub', d: 'Version control and collaborating on code.' },
      { t: 'Deploy a real project', d: 'Build a portfolio site or app and host it online.' },
    ],
  },
  {
    id: 'it', name: 'Programming / IT', icon: '💻',
    blurb: 'Build strong core programming and computer science foundations.',
    skills: ['C / Java / Python', 'Data Structures', 'Algorithms', 'SQL & Databases', 'Git', 'Problem Solving'],
    roadmap: [
      { t: 'Pick one language', d: 'Get comfortable with Python, Java or C++.' },
      { t: 'Data structures', d: 'Arrays, linked lists, stacks, queues, trees and hashing.' },
      { t: 'Algorithms', d: 'Sorting, searching, recursion and complexity.' },
      { t: 'Databases & SQL', d: 'Design tables and write queries.' },
      { t: 'Practice & projects', d: 'Solve problems regularly and build small tools.' },
    ],
  },
  {
    id: 'biz', name: 'Business / Entrepreneurship', icon: '🚀',
    blurb: 'Learn to build ventures, market ideas and lead teams.',
    skills: ['Communication', 'Marketing Basics', 'Business Models', 'Finance Basics', 'Leadership', 'Excel'],
    roadmap: [
      { t: 'Business fundamentals', d: 'Understand customers, value and business models.' },
      { t: 'Communication & pitching', d: 'Write clearly and present ideas confidently.' },
      { t: 'Marketing basics', d: 'Positioning, digital marketing and analytics.' },
      { t: 'Finance & Excel', d: 'Budgets, pricing, break-even and spreadsheets.' },
      { t: 'Launch a mini venture', d: 'Validate an idea with real feedback.' },
    ],
  },
]

export const RESOURCES = [
  { id: 1, goal: 'ai', level: 'Beginner', title: 'Kaggle Learn: Python', desc: 'Short, hands-on Python lessons with exercises.', url: 'https://www.kaggle.com/learn/python', by: 'Kaggle' },
  { id: 2, goal: 'ai', level: 'Beginner', title: 'Kaggle Learn: Pandas', desc: 'Learn to clean and analyse data using Pandas.', url: 'https://www.kaggle.com/learn/pandas', by: 'Kaggle' },
  { id: 3, goal: 'ai', level: 'Intermediate', title: 'Machine Learning Crash Course', desc: 'Google’s practical introduction to machine learning.', url: 'https://developers.google.com/machine-learning/crash-course', by: 'Google' },
  { id: 4, goal: 'ai', level: 'Intermediate', title: 'Practical Deep Learning for Coders', desc: 'Free course to build deep learning models quickly.', url: 'https://course.fast.ai', by: 'fast.ai' },
  { id: 5, goal: 'web', level: 'Beginner', title: 'MDN: Learn Web Development', desc: 'Trusted guides for HTML, CSS and JavaScript.', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development', by: 'Mozilla' },
  { id: 6, goal: 'web', level: 'Beginner', title: 'freeCodeCamp Web Curriculum', desc: 'Free interactive lessons and projects with certifications.', url: 'https://www.freecodecamp.org', by: 'freeCodeCamp' },
  { id: 7, goal: 'web', level: 'Intermediate', title: 'Learn React', desc: 'The official React documentation and tutorials.', url: 'https://react.dev/learn', by: 'React Team' },
  { id: 8, goal: 'web', level: 'Intermediate', title: 'The Odin Project', desc: 'Full-stack web development path with real projects.', url: 'https://www.theodinproject.com', by: 'The Odin Project' },
  { id: 9, goal: 'it', level: 'Beginner', title: 'CS50: Intro to Computer Science', desc: 'Harvard’s famous free introduction to programming.', url: 'https://cs50.harvard.edu/x/', by: 'Harvard' },
  { id: 10, goal: 'it', level: 'Beginner', title: 'The Python Tutorial', desc: 'Official, beginner-friendly Python tutorial.', url: 'https://docs.python.org/3/tutorial/', by: 'Python.org' },
  { id: 11, goal: 'it', level: 'Beginner', title: 'SQLBolt', desc: 'Interactive lessons to learn SQL step by step.', url: 'https://sqlbolt.com', by: 'SQLBolt' },
  { id: 12, goal: 'it', level: 'Intermediate', title: 'NPTEL Courses', desc: 'Free IIT / IISc courses on programming and CS topics.', url: 'https://nptel.ac.in', by: 'NPTEL' },
  { id: 13, goal: 'it', level: 'Beginner', title: 'Pro Git Book', desc: 'Free book to master Git and version control.', url: 'https://git-scm.com/book/en/v2', by: 'Git' },
  { id: 14, goal: 'biz', level: 'Beginner', title: 'Startup School', desc: 'Free startup curriculum from Y Combinator.', url: 'https://www.startupschool.org', by: 'Y Combinator' },
  { id: 15, goal: 'biz', level: 'Beginner', title: 'HubSpot Academy', desc: 'Free courses on marketing, sales and business.', url: 'https://academy.hubspot.com', by: 'HubSpot' },
  { id: 16, goal: 'biz', level: 'Beginner', title: 'SWAYAM Courses', desc: 'Free Government of India portal with management courses.', url: 'https://swayam.gov.in', by: 'SWAYAM' },
]

export const JOBS = [
  { id: 1, role: 'Data Analyst Intern', company: 'Example Analytics Co.', location: 'Hyderabad', type: 'Internship', goal: 'ai', skills: ['Python', 'SQL', 'Excel'], elig: 'B.Tech / B.Sc, 2nd year and above' },
  { id: 2, role: 'Machine Learning Intern', company: 'Demo AI Labs', location: 'Remote', type: 'Internship', goal: 'ai', skills: ['Python', 'Machine Learning', 'Statistics'], elig: 'CS / IT students, 3rd year and above' },
  { id: 3, role: 'Junior Data Scientist', company: 'Sample DataWorks', location: 'Bengaluru', type: 'Job', goal: 'ai', skills: ['Python', 'Pandas', 'Statistics'], elig: 'Graduates with 0–1 year experience' },
  { id: 4, role: 'Frontend Developer Intern', company: 'Sample Web Studio', location: 'Remote', type: 'Internship', goal: 'web', skills: ['HTML & CSS', 'JavaScript', 'React'], elig: 'Any degree, 2nd year and above' },
  { id: 5, role: 'Junior Web Developer', company: 'Demo Digital Pvt Ltd', location: 'Hyderabad', type: 'Job', goal: 'web', skills: ['JavaScript', 'React', 'Git & GitHub'], elig: 'Final-year students and graduates' },
  { id: 6, role: 'Software Engineer Trainee', company: 'Example Tech Solutions', location: 'Chennai', type: 'Job', goal: 'it', skills: ['Java', 'Data Structures', 'SQL'], elig: 'B.E / B.Tech, 2025–2026 batch' },
  { id: 7, role: 'Backend Developer Intern', company: 'Demo Cloud Systems', location: 'Remote', type: 'Internship', goal: 'it', skills: ['Python', 'SQL', 'APIs'], elig: 'CS / IT students, 3rd year' },
  { id: 8, role: 'Business Development Intern', company: 'Sample Ventures', location: 'Mumbai', type: 'Internship', goal: 'biz', skills: ['Communication', 'Excel', 'Marketing Basics'], elig: 'BBA / MBA / any degree' },
  { id: 9, role: 'Marketing Associate', company: 'Example Growth Co.', location: 'Bengaluru', type: 'Job', goal: 'biz', skills: ['Marketing Basics', 'Communication', 'Analytics'], elig: 'Graduates, freshers welcome' },
  { id: 10, role: 'Startup Operations Intern', company: 'Demo Startup Hub', location: 'Hyderabad', type: 'Internship', goal: 'biz', skills: ['Leadership', 'Excel', 'Communication'], elig: 'Any degree, 2nd year and above' },
]

export const QUIZ = [
  { topic: 'it', q: 'Which data structure works on the Last-In-First-Out (LIFO) principle?', o: ['Queue', 'Stack', 'Array', 'Linked list'], a: 1 },
  { topic: 'it', q: 'What does SQL stand for?', o: ['Structured Query Language', 'Simple Question Logic', 'Sequential Query List', 'Standard Quick Language'], a: 0 },
  { topic: 'web', q: 'Which HTML tag is used to create a hyperlink?', o: ['<link>', '<a>', '<href>', '<url>'], a: 1 },
  { topic: 'web', q: 'In React, which hook is used to store changing values inside a component?', o: ['useEffect', 'useRef', 'useState', 'useMemo'], a: 2 },
  { topic: 'ai', q: 'Which Python library is mainly used for data tables and analysis?', o: ['Pandas', 'Flask', 'Pygame', 'Tkinter'], a: 0 },
  { topic: 'ai', q: 'What is the middle value of a sorted dataset called?', o: ['Mean', 'Mode', 'Median', 'Range'], a: 2 },
  { topic: 'biz', q: 'What does a "target audience" mean in marketing?', o: ['Your competitors', 'The group of people most likely to need your product', 'Your investors', 'Your employees'], a: 1 },
  { topic: 'biz', q: 'Profit is calculated as:', o: ['Revenue − Costs', 'Revenue + Costs', 'Costs − Revenue', 'Revenue × Costs'], a: 0 },
]
