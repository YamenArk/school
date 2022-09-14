const jwt = require('jsonwebtoken');
const PublicNote = require('../models/public-note');
const Section = require('../models/section');
const Student = require('../models/student');
const Instructor = require('../models/instructor');
const Abcense = require('../models/abscese');
const program = require('../models/program');
const FCM = require('../util/notification');
const Limpidityie = require('../models/limpidityie')
const { validationResult } = require('express-validator/check');
const fcm = FCM.fcm;
const e = require('express');

exports.send_Complaint = (req,res,next)=>{
  const message = req.body.message;
  let toToken , instructorId;
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
  Student.findByPk(req.userId).
  then(async student =>{
    let section_id = student.sectionId;
    let classname = await Section.findOne({where : {
      id:section_id
    }});
    Instructor.findOne({where : {
      classeNameClass:classname.classeNameClass
    }})
    .then(Ins_Info =>{
      toToken = Ins_Info.tokenMessage;
      instructorId = Ins_Info.id;
      var message2 = {
        to:toToken,
        notification:{
          title:'Complaint',
          body: 'There is a message complaint for you please check it'
        }
      };
      fcm.send(message2,function(err,response){
        if(err){
          console.log("response : " + err);
        }else{
          console.log("Successfully sent with response : " , response);
        }
        student.createComplaint({
          instructorId : instructorId,
          message :message,
          start_date : Date.now()
        })
      });
    })
     })
    }catch(err){
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    }
      // send notification
  res.status(200).send("it has been done ")
}
exports.getAbcenseNote =async (req,res,next)=>{
 try{
  let i = 0 , DATAArray = []; 
  const abcense = await Abcense.findAll(
  {where :{studentId :req.userId}})
  while(abcense[i]){
    let data = {
      message : abcense[i].message,
      start_date : abcense[i].start_date,
      exp_date : abcense[i].exp_date  
    }
    DATAArray.push(data);
    i++;
  }   
res.status(200).send(DATAArray);
}
catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
}    
}

exports.login = (req,res,next ) =>{
    const username = req.body.username;
    const password = req.body.password;
    const tokenMessage = req.body.tokenMessage;
    console.log(`TokenMessage : ${tokenMessage}`);
    let loadedStudenr;
    let token ;
    Student.findAll({where :{username : username}})
    .then(students =>{
        if(students.length == 0)
        {
            const error = new Error('A studnet with this username could not be found.');
            error.statusCode = 401;
            throw error; 
        }
        let i =0;
        while(students[i])
        {

          if(students[i].password == password)
          {
            loadedStudenr = students[i];
            return true;
          }
          i++;
        }
        return false;

    }).then (async isEqual =>{
        if(!isEqual)
        {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        token = jwt.sign(
            {
              username: loadedStudenr.username,
              userId: loadedStudenr.id
            },
            'somesupersecretsecret',
            { expiresIn: '1h' }
          );
          Student.update({
            tokenMessage : tokenMessage
          },{
            where :{} 
          });
          section_row = await Section.findByPk(loadedStudenr.sectionId);
          AllData = {
            id : loadedStudenr.id, 
            first_name: loadedStudenr.first_name,
            last_name : loadedStudenr.last_name,
            age : loadedStudenr.age,
            father_name : loadedStudenr.father_name,
            username : loadedStudenr.username,
            password : loadedStudenr.password ,
            signInDate : loadedStudenr.signInDate ,
            BirthDate : loadedStudenr.BirthDate,
            attend_number : loadedStudenr.attend_number,
            absence_number : loadedStudenr.absence_number,
            class : section_row.classeNameClass,
            name_sec : section_row.name_sec,
            rank:section_row.rank,
            sectionId : loadedStudenr.sectionId,
            token : token,
            tokenMessage:tokenMessage
          }
          res.status(200).send(AllData);
         }).catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });       
};
exports.show_public_notes = async(req,res,next) =>{
    try
    {
      let today1 = new Date();
      today1.setHours(0, 0, 0, 0);
      
      let i = 0 ;  
      const publicnotes = await PublicNote.findAll();
      const student = await Student.findByPk(req.userId)
      notes = await student.getSectionnotes();
      
      if(notes.length == 0 && publicnotes.length == 0){
        const error = new Error('you have no notes.');
        error.statusCode = 401;
        throw error;
      }
      else if(notes.length == 0)
      {
        //////deleting exp public notes
        let j = 0;
        while(publicnotes[j])
        {
          var midnightUTCDate = new Date( publicnotes[j].exp_date + 'T00:00:00Z');
          if(midnightUTCDate < today1)
          {
            await publicnotes[j].destroy();
            publicnotes.splice(j,1);
          }
          j++;
        }
        res.status(200).send(publicnotes);
      }
      else if(publicnotes.length == 0)
      {
        //////deleting exp section notes
        let k = 0;
        while(notes[k])
        {
          var midnightUTCDate = new Date( notes[k].exp_date + 'T00:00:00Z');
          if(midnightUTCDate < today1)
          {
            await notes[k].destroy();
            notes.splice(k,1);
          }
          k++;
        }
        res.status(200).send(notes);
      }
      else
      {
        //////deleting exp public notes
        let j = 0;
        while(publicnotes[j])
        {
          var midnightUTCDate = new Date( publicnotes[j].exp_date + 'T00:00:00Z');
          if(midnightUTCDate < today1)
          {
            await publicnotes[j].destroy();
            publicnotes.splice(j,1);
          }
          j++;
        }
    
        //////deleting exp section notes
        let k = 0;
        while(notes[k])
        {
          var midnightUTCDate = new Date( notes[k].exp_date + 'T00:00:00Z');
          if(midnightUTCDate < today1)
          {
            await notes[k].destroy();
            notes.splice(k,1);
          }
          k++;
        }
        while(notes[i]){
        element = {
          id:notes[i].id,
          title : notes[i].title,
          message : notes[i].message,
          exp_date : notes[i].exp_date   
        }
        await publicnotes.push(element);
        i++;
        }
        console.log("=22222222222222")
        res.status(200).send(publicnotes);
        }
    }
    catch (error) {
      console.log(error)
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  };
exports.show_private_notes = (req,res,next) =>{
  Student.findByPk(req.userId)
  .then(student =>{
    return student.getNotes();
  })
  .then(notes =>{
    if(notes.length == 0)
    {
      const error = new Error('you have no notes.');
      error.statusCode = 401;
      throw error;
    }
    res.status(200).send(notes);
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}
exports.show_marks = (req,res,next) =>{
   Student.findByPk(req.userId)
   .then(student =>{
       return student.getMarks();  
   })
   .then(marks =>{
      if(marks.length == 0)
      {
        const error = new Error('you have no marks.');
        error.statusCode = 401;
        throw error;
      }
      res.status(200).send(marks);
   })
   .catch(err =>{
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
   }); 
}
exports.getRanking = function(finalResult , myResult){
 var Bad = (finalResult*40)/100;
 var mid = finalResult/2;
 var Good = (finalResult*75)/100;
 if(myResult<Bad){
  return -5;
 }else if (myResult<mid) {
  return 4;
 }else if (myResult<Good){
  return 6;
 }
 return 8; 
}
exports.show_week_program = async (req,res,next)=>{
  try
  {
    const sec_id = req.params.section;
    array_weeks = await program.findAll({where : {
      sectionId : sec_id
    }});
    if(array_weeks.length == 0)
    {
      const error = new Error('you dont have a week program.');
      error.statusCode = 401;
      throw error; 
    }
    res.status(200).send(array_weeks);
  }
  catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
exports.see_limpidityie = (req,res,next) =>{
  Limpidityie.findOne({where : {studentId :req.userId}})
  .then(limpidityie =>{
    if(limpidityie.length == 0)
      {
        const error = new Error('you have no limpidityie.');
        error.statusCode = 401;
        throw error;
      }
      res.status(200).send(limpidityie);
  })
  .catch(err =>{
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
   }); 
}