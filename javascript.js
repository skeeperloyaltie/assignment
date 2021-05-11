<script>

 var id = document.getElementById('id');
 var firstName = document.getElementById('firstName');
var city=  document.getElementById('city');
var state=  document.getElementById('state');
var email=  document.getElementById('email');
 var lastName = document.getElementById('lastName');  
 var phone = document.getElementById('phone');
var results = document.getElementById('details'); 
 var db = openDatabase("MYDATABASE", "1.0", "MYDB", 4*1024*1024);
 var mydata;
 CreateTable(); 
      function ShowData(){
        results.innerHTML = '';
        db.transaction(function(tx) {
          tx.executeSql("SELECT * FROM Emp", [], function(tx, result) {
mydata = result.rows;
            for (var i = 0, item = null; i < mydata.length; i++) {
              item = mydata.item(i);
              results.innerHTML += 
                  '<b>First Name : </b>' + item['firstName'] + ' , '+'<b>Last Name :</b> ' + item['lastName'] +' , '+'<b>City : </b>' + item['city'] +' , '+'<b>State :</b>' + item['state'] +  ' , '+'<b>Phone: </b>' + item['phone'] +  ' , '+'<b>Email : </b>' + item['email'] +  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img height="20" width="20" src="Edit.jpg" onclick="LoadMyData('+i+')" />' +  
 '<img height="20" width="20" src="delete.jpg" onclick="deleteData('+item['id']+')" /><br/>';
}
          });
        });
      }
function CreateTable() { 
        db.transaction(function(tx) {
          tx.executeSql("CREATE TABLE IF NOT EXISTS Emp (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT,city TEXT,state TEXT, phone TEXT,email TEXT)");
        });
      }
       function ShowErrorMessage(tx, error) {
        alert(error.message);
      }
     
      
      
      function InsertData() {
var insertStatement = "INSERT INTO Emp (firstName, lastName,city,state,phone,email) VALUES (?, ?, ?,?,?,?)";
        db.transaction(function(tx) {
         
          tx.executeSql(insertStatement, [firstName.value, lastName.value,city.value,state.value,phone.value,email.value],showdatacleardata, ShowErrorMessage);
        });
      }
      
 function LoadMyData(i) {
var item = mydata.item(i); 
        firstName.value = item['firstName'];
lastName.value = item['lastName'];
city.value=item['city'];
state.value=item['state'];
phone.value = item['phone'];
email.value=item['email'];
id.value = item['id']; 
      }
      function UpdateData() {
 var updateStatement = "UPDATE Emp SET firstName = ?, lastName = ?,city=?,state=? ,phone = ?,email=? WHERE id = ?";
        db.transaction(function(tx) {

          tx.executeSql(updateStatement, [firstName.value, lastName.value,city.value,state.value,phone.value,email.value,id.value],showdatacleardata, ShowErrorMessage);
        }); 
      }
      
      function deleteData(id) {
 var deleteStatement = "DELETE FROM Emp WHERE id=?";
        db.transaction(function(tx) {
          tx.executeSql(deleteStatement, [id], ShowData(), ShowErrorMessage);
        });
ClearData();
      }
       
      

 function showdatacleardata(){
 ClearData();
 ShowData();
 }

 function ClearData(){
firstName.value = '';
lastName.value = '';
city.value='';
state.value='';
email.value='';
phone.value = '';
id.value = ''; 
 }
   
</script>
