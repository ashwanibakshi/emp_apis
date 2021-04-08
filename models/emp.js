const mongoose      = require('mongoose');
const employeeAdd   = require('./empAddress');
const ObjectId = mongoose.Types.ObjectId;

const employee = new mongoose.Schema({
 fname : {
     type:String,
    required:true
 },
lname:{
    type:String,
    required:true
},
 phno:{
     type:Number,
     required:true,
     unique:true
 },
 dept:{
     type:String,
     required:true
  }
 });

var addEmp = module.exports = mongoose.model('employees',employee);


 module.exports.showAllEmp=(fn)=>{
     try {
         addEmp.aggregate([
            {
                "$lookup":{
                    "from":"empaddresses",
                    "localField": "_id",
                    "foreignField": "empid",
                    "as": "empdetails"
                }
            }
         ],(err,empData)=>{
              if(err){
                  fn(err,null);
              }
              else{
                  fn(null,empData);
              }
         });
     } catch (error) {
         fn(error,null);
     }
 }

 module.exports.addEmployee=(empp,empAdd,fn)=>{
     try {
        empp.save((err,newemp)=>{
            if(err){
                fn(err,null);
            }
            else{
                empAdd.empid= newemp._id;
                empAdd.save((err,empAd)=>{
                    if(err){
                        fn(err,null);
                    }
                    else{
                        fn(null,newemp,empAd);
                    }
                });
            }
         });
     } catch (error) {
         fn(error,null);
     }
 }

 module.exports.edit= (id,fn)=>{
     try {
  
         addEmp.aggregate([
             {"$match":{"_id":mongoose.Types.ObjectId(id)}},
            {"$lookup": {
                "from":"empaddresses",
                "localField": "_id",
                "foreignField": "empid",
                "as": "empdetails"
            }
         }],(err,data)=>{
            if(err){
                fn(err,null);
            }
            else{
                fn(null,data);
            };
       });
     } catch (error) {
         fn(error,null);
     }
 }

 module.exports.updateData = (emp,empAdd,fn)=>{
       try {
           addEmp.update({_id:emp.id},{$set:emp},(err,empData)=>{
              if(err){
                  fn(err,null);
              }
              else{
               employeeAdd.update({empid:empAdd.empid},{$set:empAdd},(err,empAddData)=>{
                  if(err){
                      fn(err,null);
                  }
                  else{
                      fn(null,empData,empAddData);
                  }
               });
              }
           });
       } catch (error) {
           fn(error,null);
       }
 }

 module.exports.delEmp=(id,fn)=>{
        try {
            addEmp.deleteOne({_id:id},(err,empdel)=>{
                 if(err){
                     fn(err,null);
                 }
                 else{
                     employeeAdd.deleteOne({empid:id},(err,empAddDel)=>{
                          if(err){
                              fn(err,null);
                          }
                          else{
                              fn(null,empdel,empAddDel);
                          }
                     });
                 }
            });
        } catch (error) {
            fn(error,null);
        }
 }

 module.exports.zipFilter = (zipcode,fn)=>{
     try {
         employeeAdd.aggregate([
             {"$match":{"zipcode":parseInt(zipcode)}},
             {"$lookup":{
                "from":"employees",
                "localField": "empid",
                "foreignField": "_id",
                "as": "empdetails"  
             }
            }
         ],(err,empdata)=>{
              if(err){
                  fn(err,null);
              }
              else{
                  fn(null,empdata);
              }
         });
     } catch (error) {
         fn(error,null);
     }
 }