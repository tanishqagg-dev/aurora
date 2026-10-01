// Final Aurora 2026 facts. Every figure here matches projectgrid.org/programmes/aurora.
// Change them there and here together.

export const DEVPOST = "https://aurora-global-hackathon-grid.devpost.com/";
export const GRID_AURORA = "https://projectgrid.org/programmes/aurora";
export const GRID_HOME = "https://projectgrid.org/";
export const CONTACT = "info@projectgrid.org";

export const REPORTED = {
  participants: 1500,
  countries: 27,
  prizeLakh: 1,
  topTeams: 20,
  devpostParticipants: 266,
  namedCountries: 15,
};

export const NUMBERS = [
  { value: 1500, suffix: "", label: "participants", note: "reported" },
  { value: 27, suffix: "+", label: "countries", note: "reported" },
  { value: 20, suffix: "", label: "teams into incubation", note: "Top 20" },
  { value: 1, prefix: "₹", suffix: " lakh", label: "in prize laptops", note: "HP laptops" },
];

export const COUNTRIES: Array<[string, string]> = [
  ["au", "Australia"],
  ["az", "Azerbaijan"],
  ["bg", "Bulgaria"],
  ["ca", "Canada"],
  ["cn", "China"],
  ["de", "Germany"],
  ["gh", "Ghana"],
  ["in", "India"],
  ["ma", "Morocco"],
  ["ng", "Nigeria"],
  ["sn", "Senegal"],
  ["sg", "Singapore"],
  ["za", "South Africa"],
  ["ua", "Ukraine"],
  ["us", "United States"],
];

export const STAGES = [
  ["Idea round", "Teams entered with an idea for a real problem. No code needed yet."],
  ["Prototype", "Shortlisted teams turned the idea into something that works."],
  ["Live pitch", "Teams presented their prototypes live to the judges, online."],
  ["Incubation", "The Top 20 teams moved on to incubation with Project GRID."],
];

export const RECORD: Array<[string, string, string | null]> = [
  ["Organiser", "Project GRID, a student-run initiative.", null],
  ["Format", "Fully online. Built so students with limited resources and slow internet could take part.", null],
  ["Who could join", "Students. The Devpost page lists builders aged 14 and above.", "Devpost"],
  ["Participants", "1,500 reported in Project GRID's presentation. The Devpost page, where projects were submitted, lists 266.", "Two counts"],
  ["Countries", "27+ reported in Project GRID's presentation. 15 are named in the registration sheet.", "Two counts"],
  ["Prizes", "₹1 lakh in prizes, the cost of the HP laptops given to the winners. Devpost lists six non-cash prize categories.", null],
  ["Support", "HP provided the prize laptops. Employees of Apple helped as individuals. That was personal support, not a partnership with Apple.", null],
];
