var url="http://localhost:5000/todo/api/v1.0/mail"
var ins=0;
function send()
    {
            var data = {};
            data.name = document.getElementById("cont").value;
            data.mailid= document.getElementById("cont1").value;
            data.contact= document.getElementById("cont2").value;
            data.password = document.getElementById("cont3").value;
            data.insert=0;
            var json = JSON.stringify(data);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {
                var users = JSON.parse(xhr.responseText);
                var rec=JSON.parse(xhr.responseText);
                ins=rec['task']['insert'];
            if(ins==1)
            {
                alert('Registeration Complete');
            }
            else if(ins==0)
            {
                alert('User already exists');
            }
	        if (xhr.readyState == 4 && xhr.status == "201") {
		    console.table(users);
	        } else {
		    console.error(users);
	        }
            }

        xhr.send(json);
    }
    