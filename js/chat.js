var url="http://localhost:5000/todo/api/v1.0/chat"
    var val = [];
    count=0;
    var user="patient";
    function chat0()
    {   
            var data = {};
            mess = "NULL";
            data.message = mess;
            data.messages=[];
            if(user=="patient")
            {
                data.user = "patientid";
            }
            else if(user=="doctor")
            {
                data.user = "doctorid";
            }
            
            var json = JSON.stringify(data);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {
                var users = JSON.parse(xhr.responseText);
                var rec=JSON.parse(xhr.responseText);
                val=rec['task']['messages'];

            for(var i=0;i<val.length;i++)
            { 
            if(val[i][0]=='patientid')
            {   
                b1=document.createElement("p");
                b1.classList.add("container");
                b1.id="p"+String(i);
                b1.style="color:blue";
                document.getElementById('f1').appendChild(b1);
                count=count+1;
                document.getElementById("p"+String(i)).innerHTML =val[i][0]+": "+val[i][1];
            }
            else if(val[i][0]=='doctorid')
            {
                b1=document.createElement("p");
                b1.classList.add("container darker");
                b1.id=p+String(i);
                b1.style="color:red";
                document.getElementById('f1').appendChild(b1);
                document.getElementById("p"+String(i)).innerHTML =val[i][0]+": "+val[i][1];
                count=count+1;
            }
            }  
	        if (xhr.readyState == 4 && xhr.status == "201") {
		    console.table(users);
	        } else {
		    console.error(users);
	        }
        }
            
        xhr.send(json);
    }
function chat1()
{
    var data = {};
            mess = document.getElementById("i1").value;
            data.message = mess;
            data.messages=[];
            if(user=="patient")
            {
                data.user = "patientid";
            }
            else if(user=="doctor")
            {
                data.user = "doctorid";
            }
            
            var json = JSON.stringify(data);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {
                var users = JSON.parse(xhr.responseText);
                var rec=JSON.parse(xhr.responseText);
                val=rec['task']['messages'];

            for(var i=0;i<val.length;i++)
            { 
            if(val[i][0]=='patientid')
            {   
                b1=document.createElement("p");
                b1.classList.add("container");
                b1.id="p"+String(i);
                b1.style="color:blue";
                document.getElementById('f1').appendChild(b1);
                count=count+1;
                document.getElementById("p"+String(i)).innerHTML =val[i][0]+": "+val[i][1];
            }
            else if(val[i][0]=='doctorid')
            {
                b1=document.createElement("p");
                b1.classList.add("container darker");
                b1.id=p+String(i);
                b1.style="color:red";
                document.getElementById('f1').appendChild(b1);
                document.getElementById("p"+String(i)).innerHTML =val[i][0]+": "+val[i][1];
                count=count+1;
            }
            }  
	        if (xhr.readyState == 4 && xhr.status == "201") {
		    console.table(users);
	        } else {
		    console.error(users);
	        }
        }
            
        xhr.send(json);
}
function remove1()
    {
    var div = document.getElementById('f1');
    while(div.firstChild){
    div.removeChild(div.firstChild);
    }
    chat1();
}   