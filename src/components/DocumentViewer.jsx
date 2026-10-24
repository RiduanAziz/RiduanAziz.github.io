import { useEffect, useRef } from 'react';
import { Download, ExternalLink, X } from 'lucide-react';
import { assetPath } from '../utils/assets';

const DocumentViewer = ({ document: documentData, context, onClose }) => {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const source = assetPath(documentData?.file);
  const pages = documentData?.pages || [];
  const isImage = /\.(png|jpe?g|webp|gif)$/i.test(documentData?.file || '');

  useEffect(() => {
    if (!source) return undefined;
    const opener = document.activeElement;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, [onClose, source]);

  if (!source) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="flex h-[min(92vh,900px)] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-slate-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-viewer-title"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-slate-700">
          <div>
            <h2 id="document-viewer-title" className="font-semibold text-slate-900 dark:text-white">{documentData.title}</h2>
            {context && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{context}</p>}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a href={source} target="_blank" rel="noreferrer" className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-accent dark:hover:bg-slate-800" aria-label="Open document in a new tab">
              <ExternalLink size={18} />
            </a>
            <a href={source} download className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-accent dark:hover:bg-slate-800" aria-label={`Download ${documentData.title}`}>
              <Download size={18} />
            </a>
            <button ref={closeButtonRef} type="button" onClick={onClose} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-accent dark:hover:bg-slate-800" aria-label="Close document viewer">
              <X size={20} />
            </button>
          </div>
        </header>
        <div className="min-h-0 flex-1 bg-slate-100 p-3 dark:bg-slate-950">
          {pages.length > 0 ? (
            <div className="flex h-full flex-col items-center gap-6 overflow-y-auto p-2 sm:p-4">
              {pages.map((page, index) => (
                <div key={page} className="w-full max-w-5xl">
                  <div className="mb-2 flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-accent">Page {index + 1} of {pages.length}</span>
                    <span>{documentData.title}</span>
                  </div>
                  <img src={assetPath(page)} alt={`${documentData.title} - Page ${index + 1}`} className="w-full rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-800" />
                </div>
              ))}
            </div>
          ) : isImage ? (
            <img src={source} alt={documentData.title} className="h-full w-full object-contain" />
          ) : (
            <iframe title={documentData.title} src={`${source}#toolbar=1`} className="h-full w-full rounded border-0 bg-white" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
