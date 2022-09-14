const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const sequelize = require('./util/database');
const Classe = require('./models/classe');
const Abscese = require('./models/abscese')
const Instructor = require('./models/instructor');
const Limpidityie = require('./models/limpidityie');
const Note = require('./models/note');
const Section = require('./models/section');
const Student = require('./models/student');
const Mark = require('./models/mark.js');
const SectionNote = require('./models/section-note');
const NoteIteam = require('./models/note-iteam');
const program = require('./models/program');

const app = express();


const adminRoutes = require('./routes/admin');
const instructorRoutes = require("./routes/instructor");
const studentRoutes = require("./routes/students");
const Complaint = require('./models/complaint');

app.use(bodyParser.json()); // application/json
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('/admin',adminRoutes);
app.use('/instructor',instructorRoutes);
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(studentRoutes);


app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});


Student.belongsToMany(SectionNote , {through : NoteIteam});

Student.hasMany(Complaint , { onDelete: 'SET NULL' });
Complaint.belongsTo(Student , { onDelete: 'SET NULL' });

Instructor.hasMany(Complaint , { onDelete: 'SET NULL' });
Complaint.belongsTo(Instructor , { onDelete: 'SET NULL' });

Student.hasMany(Mark , { onDelete: 'SET NULL' });
Mark.belongsTo(Student , { onDelete: 'SET NULL' });

Student.hasMany(Abscese , { onDelete: 'SET NULL' });
Abscese.belongsTo(Student , { onDelete: 'SET NULL' });

Student.hasOne(Limpidityie , { onDelete: 'SET NULL' });
Limpidityie.belongsTo(Student , { onDelete: 'SET NULL' });

Classe.hasOne(Instructor, { onDelete: 'SET NULL' });
Instructor.belongsTo(Classe, { onDelete: ' SET NULL' });


Section.hasMany(program , { onDelete: 'SET NULL' });
program.belongsTo(Section , { onDelete: 'SET NULL' });

Student.hasMany(Note , { onDelete: 'SET NULL' });
Note.belongsTo(Student , { onDelete: 'SET NULL' });

Section.hasMany(Student , { onDelete: 'SET NULL' });
Student.belongsTo(Section , { onDelete: 'SET NULL' });
 




Classe.hasMany(Section, { onDelete: 'CASCADE' });
Section.belongsTo(Classe,{ onDelete: 'CASCADE' });




sequelize
  // .sync({   force: true })
  .sync()
  .then(result => {
   app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
