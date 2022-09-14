const express = require('express');
const { body } = require('express-validator/check');
const Instructor = require('../models/instructor');


const adminController = require('../controllers/admin');
const isAuth = require('../middleware/admin-is-auth');

const router = express.Router();


router.post(
  '/add-instructor',
  isAuth,
[
  body('first_name')
    .trim()
    .isLength({ min: 3 }),
  body('last_name')
    .trim()
    .isLength({ min: 3 }),
    body('username')
    .trim()
    .isLength({ min: 3 }),
    body('password')
    .isLength({ min: 5 }),
    body('classeNameClass')
    .notEmpty()
],adminController.getAddInstructor);


router.get('/instructors',isAuth,adminController.ShowInstructors);

router.put(
  '/instructor/:instructorID',
  isAuth,
[
  body('first_name')
    .trim()
    .isLength({ min: 3 }),
  body('last_name')
    .trim()
    .isLength({ min: 3 }),
    body('username')
    .trim()
    .isLength({ min: 3 }),
    body('password')
    .isLength({ min: 5 }),
],adminController.updateInstructor);

router.delete('/instructor/:InstructorID',isAuth,adminController.deleteInstructor);

//----------------------------------------------------------------------


router.post('/add-student',
isAuth,
[
  body('first_name')
    .trim()
    .isLength({ min: 3 }),
  body('last_name')
    .trim()
    .isLength({ min: 3 }),
    body('father_name')
    .trim()
    .isLength({ min: 3 }),
    body('BirthDate')
    .notEmpty(),
    body('classeNameClass')
    .notEmpty(),
    body('section')
    .notEmpty()
],adminController.getAddStudent);



router.get('/show-all-students',isAuth,adminController.ShowStudents);

router.put('/student/:studentID',
isAuth,
[
  body('first_name')
    .trim()
    .isLength({ min: 3 }),
  body('last_name')
    .trim()
    .isLength({ min: 3 }),
    body('father_name')
    .trim()
    .isLength({ min: 3 }),
    body('password')
    .isLength({ min: 5 }),
    body('BirthDate')
    .notEmpty(),
    body('classeNameClass')
    .notEmpty(),
    body('section')
],adminController.updateStudent);

router.delete('/student/:StudentID',isAuth,adminController.deleteStudent);


//----------------------------------------------------------------------
router.post('/add-announcement',
isAuth,
[
    body('title')
    .isLength({ min: 5 })
    .notEmpty(),
    body('message')
    .isLength({ min: 10 })
    .notEmpty(),
      body('exp_date')
      .notEmpty()
],adminController.addAnnouncement);

router.get('/show-all-announcement',isAuth,adminController.ShowAnnouncements);

router.put('/announcement/:AnnouncementID',
isAuth,
[
    body('title')
    .isLength({ min: 5 })
    .notEmpty(),
    body('message')
    .isLength({ min: 10 })
    .notEmpty(),
      body('exp_date')
      .notEmpty()
],adminController.updateAnnouncement)

router.delete('/announcement/:AnnouncementID',isAuth,adminController.deleteAnnouncement);


module.exports = router;