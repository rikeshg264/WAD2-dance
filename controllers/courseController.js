const courseDB  = require('../models/courseModel');
const bookingDB = require('../models/bookingModel');
const userDB    = require('../models/userDB');

exports.listCourses = (req, res) => {
  courseDB.find({}, (err, courses) => {
    if (err) return res.status(500).send('Error loading courses');
    res.render('courses', {
      courses,
      isOrganiser: req.session.user?.role === 'organiser'
    });
  });
};

exports.showAddForm = (req, res) => {
  res.render('addCourse');
};

exports.addCourse = (req, res) => {
  const { name, description, duration, price, dates, times, locations } = req.body;
  const sessions = Array.isArray(dates)
    ? dates.map((_, i) => ({ date: dates[i], time: times[i], location: locations[i] }))
    : [{ date: dates, time: times, location: locations }];
    const image = req.file ? '/uploads/' + req.file.filename : null; //Handle uploaded image

  const newCourse = {
    name,
    description,
    duration,
    price: +price,
    classes: sessions,
    image //Save image path
  };
  courseDB.insert({ name, description, duration, price: +price, classes: sessions }, (err) => {
    if (err) return res.send('Error adding');
    res.redirect('/courses');
  });
};

exports.showEditForm = (req, res) => {
  courseDB.findOne({ _id: req.params.id }, (err, course) => {
    if (err || !course) return res.send('Not found');
    res.render('editCourse', { course });
  });
};

exports.updateCourse = (req, res) => {
  const { name, description, duration, price, dates, times, locations } = req.body;
  const sessions = Array.isArray(dates)
    ? dates.map((_, i) => ({ date: dates[i], time: times[i], location: locations[i] }))
    : [{ date: dates, time: times, location: locations }];

  const updateFields = {
    name,
    description,
    duration,
    price: +price,
    classes: sessions
  };

  if (req.file) {
    updateFields.image = '/uploads/' + req.file.filename; //Only update if a new image is uploaded
  }

  courseDB.update(
    { _id: req.params.id },
    { $set: updateFields },
    {},
    (err) => {
      if (err) return res.send('Error updating');
      res.redirect('/courses');
    }
  );
};


exports.deleteCourse = (req, res) => {
  courseDB.remove({ _id: req.params.id }, {}, (err) => {
    if (err) return res.send('Error deleting');
    res.redirect('/courses');
  });
};

exports.viewParticipants = (req, res) => {
  const courseId = req.params.id;
  bookingDB.find({ courseId }, (err, bookings) => {
    const userIds = bookings.map(b => b.userId);
    userDB.find({ _id: { $in: userIds } }, (err, users) => {
      if (err) return res.send('Error loading participants');
      // pass them as `users` to match the template
      res.render('participants', { users, courseId });
    });
  });
};
