// Everything editable lives here. Empty values show as disabled or placeholder in the UI.
export const profile = {
  name: 'Bhavesh Joshi',
  location: 'Gujarat, India',
  availability: 'Open to internship and placement opportunities', // edit or clear
  email: 'joshibhavesh1002@gmail.com',
  linkedin: 'https://www.linkedin.com/in/joshi-bhavesh-310699345',     // full profile URL
  githubUser: 'joshibhavesh1002-art',   // e.g. 'octocat': enables repositories + contribution graph
  resume: '/Bhavesh_Joshi_Resume.pdf',       // e.g. '/resume.pdf' (file in /public)
  photo: '/profile.webp',        // e.g. '/me.jpg' (file in /public)
  formEndpoint: '', // Formspree / Web3Forms URL. Empty = the form opens your email app
}

// Edit these so they sound like you.
export const story = [
  'I am Bhavesh, an Information Technology engineering student from Gujarat who loves turning ideas into things people can actually use. To me, a good website is more than clean code: it is clear structure, thoughtful design and the small details that make it a pleasure to use. That is what I aim for in every project, from a restaurant website built during my internship to an AI startup planner concept.',
  'My degree gave me the foundations; building gave me direction. A key early step was a 15-day web development internship at Techomax Solution in Bharuch, where I built the Food Hunter restaurant website. Since then I have taken on bigger ideas: a streaming platform, a travel planner and an AI-powered startup planner.',
  'Right now I am exploring where web development meets artificial intelligence, learning Python and FastAPI for backends, Three.js for creative interfaces and advanced React for structure. The goal is simple: grow into a strong software engineer who builds products that solve real problems.',
]
export const about = {
  statement: 'I believe great software is not only about writing code. It is about understanding problems, thinking creatively and building experiences that make a difference.',
  education: { degree: 'B.E. in Information Technology', college: 'UPL University of Sustainable Technology, Bharuch', year: '', cgpa: '' }, // fill the blanks to show them
  interests: ['Artificial Intelligence', 'Full-Stack Development', 'Creative Coding', 'UI/UX Design', 'Interactive Web Experiences'],
  philosophy: 'Understand the problem first, then design it, then code it.',
  values: ['Curiosity', 'Clarity', 'Craft'],
  goal: 'Become a strong software engineer and build innovative products that solve real-world problems.',
}

export const journey = [
  { type: 'Education', title: 'B.E. Information Technology', date: '', desc: 'Engineering degree in Information Technology, the base for everything below.', tech: [], learn: 'Foundations in programming, databases and web technologies.' },
  { type: 'Internship', title: 'Web Development Internship, Techomax Solution, Bharuch', date: 'Jul 2024, 15 days', desc: 'Worked as an Intern Web Developer using HTML, CSS and JavaScript.', tech: ['HTML', 'CSS', 'JavaScript'], learn: 'Practical experience in frontend development and website design.' },
  { type: 'Project', title: 'Food Hunter, Restaurant Website', date: '', desc: 'A restaurant website developed during the internship.', tech: ['HTML', 'CSS', 'JavaScript'], learn: 'Building a complete restaurant website with HTML, CSS and JavaScript.' },
  { type: 'Project', title: 'Smart Travel Planner, Travel Management Platform', date: '', desc: 'A travel planning and booking platform concept with an administrator dashboard.', tech: ['PHP', 'MySQL', 'JavaScript'], learn: 'Connecting a PHP and MySQL backend to a JavaScript frontend.' },
  { type: 'Project', title: 'StreamX, OTT Platform', date: '', desc: 'A streaming platform concept built around discovery and interactive browsing.', tech: ['HTML', 'CSS', 'JavaScript'], learn: 'Designing a content-discovery interface: search, categories, trending and a hero slider.' },
  { type: 'Project', title: 'LaunchLens AI, AI Startup Planning Platform', date: '', desc: 'An AI-powered startup planning platform concept.', tech: ['React', 'Tailwind CSS', 'Vite'], learn: 'Structuring a planning product with React, Tailwind CSS and Vite.' },
  { type: 'Course', title: 'STTP: Master AI - Prompt Engineering', date: 'Jul 2026', desc: 'A one-week Short-Term Training Program on prompt engineering, organized by the Department of Computer Engineering at UPL University.', tech: ['Prompt Engineering', 'AI'], learn: 'The basics of writing clear prompts for AI tools.' },
  { type: 'Hackathon', title: 'National Innovation Hackathon 2026', date: 'Jul 2026', desc: 'A three-day national hackathon organized by AMIEE and CMAOI Association with Heritage Institute of Technology, Kolkata.', tech: [], learn: 'Building ideas under a three-day deadline.' },
]

// [name, how I use it]. No proficiency percentages on purpose.
export const skills = [
  { group: 'Frontend', items: [['HTML', 'Structure and semantics for every project'], ['CSS', 'Layouts, responsive styling and transitions'], ['JavaScript', 'Interactivity: sliders, search and popups'], ['React', 'Component-based interfaces, as in LaunchLens AI'], ['Tailwind CSS', 'Utility-first styling']] },
  { group: 'Backend', items: [['PHP', 'Server logic in Smart Travel Planner'], ['Python', 'The language I am growing into for backend and AI'], ['FastAPI', 'Building APIs with Python (learning)']] },
  { group: 'Database', items: [['MySQL', 'Relational data such as bookings and itineraries'], ['phpMyAdmin', 'Managing and inspecting MySQL databases']] },
  { group: 'Tools', items: [['VS Code', 'Daily editor'], ['Git', 'Version control'], ['GitHub', 'Hosting code'], ['Vite', 'Dev server and builds for React']] },
  { group: 'Creative', items: [['Three.js', '3D web graphics (exploring)'], ['Chart.js', 'Charts and data visualisation']] },
]

// image: '/projects/x.png' (file in public/projects). live/github: real URLs only. challenges: [['Challenge', 'Solution']]. year: optional, e.g. '2025'; fill all four to space the Activity timeline by real year gaps
export const projects = [
  { title: 'LaunchLens AI', year: '', cats: ['AI', 'Frontend'], status: 'Concept', tech: ['React', 'Tailwind CSS', 'Vite', 'JavaScript'],
    desc: 'An AI-powered startup planning platform that helps transform business ideas into structured startup plans.',
    features: ['Business plan generation', 'Market analysis', 'Financial projections', 'SWOT analysis', 'Target audience insights', 'Launch roadmaps'],
    problem: 'Turning a rough business idea into a structured startup plan is slow and unclear for first-time founders.',
    approach: 'A React, Tailwind CSS and Vite interface that walks an idea through planning stages, from plan and market to finance, SWOT and roadmap.',
    contribution: 'Product concept, interface design and frontend development.', challenges: [], image: '/projects/launchlens.webp', live: '', github: '' },
  { title: 'StreamX', year: '', cats: ['Frontend'], status: 'Concept', tech: ['HTML', 'CSS', 'JavaScript'],
    desc: 'A modern OTT platform interface inspired by contemporary streaming experiences, featuring movie discovery, categories and interactive browsing.',
    features: ['Movie cards', 'Search', 'Categories', 'Trending content', 'Interactive popups', 'Cinematic hero slider'],
    problem: 'Streaming interfaces have to make discovery fast and visually engaging.',
    approach: 'Card-based browsing with search, categories, trending rows, popups and a cinematic hero slider in plain HTML, CSS and JavaScript.',
    contribution: 'Interface design and frontend development.', challenges: [], image: '/projects/streamx.webp', live: '', github: '' },
  { title: 'Smart Travel Planner', year: '', cats: ['Full-Stack'], status: 'Concept', tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    desc: 'A travel planning and booking platform designed to simplify trip organization, destination discovery and booking management.',
    features: ['Explore destinations', 'Organize itineraries', 'Manage bookings', 'Trip information', 'Administrator dashboard'],
    problem: 'Planning a trip means juggling destinations, itineraries and bookings in different places.',
    approach: 'A PHP and MySQL application with a JavaScript frontend covering discovery, itineraries, bookings and an admin dashboard.',
    contribution: 'Frontend, backend and database development.', challenges: [], image: '/projects/smart-travel.webp', live: '', github: '' },
  { title: 'Food Hunter', year: '', cats: ['Frontend'], status: 'Internship project', tech: ['HTML', 'CSS', 'JavaScript'],
    desc: 'A restaurant website developed during my web development internship at Techomax Solution.',
    features: [],
    problem: 'Give a restaurant a clear, attractive presence on the web.',
    approach: 'HTML, CSS and JavaScript pages built and styled over the 15-day internship.',
    contribution: 'Frontend development and website design as Intern Web Developer.', challenges: [], image: '/projects/foodhunter.webp', live: '', github: '' },
]

// [topic, note]
export const exploring = [
  ['Artificial Intelligence', 'Building AI-powered applications. LaunchLens AI is my first concept here.'],
  ['Advanced React', 'Structuring larger interfaces with reusable components.'],
  ['Python', 'Moving deeper into backend and AI work.'],
  ['FastAPI', 'Designing fast, well-structured APIs.'],
  ['Three.js', 'Creative, interactive 3D on the web.'],
  ['Backend Architecture', 'How services, databases and APIs fit together.'],
  ['Modern Web Development', 'Tooling, performance and accessibility.'],
]

// Engineering process: [step, description]. Edit freely.
export const steps = [
  ['Understand', 'Start with the problem and the person who will use the product.'],
  ['Design', 'Shape the structure, typography and interaction before writing code.'],
  ['Build', 'Write clean, reusable components that stay readable as they grow.'],
  ['Refine', 'Test, polish the small details and learn from whatever breaks.'],
]

// Certificates (hackathons, courses, internship). One object per certificate; while the list is empty the whole section stays hidden.
// type: groups the filter tabs, e.g. 'Hackathon', 'Course', 'Internship'.  image: '/certificates/name.webp' (file in public/certificates).
// pdf: optional '/certificates/name.pdf'.  verify: optional link to the online credential.  skills: optional short list.
export const certificates = [
  // { title: 'Name on the certificate', issuer: 'Who issued it', type: 'Course', date: 'Oct 2026', note: 'One or two lines: what it covered or what you built.', skills: ['React'], image: '/certificates/example.webp', pdf: '', verify: '' },
  { title: 'Master AI - Prompt Engineering', issuer: 'UPL University of Sustainable Technology', type: 'Course', date: 'Jul 2026', note: 'Short-Term Training Program (STTP) run by the Department of Computer Engineering, 14–20 July 2026.', skills: ['Prompt Engineering', 'AI'], image: '/certificates/sttp-prompt-engineering.webp' },
  { title: 'National Innovation Hackathon 2026', issuer: 'AMIEE Association & CMAOI Association', type: 'Hackathon', date: 'Jul 2026', note: 'Took part in the 17–19 July 2026 national hackathon, held with Heritage Institute of Technology, Kolkata. Certificate ID AMH202600494-M562.', image: '/certificates/national-innovation-hackathon-2026.webp' },
  { title: 'Web Developer Intern', issuer: 'Techomax Solution', type: 'Internship', date: 'Jul 2024', note: 'Web developer intern at Techomax Solution, Bharuch, 9–29 July 2024. The company letter rates the performance as good and satisfactory to management.', skills: ['Web Development'], image: '/certificates/techomax-internship.webp' },
  // To show the certificate picture for this one, add image: '/certificates/mamo-technolabs.webp' (file in public/certificates).
  
  { title: 'Front End Development - HTML', issuer: 'Great Learning Academy', type: 'Course', date: 'Oct 2023', skills: ['HTML'], image: '/certificates/great-learning-html.webp' },
  { title: 'Introduction to HTML', issuer: 'Sololearn', type: 'Course', date: 'Oct 2023', skills: ['HTML'], image: '/certificates/sololearn-html.webp' },
  { title: 'Certified HTML Developer', issuer: 'W3Schools', type: 'Course', date: 'Sep 2023', skills: ['HTML5'], image: '/certificates/w3schools-html.webp', verify: 'https://verify.w3schools.com/1MKZYDPM9B' },
]
