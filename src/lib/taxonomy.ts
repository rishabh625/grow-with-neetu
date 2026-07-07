export type Subject = {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
};

export type Exam = {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
  focusAreas: string[];
  faqs: { question: string; answer: string }[];
};

const subjectNames = [
  ["current-affairs", "Current Affairs", "Daily and monthly current affairs for MPSC and Maharashtra government exams."],
  ["history", "History", "Ancient, medieval, modern Indian history and Maharashtra history for MPSC."],
  ["geography", "Geography", "Indian, world and Maharashtra geography with maps, climate and environment links."],
  ["polity", "Polity", "Indian Constitution, governance, rights, duties and public administration concepts."],
  ["economics", "Economics", "Indian economy, Maharashtra economy, budgeting, planning and development topics."],
  ["science", "Science", "General science concepts explained for prelims and mains preparation."],
  ["environment", "Environment", "Ecology, biodiversity, climate change and environment current affairs."],
  ["csat", "CSAT", "Reasoning, comprehension, maths and aptitude practice for qualifying papers."],
  ["marathi-grammar", "Marathi Grammar", "Grammar rules, usage, vocabulary and practice for Marathi language papers."],
  ["english", "English", "Grammar, comprehension and vocabulary lessons for competitive exam English."],
  ["reasoning", "Reasoning", "Logical reasoning, analytical ability and problem-solving practice."],
  ["maths", "Maths", "Quantitative aptitude, arithmetic and data interpretation for exam readiness."],
  ["pyqs", "PYQs", "Previous year questions, trend analysis and answer strategy."],
  ["mock-tests", "Mock Tests", "Exam-like practice, revision plans and performance analysis."],
  ["strategy", "Strategy", "Study plans, revision systems and smart preparation guidance."],
  ["motivation", "Motivation", "Consistency, discipline and mindset support for aspirants."]
] as const;

export const subjects: Subject[] = subjectNames.map(([slug, name, description]) => ({
  slug,
  name,
  description,
  keywords: [`MPSC ${name}`, `${name} for MPSC`, `${name} notes`, `${name} preparation`],
  faqs: [
    {
      question: `How should I study ${name} for MPSC?`,
      answer: `Start with the syllabus, watch structured lectures, revise short notes and solve PYQs linked to ${name}.`
    },
    {
      question: `Are ${name} videos useful for Rajyaseva and Combined Exams?`,
      answer: `Yes. The concepts are mapped to MPSC, Rajyaseva, Combined Exams and other Maharashtra government exams.`
    }
  ]
}));

const examRows: readonly (readonly [string, string, string, readonly string[]])[] = [
  ["rajyaseva", "Rajyaseva", "Complete Rajyaseva preparation with prelims, mains, current affairs and interview strategy.", ["Polity", "Economics", "History", "Geography", "Current Affairs"]],
  ["combined-exam", "Combined Exam", "Preparation hub for MPSC Combined Group B and Group C exams.", ["Current Affairs", "Polity", "Reasoning", "Maths", "Marathi"]],
  ["psi", "PSI", "PSI preparation with subject-wise lectures, PYQs and exam strategy.", ["Law", "Polity", "Current Affairs", "Fitness", "Reasoning"]],
  ["sti", "STI", "STI preparation for Maharashtra tax and administrative exam aspirants.", ["Economics", "Polity", "Current Affairs", "Maths"]],
  ["aso", "ASO", "ASO exam preparation with syllabus coverage, notes and practice plans.", ["Polity", "English", "Marathi", "Reasoning"]],
  ["forest", "Forest", "Forest exam preparation focused on environment, science and Maharashtra geography.", ["Environment", "Science", "Geography", "Current Affairs"]],
  ["talathi", "Talathi", "Talathi preparation with Marathi, maths, reasoning and Maharashtra GK.", ["Marathi", "Maths", "Reasoning", "Current Affairs"]],
  ["zp", "ZP", "Zilla Parishad exam preparation with topic-wise videos and notes.", ["Marathi", "English", "Maths", "Reasoning"]],
  ["police-bharti", "Police Bharti", "Police Bharti preparation with GK, current affairs, reasoning and motivation.", ["Current Affairs", "Reasoning", "Maths", "Motivation"]]
];

export const exams: Exam[] = examRows.map(([slug, name, description, focusAreas]) => ({
  slug,
  name,
  description,
  focusAreas: [...focusAreas],
  keywords: [`${name} Preparation`, `${name} syllabus`, `${name} notes`, `${name} previous year questions`],
  faqs: [
    {
      question: `What is the best way to prepare for ${name}?`,
      answer: `Use the exam syllabus as a checklist, study high-yield subjects, revise current affairs and practice PYQs regularly.`
    },
    {
      question: `Does Grow With Neetu cover ${name} topics?`,
      answer: `Yes. Videos, notes and blog summaries are organized around the subjects commonly asked in ${name}.`
    }
  ]
}));

export function getSubject(slug: string) {
  return subjects.find((subject) => subject.slug === slug);
}

export function getExam(slug: string) {
  return exams.find((exam) => exam.slug === slug);
}
