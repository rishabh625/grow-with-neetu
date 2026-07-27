import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, PlayCircle, Users, Award, BookOpen, Clock, Target, ArrowRight } from "lucide-react";
import { SubscribeCta } from "@/components/cta-card";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, createMetadata, faqSchema, personSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export const metadata = createMetadata({
  title: "About Neetu Tiwari | MPSC Educator & Civil Services Mentor | Grow With Neetu",
  description:
    "Meet Neetu Tiwari, the MPSC educator and mentor behind Grow With Neetu. Learn about her teaching philosophy, structured lectures, and free MPSC Rajyaseva & Combined Exam strategy resources.",
  path: "/about",
  keywords: [
    "Neetu Tiwari",
    "Neetu Tiwari MPSC strategy",
    "Grow With Neetu Educator",
    "MPSC mentor Maharashtra",
    "Rajyaseva preparation guide",
    "Grow With Neetu YouTube channel"
  ]
});

const faqs = [
  {
    question: "Who is Neetu Tiwari?",
    answer:
      "Neetu Tiwari is an educator and mentor specializing in Maharashtra Public Service Commission (MPSC) civil services exam preparation. Through her channel Grow With Neetu, she provides structured lectures, notes, PYQ analysis, and exam strategy for thousands of aspirants."
  },
  {
    question: "What exams does Grow With Neetu cover?",
    answer:
      "Grow With Neetu covers major Maharashtra government exams including MPSC Rajyaseva (State Services), Combined Exam (Group B & Group C), PSI, STI, ASO, Talathi, and other competitive civil service exams."
  },
  {
    question: "Are the learning resources and YouTube lectures free?",
    answer:
      "Yes! All video lectures on the Grow With Neetu YouTube channel are completely free. This portal organizes those videos into searchable subject hubs, notes, and exam guides to help aspirants revise efficiently."
  },
  {
    question: "How can I start preparing with Grow With Neetu?",
    answer:
      "Begin by exploring the Subjects page for topic-wise lectures, or check the Exams page for exam-specific preparation strategy. Subscribe to the official YouTube channel for daily updates."
  }
];

export default function AboutPage() {
  const values = [
    {
      icon: <BookOpen aria-hidden="true" className="h-6 w-6 text-emerald-600" />,
      title: "Syllabus-First Teaching",
      description: "Every lecture is aligned with the official exam syllabus for maximum relevance."
    },
    {
      icon: <Clock aria-hidden="true" className="h-6 w-6 text-emerald-600" />,
      title: "Revision Discipline",
      description: "Structured approach to revision with notes, current affairs, and previous year questions."
    },
    {
      icon: <Users aria-hidden="true" className="h-6 w-6 text-emerald-600" />,
      title: "For All Aspirants",
      description: "Simple explanations that work for both beginners and repeat aspirants."
    },
    {
      icon: <Target aria-hidden="true" className="h-6 w-6 text-emerald-600" />,
      title: "Exam-Oriented",
      description: "Focus on what actually matters for clearing the exam with logical elimination methods."
    }
  ];

  const credentials = [
    {
      icon: <Award aria-hidden="true" className="h-5 w-5 text-blue-600" />,
      title: "Experienced Educator",
      description: "Years of teaching experience in MPSC and Maharashtra government exam preparation."
    },
    {
      icon: <BookOpen aria-hidden="true" className="h-5 w-5 text-blue-600" />,
      title: "Structured Content",
      description: "Organized lectures by subject, topic, and exam for systematic learning."
    },
    {
      icon: <Users aria-hidden="true" className="h-5 w-5 text-blue-600" />,
      title: "Community Trust",
      description: "Thousands of aspirants have benefited from the free YouTube learning content."
    }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd
        data={[
          personSchema(),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" }
          ])
        ]}
      />
      <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600">About</p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-6xl">Meet Neetu Tiwari</h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">
        {siteConfig.name} is an educational YouTube channel and learning portal for MPSC, Rajyaseva,
        Combined Exams and Maharashtra government exam preparation. Founded by Neetu Tiwari,
        the mission is to make structured, reliable and exam-oriented learning accessible to every aspirant - completely free.
      </p>

      <section className="mt-12 grid gap-8 md:grid-cols-[1fr_1.2fr] items-start">
        <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm">
          <div className="relative aspect-square bg-blue-50 rounded-[1.5rem] overflow-hidden">
            <Image
              src="/images/neetu-tiwari.png"
              alt="Neetu Tiwari - MPSC Educator"
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">Neetu Tiwari</h2>
            <p className="mt-2 text-sm font-bold text-emerald-600">MPSC Educator & Mentor</p>
          </div>
        </div>

        <div className="space-y-6">
          {credentials.map((credential, idx) => (
            <div key={idx} className="rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                {credential.icon}
                <div>
                  <h3 className="font-black text-slate-950">{credential.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{credential.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {values.map((value, idx) => (
          <div key={idx} className="rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-sm">
            {value.icon}
            <h3 className="mt-4 font-black tracking-[-0.02em] text-slate-950">{value.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">{value.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-[1.5rem] border border-blue-100 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">Start Your Preparation</h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Begin your journey by exploring subjects, exams, and the latest videos:
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link
            href="/subjects"
            className="flex items-center justify-between rounded-full border border-blue-200 bg-white px-5 py-4 text-sm font-black text-blue-700 shadow-sm transition hover:border-blue-500 hover:bg-blue-50"
          >
            Explore Subjects
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link
            href="/exams"
            className="flex items-center justify-between rounded-full border border-blue-200 bg-white px-5 py-4 text-sm font-black text-blue-700 shadow-sm transition hover:border-blue-500 hover:bg-blue-50"
          >
            Browse Exams
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link
            href={siteConfig.youtubeChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-full bg-blue-600 px-5 py-4 text-sm font-black text-white transition hover:bg-blue-700"
          >
            <PlayCircle aria-hidden="true" className="mr-2 h-4 w-4" />
            Subscribe on YouTube
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-black tracking-[-0.04em] text-slate-950">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-sm">
              <h3 className="font-black text-slate-950">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <SubscribeCta compact />
      </div>
    </div>
  );
}
