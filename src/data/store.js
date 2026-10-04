// Lightweight localStorage-backed data store with seed data.
// No backend — all data persists in the browser.

const KEY = "action_db_v1";

const SEED = {
  settings: {
    siteName: "Climate Action",
    tagline: "A unified citizen climate-action platform",
    primaryColor: "#16a34a",
    secondaryColor: "#0d9488",
    heroTitle: "Take Climate Action Today",
    heroDescription: "Report environmental issues, learn about climate change, and join community activities.",
    footerText: "Climate Action Citizen Portal",
    contactEmail: "info@climateaction.gov.ph",
    aboutText: "The Climate Action Citizen Portal is a unified platform combining environmental reporting, climate awareness, verified information, community participation, climate activities, GIS visualization, public advisories, and administrative data management.",
  },

  currentUser: {
    id: "u001",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "+63 917 123 4567",
    barangay: "Barangay San Isidro",
    address: "123 Rizal St, Quezon City",
    kycStatus: "verified",
    points: 480,
    badges: ["First Report", "Quiz Beginner", "Tree Planter"],
    level: "Climate Advocate",
    registrationDate: "2026-01-15",
    lastLogin: "2026-10-04",
    avatar: null,
  },

  reports: [
    {
      id: "CAR-2026-0001",
      category: "Flooding",
      icon: "🌊",
      location: "Barangay San Isidro, Quezon City",
      lat: 14.676, lng: 121.043,
      description: "Knee-deep flooding along Rizal Street after heavy rainfall. Drainage appears clogged.",
      severity: "High",
      status: "Investigation",
      photo: null,
      userId: "u001",
      date: "2026-10-02",
      timeline: [
        { status: "Submitted", date: "2026-10-02" },
        { status: "Verified", date: "2026-10-02" },
        { status: "Assigned", date: "2026-10-03" },
        { status: "Investigation", date: "2026-10-03" },
      ],
    },
    {
      id: "CAR-2026-0002",
      category: "Waste Disposal",
      icon: "🗑",
      location: "Barangay Holy Spirit",
      lat: 14.702, lng: 121.066,
      description: "Large pile of uncollected garbage near the public market.",
      severity: "Medium",
      status: "Resolved",
      photo: null,
      userId: "u001",
      date: "2026-09-20",
      timeline: [
        { status: "Submitted", date: "2026-09-20" },
        { status: "Verified", date: "2026-09-21" },
        { status: "Assigned", date: "2026-09-22" },
        { status: "Investigation", date: "2026-09-23" },
        { status: "Resolved", date: "2026-09-28" },
      ],
    },
    {
      id: "CAR-2026-0003",
      category: "Open Burning",
      icon: "🔥",
      location: "Barangay Commonwealth",
      lat: 14.688, lng: 121.091,
      description: "Residents burning waste in an open lot, causing heavy smoke.",
      severity: "Medium",
      status: "Pending",
      photo: null,
      userId: "u001",
      date: "2026-10-04",
      timeline: [
        { status: "Submitted", date: "2026-10-04" },
      ],
    },
  ],

  news: [
    { id: "n1", title: "PAGASA Issues Typhoon Warning for Northern Luzon", category: "Weather Updates", image: null, date: "2026-10-04", excerpt: "Tropical storm intensifies as it approaches the Ilocos region.", content: "Full article content here.", status: "Published" },
    { id: "n2", title: "Quezon City Launches Citywide Tree Planting Drive", category: "Sustainability Initiatives", image: null, date: "2026-10-02", excerpt: "10,000 seedlings to be planted across 12 barangays this October.", content: "Full article content here.", status: "Published" },
    { id: "n3", title: "New Waste Segregation Ordinance Takes Effect", category: "Government Announcements", image: null, date: "2026-09-28", excerpt: "Barangays required to implement segregated collection starting October.", content: "Full article content here.", status: "Published" },
    { id: "n4", title: "Community Cleanup Removes 500kg of Plastic from River", category: "Success Stories", image: null, date: "2026-09-25", excerpt: "Volunteers from 5 barangays joined the Marikina River cleanup.", content: "Full article content here.", status: "Draft" },
  ],

  activities: [
    { id: "a1", title: "Tree Planting Drive — Barangay San Isidro", type: "Tree Planting", date: "2026-10-12", location: "San Isidro Park", description: "Join us in planting 500 native tree seedlings.", registered: 34, capacity: 50, status: "Upcoming" },
    { id: "a2", title: "Coastal Cleanup — Manila Bay", type: "Coastal Cleanup", date: "2026-10-15", location: "Manila Baywalk", description: "Help remove plastic waste from our coastline.", registered: 78, capacity: 100, status: "Upcoming" },
    { id: "a3", title: "Recycling Workshop", type: "Recycling Campaign", date: "2026-10-20", location: "Barangay Hall, Holy Spirit", description: "Learn proper waste segregation and recycling techniques.", registered: 22, capacity: 40, status: "Upcoming" },
    { id: "a4", title: "Environmental Seminar: Climate Change 101", type: "Environmental Seminars", date: "2026-09-30", location: "QC Hall", description: "Understanding the basics of climate change.", registered: 120, capacity: 120, status: "Completed" },
  ],

  awareness: [
    { id: "aw1", category: "Climate Basics", title: "What is Climate Change?", summary: "Understand the fundamentals of climate change and its causes.", content: "Full content", image: null, references: "IPCC Sixth Assessment Report", author: "Climate Officer", date: "2026-01-10", status: "Published" },
    { id: "aw2", category: "Climate Basics", title: "Greenhouse Gases Explained", summary: "How GHGs trap heat and warm the planet.", content: "Full content", image: null, references: "NASA Climate", author: "Climate Officer", date: "2026-01-12", status: "Published" },
    { id: "aw3", category: "Sustainable Living", title: "Waste Segregation Guide", summary: "Learn to separate biodegradable, recyclable, and residual waste.", content: "Full content", image: null, references: "DENR", author: "Content Manager", date: "2026-02-01", status: "Published" },
    { id: "aw4", category: "Disaster & Climate Resilience", title: "Flood Preparedness", summary: "What to do before, during, and after a flood.", content: "Full content", image: null, references: "NDRRMC", author: "Climate Officer", date: "2026-02-15", status: "Published" },
    { id: "aw5", category: "Renewable Energy", title: "Solar Energy for Homes", summary: "How households can benefit from solar power.", content: "Full content", image: null, references: "DOE", author: "Content Manager", date: "2026-03-01", status: "Published" },
    { id: "aw6", category: "Environmental Protection", title: "Mangrove Protection", summary: "Why mangroves are critical to coastal ecosystems.", content: "Full content", image: null, references: "DENR", author: "Climate Officer", date: "2026-03-10", status: "Published" },
  ],

  advisories: [
    { id: "ad1", title: "Heat Advisory: High Heat Index Expected", type: "Weather Advisory", priority: "High", message: "Heat index may reach 40°C. Stay hydrated and avoid prolonged sun exposure.", date: "2026-10-04", expiry: "2026-10-06", status: "Active" },
    { id: "ad2", title: "Heavy Rainfall Warning", type: "Climate Advisory", priority: "Medium", message: "Moderate to heavy rains expected this weekend. Prepare for possible flooding.", date: "2026-10-03", expiry: "2026-10-07", status: "Active" },
  ],

  users: [
    { id: "u001", name: "Maria Santos", email: "maria.santos@email.com", phone: "+63 917 123 4567", barangay: "Barangay San Isidro", kycStatus: "verified", accountStatus: "Active", points: 480, reports: 3, activities: 4, registrationDate: "2026-01-15", lastLogin: "2026-10-04" },
    { id: "u002", name: "Juan Dela Cruz", email: "juan.delacruz@email.com", phone: "+63 918 234 5678", barangay: "Barangay Holy Spirit", kycStatus: "pending", accountStatus: "Active", points: 120, reports: 1, activities: 1, registrationDate: "2026-03-20", lastLogin: "2026-10-03" },
    { id: "u003", name: "Ana Reyes", email: "ana.reyes@email.com", phone: "+63 919 345 6789", barangay: "Barangay Commonwealth", kycStatus: "verified", accountStatus: "Active", points: 850, reports: 7, activities: 12, registrationDate: "2026-01-05", lastLogin: "2026-10-04" },
    { id: "u004", name: "Pedro Garcia", email: "pedro.garcia@email.com", phone: "+63 920 456 7890", barangay: "Barangay San Isidro", kycStatus: "under_review", accountStatus: "Active", points: 60, reports: 0, activities: 2, registrationDate: "2026-09-01", lastLogin: "2026-09-28" },
    { id: "u005", name: "Liza Mendoza", email: "liza.mendoza@email.com", phone: "+63 921 567 8901", barangay: "Barangay Batasan", kycStatus: "verified", accountStatus: "Suspended", points: 200, reports: 2, activities: 3, registrationDate: "2026-02-10", lastLogin: "2026-09-15" },
  ],

  quizQuestions: [
    { id: "q1", question: "What gas is the primary contributor to the greenhouse effect?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], correctAnswer: 1, category: "Climate Basics", points: 10 },
    { id: "q2", question: "Which of these is a renewable energy source?", options: ["Coal", "Natural Gas", "Solar Power", "Petroleum"], correctAnswer: 2, category: "Renewable Energy", points: 10 },
    { id: "q3", question: "What is the best way to reduce plastic waste?", options: ["Burn it", "Use reusable items", "Throw in any bin", "Bury it"], correctAnswer: 1, category: "Sustainable Living", points: 10 },
    { id: "q4", question: "What should you do during a flood?", options: ["Swim in it", "Move to higher ground", "Drive through it", "Stay in basement"], correctAnswer: 1, category: "Disaster & Climate Resilience", points: 10 },
    { id: "q5", question: "Mangroves protect coastlines from what?", options: ["Earthquakes", "Storm surges", "Volcanoes", "Droughts"], correctAnswer: 1, category: "Environmental Protection", points: 10 },
  ],

  quizResults: [
    { userId: "u001", score: 40, total: 50, date: "2026-10-03" },
    { userId: "u001", score: 50, total: 50, date: "2026-10-01" },
  ],

  notifications: [
    { id: "nt1", type: "Report", category: "Reports", title: "Report Verified", message: "Your report CAR-2026-0003 has been received and is pending verification.", date: "2026-10-04", read: false },
    { id: "nt2", type: "Climate", category: "Climate", title: "New Climate Advisory", message: "Heat advisory issued for your area. Heat index may reach 40°C.", date: "2026-10-04", read: false },
    { id: "nt3", type: "Community", category: "Community", title: "Activity Reminder", message: "Tree Planting Drive is on October 12. Don't forget to attend!", date: "2026-10-03", read: true },
    { id: "nt4", type: "Report", category: "Reports", title: "Report Resolved", message: "Your report CAR-2026-0002 has been resolved.", date: "2026-09-28", read: true },
  ],

  communityStories: [
    { id: "s1", title: "How Our Barangay Reduced Waste by 40%", author: "Ana Reyes", content: "Through community effort and proper segregation...", image: null, date: "2026-09-15", status: "Approved" },
    { id: "s2", title: "From Volunteer to Climate Champion", author: "Maria Santos", content: "My journey in environmental activism...", image: null, date: "2026-09-10", status: "Approved" },
  ],

  champions: [
    { id: "c1", name: "Ana Reyes", points: 850, badges: 8, activities: 12, rank: 1 },
    { id: "c2", name: "Maria Santos", points: 480, badges: 3, activities: 4, rank: 2 },
    { id: "c3", name: "Liza Mendoza", points: 200, badges: 2, activities: 3, rank: 3 },
  ],

  staff: [
    { id: "st1", name: "Admin User", email: "admin@climateaction.gov.ph", role: "Super Admin", status: "Active" },
    { id: "st2", name: "Carlos Tan", email: "carlos.tan@climateaction.gov.ph", role: "Climate Officer", status: "Active" },
    { id: "st3", name: "Rosa Lim", email: "rosa.lim@climateaction.gov.ph", role: "Environmental Officer", status: "Active" },
    { id: "st4", name: "Mark Cruz", email: "mark.cruz@climateaction.gov.ph", role: "Content Manager", status: "Active" },
  ],
};

export function loadDB() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  saveDB(SEED);
  return SEED;
}

export function saveDB(db) {
  localStorage.setItem(KEY, JSON.stringify(db));
}

export function resetDB() {
  localStorage.removeItem(KEY);
  return loadDB();
}

// Report helpers
export function addReport(report) {
  const db = loadDB();
  const seq = db.reports.length + 1;
  const id = `CAR-2026-${String(seq).padStart(4, "0")}`;
  const newReport = {
    ...report,
    id,
    status: "Pending",
    date: new Date().toISOString().slice(0, 10),
    timeline: [{ status: "Submitted", date: new Date().toISOString().slice(0, 10) }],
  };
  db.reports.unshift(newReport);
  db.notifications.unshift({
    id: "nt" + Date.now(),
    type: "Report",
    category: "Reports",
    title: "Report Received",
    message: `Your report ${id} has been received and is pending verification.`,
    date: new Date().toISOString().slice(0, 10),
    read: false,
  });
  saveDB(db);
  return newReport;
}

export function updateReportStatus(id, status) {
  const db = loadDB();
  const report = db.reports.find((r) => r.id === id);
  if (report) {
    report.status = status;
    report.timeline.push({ status, date: new Date().toISOString().slice(0, 10) });
  }
  saveDB(db);
  return report;
}

export function markNotificationRead(id) {
  const db = loadDB();
  const n = db.notifications.find((n) => n.id === id);
  if (n) n.read = true;
  saveDB(db);
}

export function markAllNotificationsRead() {
  const db = loadDB();
  db.notifications.forEach((n) => (n.read = true));
  saveDB(db);
}

export function saveQuizResult(score, total) {
  const db = loadDB();
  db.quizResults.unshift({
    userId: db.currentUser.id,
    score,
    total,
    date: new Date().toISOString().slice(0, 10),
  });
  db.currentUser.points += score;
  saveDB(db);
}

export function updateSettings(patch) {
  const db = loadDB();
  Object.assign(db.settings, patch);
  saveDB(db);
}

export const ISSUE_CATEGORIES = [
  { key: "Flooding", icon: "🌊" },
  { key: "Waste Disposal", icon: "🗑" },
  { key: "Deforestation", icon: "🌳" },
  { key: "Open Burning", icon: "🔥" },
  { key: "Water Pollution", icon: "💧" },
  { key: "Air Pollution", icon: "🌫" },
  { key: "Extreme Heat", icon: "🌡" },
  { key: "Wildlife", icon: "🐟" },
  { key: "Vegetation Loss", icon: "🌱" },
  { key: "Water Shortage", icon: "🚰" },
  { key: "Industrial Pollution", icon: "🏭" },
  { key: "Coastal Issues", icon: "🏖" },
  { key: "Recycling Problems", icon: "♻" },
];

export const AWARENESS_CATEGORIES = [
  { key: "Climate Basics", icon: "🌡", topics: ["What is climate change?", "Global warming", "Greenhouse gases", "Climate vs weather", "Climate impacts", "Philippine climate risks"] },
  { key: "Environmental Protection", icon: "🌳", topics: ["Forest protection", "Biodiversity", "Wildlife", "Marine ecosystems", "Coastal protection", "Mangrove protection"] },
  { key: "Sustainable Living", icon: "♻", topics: ["Waste segregation", "Recycling", "Composting", "Water conservation", "Energy conservation", "Sustainable transportation", "Sustainable food"] },
  { key: "Disaster & Climate Resilience", icon: "🛡", topics: ["Flood preparedness", "Typhoon preparedness", "Extreme heat", "Landslide awareness", "Drought/water shortage", "Emergency preparedness"] },
  { key: "Renewable Energy", icon: "⚡", topics: ["Solar energy", "Wind energy", "Hydropower", "Energy efficiency", "Household energy saving"] },
];

export const REPORT_STATUSES = ["Pending", "Verified", "Assigned", "Investigation", "Resolved", "Archived"];

export const QUIZ_LEVELS = [
  { min: 0, name: "Climate Learner" },
  { min: 100, name: "Eco Supporter" },
  { min: 300, name: "Climate Advocate" },
  { min: 700, name: "Climate Champion" },
];
