// validateTask.js
// Simple manual validation + sanitization for task create/update routes.

const { validate: uuidValidate } = require('uuid');


function isValidDateString(s) {
  if (!s) return false;
  // Only accept YYYY-MM-DD format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  if (Number.isNaN(d.getTime())) return false;
  const [y, m, day] = s.split('-').map(Number);
  return d.getUTCFullYear() === y && (d.getUTCMonth() + 1) === m && d.getUTCDate() === day;
}

function sanitizeText(s, max = 1000) {
  if (s === undefined || s === null) return '';
  let t = String(s).trim();
  // remove control characters
  t = t.replace(/[\x00-\x1F\x7F]/g, '');
  if (t.length > max) t = t.slice(0, max);
  return t;
}

/**
 * Express middleware for validating task body on create/update.
 * If errors found, it attaches req.validation = { errors, values } and calls next().
 * Otherwise it sanitizes req.body fields and calls next().
 */
function validateTaskBody(req, res, next) {
  const errors = [];
  const raw = req.body || {};

  const title = sanitizeText(raw.title || '', 120);
  const description = sanitizeText(raw.description || '', 1000);
  const due_date = (raw.due_date || '').trim() || '';
  const priority = (raw.priority || 'low').trim().toLowerCase();

  // Title
  if (!title) errors.push('Title is required.');
  if (title.length > 120) errors.push('Title must be 120 characters or fewer.');

  // Description
  if (description.length > 1000) errors.push('Description must be 1000 characters or fewer.');

  // Due date (optional)
  if (due_date) {
    if (!isValidDateString(due_date)) {
      errors.push('Due date must be a valid date in format YYYY-MM-DD.');
    } else {
      // optional: disallow past dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dd = new Date(due_date + 'T00:00:00Z');
      if (dd < today) {
        errors.push('Due date cannot be in the past.');
      }
    }
  }

  // Priority
  const allowed = ['low', 'medium', 'high'];
  if (!allowed.includes(priority)) errors.push('Priority must be low, medium, or high.');

  // If there are errors, attach them and values so the view can render the form with messages
  if (errors.length) {
    req.validation = {
      errors,
      values: {
        title,
        description,
        due_date,
        priority
      }
    };
    return next();
  }

  // No errors: sanitize and replace req.body values for handlers
  req.body.title = title;
  req.body.description = description;
  req.body.due_date = due_date || null;
  req.body.priority = priority;

  return next();
}

/**
 * Optional middleware to validate route id param (UUID).
 * Usage: app.param('id', validateIdParam) or call in routes.
 */
function validateIdParam(req, res, next, id) {
  if (!uuidValidate(id)) {
    return res.status(400).send('Invalid id format');
  }
  next();
}

module.exports = { validateTaskBody, validateIdParam, isValidDateString, sanitizeText };
