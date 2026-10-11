import { useState } from 'react';
import { ChevronDown, Download, ExternalLink, FileBadge } from 'lucide-react';
import SkillTag from './SkillTag';
import { assetPath } from '../utils/assets';

const CredentialCard = ({ credential, onViewDocument }) => {
  const [expanded, setExpanded] = useState(false);
  const file = assetPath(credential.certificateFile);

  return (
    <article className="card-border-effect rounded-md bg-slate-50 p-4 dark:bg-slate-800/50">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent"><FileBadge size={22} /></div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-sm leading-tight text-slate-900 dark:text-white">{credential.title}</h4>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400"><span>{credential.issuer}</span><span className="font-medium text-accent">{credential.year}</span><span>{credential.status}</span></div>
        </div>
      </div>
      {credential.skills?.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{credential.skills.slice(0, 4).map((skill) => <SkillTag key={skill}>{skill}</SkillTag>)}</div>}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setExpanded((value) => !value)} className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-expanded={expanded}>{expanded ? 'Hide Details' : 'View Details'}<ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} /></button>
        {file && <button type="button" onClick={() => onViewDocument({ title: credential.title, file: credential.certificateFile }, credential.issuer)} className="text-xs font-semibold text-accent hover:text-accent-hover">View Certificate</button>}
        {credential.credentialUrl && <a href={credential.credentialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover">Verify Credential <ExternalLink size={13} /></a>}
        {file && <a href={file} download className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover">Download <Download size={13} /></a>}
      </div>
      {expanded && <div className="mt-4 space-y-3 border-t border-slate-200 pt-4 text-sm dark:border-slate-700"><p className="text-slate-600 dark:text-slate-300">{credential.type}</p>{credential.credentialId && <p className="text-slate-500 dark:text-slate-400">Credential ID: <span className="font-medium text-slate-700 dark:text-slate-200">{credential.credentialId}</span></p>}{credential.skills?.length > 0 && <div className="flex flex-wrap gap-1.5">{credential.skills.map((skill) => <SkillTag key={skill}>{skill}</SkillTag>)}</div>}{!file && <p className="text-xs text-slate-500 dark:text-slate-400">Certificate preview will appear after a genuine certificate file or image is added to the credential data.</p>}</div>}
    </article>
  );
};

export default CredentialCard;
