/**
 * Input validation middleware
 */

const validateSignUp = (req, res, next) => {
  const { username, password, confirmPassword } = req.body;
  const errors = [];

  // Username validation
  if (!username || username.trim().length < 3) {
    errors.push('Username must be at least 3 characters long');
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }

  // Password validation
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }

  if (errors.length > 0) {
    return res.render('auth/sign-up.ejs', {
      errors,
      user: req.user || null,
    });
  }

  next();
};

const validateSignIn = (req, res, next) => {
  const { username, password } = req.body;
  const errors = [];

  if (!username || username.trim().length === 0) {
    errors.push('Username is required');
  }
  if (!password || password.length === 0) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.render('auth/sign-in.ejs', {
      errors,
      user: req.user || null,
    });
  }

  next();
};

const validateTrip = (req, res, next) => {
  const { startDate, endDate, countries, passengers } = req.body;
  const errors = [];

  if (!startDate) {
    errors.push('Start date is required');
  }
  if (!endDate) {
    errors.push('End date is required');
  }
  if (!countries) {
    errors.push('Country selection is required');
  }
  if (!passengers || passengers < 1) {
    errors.push('Number of passengers must be at least 1');
  }

  // Check if end date is after start date
  if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
    errors.push('End date must be after start date');
  }

  if (errors.length > 0) {
    return res.status(400).render('trips/new.ejs', {
      errors,
      destinations: [], // You'll need to fetch this again or pass it through
    });
  }

  next();
};

module.exports = {
  validateSignUp,
  validateSignIn,
  validateTrip,
};
