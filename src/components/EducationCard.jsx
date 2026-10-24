import { useState } from 'react';
import { ChevronDown, Download, FileText, ExternalLink } from 'lucide-react';
import SkillTag from './SkillTag';
import { assetPath } from '../utils/assets';

const EducationCard = ({ education, onViewDocument }) => {
  const [expanded, setExpanded] = useState(false);
  const documents = education.documents || [];

  return (
    <article className="card-border-effect rounded-lg bg-white p-5 dark:bg-slate-800/50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">{education.degree}</h4>
          <p className="mt-1 text-sm font-medium text-accent">{education.institution}</p>
          {education.department && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{education.department}</p>}
        </div>
        {education.status && <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent">{education.status}</span>}
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{education.details}</p>
      {education.description && <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{education.description}</p>}

      <button type="button" onClick={() => setExpanded((value) => !value)} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-expanded={expanded}>
        {expanded ? 'Hide Details' : 'View Details'}
        <ChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {expanded && (
        <div className="mt-5 space-y-5 border-t border-slate-200 pt-5 dark:border-slate-700">
          {(education.cgpa || education.credits || education.period) && (
            <div className="grid gap-3 sm:grid-cols-3">
              {education.cgpa && <div><p className="text-xs uppercase tracking-wide text-slate-500">CGPA / GPA</p><p className="mt-1 font-semibold text-slate-900 dark:text-white">{education.cgpa}</p></div>}
              {education.credits && <div><p className="text-xs uppercase tracking-wide text-slate-500">Credits</p><p className="mt-1 font-semibold text-slate-900 dark:text-white">{education.credits}</p></div>}
              {education.period && <div><p className="text-xs uppercase tracking-wide text-slate-500">Period</p><p className="mt-1 font-semibold text-slate-900 dark:text-white">{education.period}</p></div>}
            </div>
          )}
          {education.skills?.length > 0 && <div><h5 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">Relevant Skills</h5><div className="flex flex-wrap gap-2">{education.skills.map((skill) => <SkillTag key={skill}>{skill}</SkillTag>)}</div></div>}
          {education.reportedSnapshots?.length > 0 && <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200"><h5 className="mb-2 font-semibold">Reported academic snapshots</h5><ul className="list-disc space-y-1 pl-5">{education.reportedSnapshots.map((snapshot) => <li key={snapshot}>{snapshot}</li>)}</ul></div>}
          {education.activities?.length > 0 && <div><h5 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">Activities and Societies</h5>{education.activities.map((activity) => <div key={`${activity.name}-${activity.year}`} className="text-sm text-slate-600 dark:text-slate-300"><span className="font-medium">{activity.name}</span>{activity.role && ` — ${activity.role}`}{activity.year && ` (${activity.year})`}</div>)}</div>}
          {documents.length > 0 && <div><h5 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">Academic Documents</h5><div className="grid gap-2 sm:grid-cols-2">{documents.map((document) => document.file ? <div key={document.id} className="flex items-center justify-between gap-3 rounded-md border border-slate-200 p-3 dark:border-slate-700"><span className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"><FileText size={16} />{document.title}</span><div className="flex gap-1"><button type="button" onClick={() => onViewDocument(document, `${education.degree} · ${education.institution}`)} className="inline-flex items-center gap-1 rounded p-1.5 text-xs font-semibold text-accent hover:bg-slate-100 dark:hover:bg-slate-700" aria-label={`View ${document.title}`}><ExternalLink size={16} /></button><a href={assetPath(document.file)} download className="rounded p-1.5 text-accent hover:bg-slate-100 dark:hover:bg-slate-700" aria-label={`Download ${document.title}`}><Download size={16} /></a></div></div> : <div key={document.id} className="rounded-md border border-dashed border-slate-300 p-3 text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400">{document.title} is not uploaded yet.</div>)}</div></div>}
        </div>
      )}
    </article>
  );
};

export default EducationCard;
