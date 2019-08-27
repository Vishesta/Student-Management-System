var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope, $http,$location,$window) {

   
    $scope.user = function(info) {
        $http.post('http://localhost:7000/api/'+'student',info).then(successCallback, errorCallback);

        function successCallback(response){
            console.log(info)
        }
        function errorCallback(error){
            
        }
     };
     
    $scope.redirect=function(){
        window.location.href="index.html"
    }
    
    
     $scope.allUsers=function(){
         $http.get('http://localhost:7000/api/'+'allstudent').then(successCallback, errorCallback);

         function successCallback(response){
             $scope.users=response.data;
             console.log( $scope.users);
         }
         function errorCallback(error){
             
         }
     };
      
     $scope.editUser=function(id){
         window.localStorage.setItem('id',id);
         $window.location.href="/edit.html"
     }
     $scope.students=function(info){
        var id=window.localStorage.getItem('id');
        $http.post('http://localhost:7000/api/'+'studentUpdate/'+id,info).then(successCallback, errorCallback);

        function successCallback(response){

        }
        function errorCallback(error){
            
        }
    }
    $scope.editId = function() {
        var id=window.localStorage.getItem('id');
        $http.get('http://localhost:7000/api/'+'studentDetail/'+id).then(successCallback, errorCallback);

        function successCallback(response){
            $scope.userinfo=response.data;
            console.log($scope.userinfo);
        }
        function errorCallback(error){
            console.log(error);
            
        }

    };
    
     $scope.deleteUser=function(id){
       $http.get('http://localhost:7000/api/'+'deleteStudents/'+id).then(successCallback, errorCallback);

       function successCallback(response){
           $scope.deleteId=response.data;
            alert("User has deleted Successfully"); 
            console.log($scope.deleteId);
       }
       function errorCallback(error){
           console.log(error);
       }
   }
     

    

});
   
  
 
    
