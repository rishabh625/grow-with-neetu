export function FaqList({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-blue-100 overflow-hidden rounded-[1.5rem] border border-blue-100 bg-white shadow-sm">
      {faqs.map((faq) => (
        <details key={faq.question} className="group p-6 open:bg-blue-50/50">
          <summary className="cursor-pointer list-none text-base font-black text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <span className="flex items-center justify-between gap-6">
              {faq.question}
              <span className="text-xl text-blue-600 transition group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
