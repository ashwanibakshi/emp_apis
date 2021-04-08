const employee      = require('../models/emp');
const employeeAdd   = require('../models/empAddress');


module.exports.showAll=(req,res)=>{
  employee.showAllEmp((err,empData)=>{
         if(err){
             res.json({err:err});
         }
         else{
             res.json({empdata:empData});
         }
  });
}

module.exports.addEmp=(req,res)=>{
      
    var emp = new employee({
          fname:req.body.fname,
          lname:req.body.lname,
          phno:parseInt(req.body.phno),
          dept:req.body.dept
     });
     var empAdd = new employeeAdd({
         empid:'',
         caddress:req.body.caddress,
         paddress:req.body.paddress,
         zipcode:parseInt(req.body.zipcode)
     });
     employee.addEmployee(emp,empAdd,(err,emp)=>{
         if(err){
             res.json({error:err.message});
         }
         else{
             res.json({msg:'employee added',employee:emp,add:empAdd});
         }
     });
}

module.exports.editEmp = (req,res)=>{
     employee.edit(req.params.id,(err,data)=>{
          if(err){
              res.json({err:err.message});
          }
          else{
              res.json({empdata:data});
          }
     });
}

module.exports.updateEmp = (req,res)=>{
      var emp={
          id:req.body.id,
          fname:req.body.fname,
          lname:req.body.lname,
          phno:req.body.phno,
          dept:req.body.dept
      }
      var empAddress={
          empid:req.body.id,
          caddress:req.body.caddress,
          paddress:req.body.paddress,
          zipcode:req.body.zipcode
      }
     employee.updateData(emp,empAddress,(err,data)=>{
         if(err){
             res.json({err:err});
         }
         else{
             res.json({msg:'data updated'});
         }
     });
}

module.exports.delete=(req,res)=>{
        employee.delEmp(req.params.id,(err,delData)=>{
            if(err){
                res.json({err:err});
            }
            else{
                res.json({msg:'empdata deleted'})
            }
        });
}

module.exports.filter=(req,res)=>{
      employee.zipFilter(req.params.zip,(err,empData)=>{
          if(err){
              res.json({err:err});
          }
          else{
              res.json({empdata:empData});
          }
      });
}