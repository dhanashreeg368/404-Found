var url="http://localhost:5000/todo/api/v1.0/mail";
var val = 0,valp=0;
function send()
    {   
            var data = {};
            data.mailid= document.getElementById("cont1").value;
            data.password = document.getElementById("cont2").value;
            data.valid=0;
            data.validp=0;
            var json = JSON.stringify(data);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {
                var users = JSON.parse(xhr.responseText);
                var rec=JSON.parse(xhr.responseText);
                val=rec['task']['valid'];
                valp=rec['task']['validp'];
            if(val==0)
            {
                alert("Wrong User Name");
            }
            else if(valp==0)
            {
                alert("Wrong Password");
            }
            else
            {
                alert("Correct Login");
            }
	        if (xhr.readyState == 4 && xhr.status == "201") {
		    console.table(users);
	        } else {
		    console.error(users);
	        }
            }

        xhr.send(json);
    }
