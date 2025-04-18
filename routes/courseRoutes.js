const express         = require('express');
const router          = express.Router();
const courseController = require('../controllers/courseController');
const bookingController = require('../controllers/bookingController');
const { verifyToken } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage: storage });

// public browse
router.get('/explore-courses', courseController.listCourses);


function isOrganiser(req, res, next) {
  if (req.user && req.user.role === 'organiser') {
    return next();
  }
  res.redirect('/login');
}

// organiser lanes
router.get('/courses',           verifyToken, courseController.listCourses);
router.get('/courses/add',       verifyToken, isOrganiser, courseController.showAddForm);
router.post('/courses/add', verifyToken, isOrganiser, upload.single('photo'), courseController.addCourse);
router.get('/courses/edit/:id',  verifyToken, isOrganiser, courseController.showEditForm);
router.post('/courses/edit/:id', verifyToken, isOrganiser, upload.single('photo'), courseController.updateCourse);
router.get('/courses/delete/:id',verifyToken, isOrganiser, courseController.deleteCourse);
router.get('/courses/:id/participants',verifyToken, isOrganiser, courseController.viewParticipants);

// enrollment (non‑organisers)
router.post('/enrol/:id',        verifyToken, bookingController.enrol);

module.exports = router;
