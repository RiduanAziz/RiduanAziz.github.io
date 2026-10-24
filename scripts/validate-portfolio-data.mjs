import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  professionalInfo,
  projects,
  concepts,
  education,
  certifications,
  awards,
  leadership,
  volunteering
} from '../src/data/portfolioData.js';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

const error = (location, message) => errors.push(`${location}: ${message}`);
const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;
const isHttpUrl = (value) => {
  try {
    const url = new URL(value);
    return (url.protocol === 'http:' || url.protocol === 'https:') && isNonEmptyString(url.hostname);
  } catch {
    return false;
  }
};

const validateUniqueIds = (collectionName, records) => {
  const seen = new Set();
  records.forEach((record, index) => {
    const location = `${collectionName}[${index}]`;
    if (!isNonEmptyString(record.id)) {
      error(location, 'id must be a non-empty string');
    } else if (seen.has(record.id)) {
      error(location, `duplicate id "${record.id}"`);
    } else {
      seen.add(record.id);
    }
  });
};

const validateCollection = (collectionName, records, requiredFields) => {
  if (!Array.isArray(records)) {
    error(collectionName, 'must be an array');
    return;
  }
  validateUniqueIds(collectionName, records);
  records.forEach((record, index) => {
    const location = `${collectionName}[${index}] (${record && typeof record === 'object' ? record.id || 'missing-id' : 'invalid-record'})`;
    if (!record || typeof record !== 'object' || Array.isArray(record)) {
      error(location, 'must be an object');
      return;
    }
    requiredFields.forEach((field) => {
      if (!isNonEmptyString(record[field])) error(location, `${field} must be a non-empty string`);
    });
    Object.entries(record).forEach(([field, value]) => {
      if (value === undefined || (typeof value === 'string' && value.trim() === '')) {
        error(location, `${field} must not be undefined or empty`);
      }
    });
  });
};

const validateAsset = (asset, location) => {
  if (asset === null) return;
  if (!isNonEmptyString(asset) || !asset.startsWith('/')) {
    error(location, 'must be null or a root-relative path under public/');
    return;
  }
  const assetFile = path.join(repositoryRoot, 'public', asset.replace(/^\/+/, ''));
  if (!fs.existsSync(assetFile) || !fs.statSync(assetFile).isFile()) {
    error(location, `asset does not exist: ${asset}`);
  }
};

if (!professionalInfo || !isNonEmptyString(professionalInfo.name) || !isNonEmptyString(professionalInfo.headline)) {
  error('professionalInfo', 'name and headline are required');
}
if (!isNonEmptyString(professionalInfo.contacts?.email) || !professionalInfo.contacts.email.includes('@')) {
  error('professionalInfo.contacts.email', 'must be a valid-looking email address');
}
for (const [name, value] of Object.entries(professionalInfo.contacts || {})) {
  if (name !== 'email' && value !== null && !isHttpUrl(value)) {
    error(`professionalInfo.contacts.${name}`, 'must be a valid HTTP(S) URL');
  }
}
if (professionalInfo.photo !== null && !isHttpUrl(professionalInfo.photo)) {
  error('professionalInfo.photo', 'must be null or a valid HTTP(S) URL');
}

validateCollection('projects', projects, ['id', 'title', 'category', 'description', 'status']);
projects.forEach((project) => {
  if (project.github !== null && !isHttpUrl(project.github)) {
    error(`projects (${project.id}).github`, 'must be null or a valid HTTP(S) URL');
  }
  if (!Array.isArray(project.tech) || project.tech.some((skill) => !isNonEmptyString(skill))) {
    error(`projects (${project.id}).tech`, 'must be an array of non-empty strings');
  }
});
validateCollection('concepts', concepts, ['id', 'title', 'desc', 'label']);
validateCollection('education', education, ['id', 'degree', 'institution', 'details', 'status', 'period']);
education.forEach((record) => {
  if (record.documents !== undefined && !Array.isArray(record.documents)) {
    error(`education (${record.id}).documents`, 'must be an array when present');
  }
  for (const document of record.documents || []) {
    if (!isNonEmptyString(document.id) || !isNonEmptyString(document.title)) {
      error(`education (${record.id}).documents`, 'each document requires id and title');
    }
    validateAsset(document.file, `education (${record.id}).documents.${document.id}.file`);
    if (document.pages !== undefined) {
      if (!Array.isArray(document.pages) || document.pages.length === 0) {
        error(`education (${record.id}).documents.${document.id}.pages`, 'must be a non-empty array when present');
      } else {
        document.pages.forEach((page, pageIndex) => {
          validateAsset(page, `education (${record.id}).documents.${document.id}.pages[${pageIndex}]`);
        });
      }
    }
  }
});
validateCollection('certifications', certifications, ['id', 'title', 'issuer', 'type', 'status']);
certifications.forEach((record) => {
  if (record.year !== undefined && !isNonEmptyString(record.year)) error(`certifications (${record.id}).year`, 'must be a non-empty string');
  if (record.duration !== undefined && !isNonEmptyString(record.duration)) error(`certifications (${record.id}).duration`, 'must be a non-empty string');
  if (record.credentialUrl !== null && record.credentialUrl !== undefined && !isHttpUrl(record.credentialUrl)) {
    error(`certifications (${record.id}).credentialUrl`, 'must be null or a valid HTTP(S) URL');
  }
  if (record.credentialUrls !== undefined) {
    if (!Array.isArray(record.credentialUrls)) {
      error(`certifications (${record.id}).credentialUrls`, 'must be an array when present');
    } else {
      record.credentialUrls.forEach((link, index) => {
        if (!isNonEmptyString(link?.label) || !isHttpUrl(link?.url)) {
          error(`certifications (${record.id}).credentialUrls[${index}]`, 'requires a label and valid HTTP(S) URL');
        }
      });
    }
  }
  validateAsset(record.certificateFile, `certifications (${record.id}).certificateFile`);
});
validateCollection('awards', awards, ['id', 'title', 'organization', 'date', 'description']);
validateCollection('leadership', leadership, ['id', 'role', 'organization', 'institution', 'period', 'area']);
validateCollection('volunteering', volunteering, ['id', 'role', 'organization', 'period', 'area', 'description']);

if (errors.length) {
  console.error(`Portfolio data validation failed with ${errors.length} error(s):`);
  errors.forEach((message) => console.error(`- ${message}`));
  process.exitCode = 1;
} else {
  console.log('Portfolio data validation passed.');
}
