var http = require('http');
var mysql = require('mysql');
var CRUD = require('mysql-crud');

var connection = mysql.createPool({
    database : 'student',
    user     :  'root',
    password :  '',
    host     :  'localhost'
});

var studentCRUD = CRUD(connection, 'student');

exports.student = function(req, res){
        console.log(req.body);
        studentCRUD.create({
            'name':req.body.name,
            'age':req.body.age,
            'address':req.body.address,
            'dob':req.body.dob
           
            
            
        }, function(err, val){
            if(err){
                console.log(err);
            }else{
                res.jsonp(val);
                console.log('added');
            }
        });
    };

    exports.allstudent = function(req, res){
        studentCRUD.load({
        }, function(err, val){
            if(err){
                console.log(err);
            }else{
                res.jsonp(val);
            }
        });
    };

exports.updateStudent = function(req, res) {
     var id=req.params.id;
    console.log(req.body);
    studentCRUD.update({'id':id},{
        'name':req.body.name,
        'age':req.body.age,
        'address':req.body.address,
        'dob':req.body.dob
        
    }, function(err, val){
        if(parseInt(val.affectedRows)>0){
        var resdata={status:true,
            message:'Student successfully updated'};
	  	res.jsonp(resdata);
	  	}else{
	  		 var resdata={status:false,
  		      message:'record not updated'};
	  	      res.jsonp(resdata);
	  	     }
      });
   };

   exports.studentdetail = function(req, res) {
    var id=parseInt(req.params.id);
      studentCRUD.load({id:id}, function (err, val) { 
        res.jsonp(val[0]);
      });  
   }; 

exports.deleteStudent = function(req, res){
    var student_id = parseInt(req.params.id);
    studentCRUD.destroy({'id':student_id}, function(err, vals){
        console.log(vals.affectedRows);
        if(parseInt(vals.affectedRows)>0){
            var resdata = {status:true,
            message:'Student List Successfully Deleted'};
            res.jsonp(resdata);
        }else{
            var resdata = {status:false,
            message:'record not found'};
            res.jsonp(resdata);
        }
    });
};
