var url="http://localhost:5000/todo/api/v1.0/mail"
var val = 0,valp=0;
var typ=["a","b","c","d","e","f"]

var lis=[]
function send()
    {   
            var data = {};
            data.dist= "Skin";
            data.valid=0;
            data.validp=0;
            alert(document.getElementById("ch2").checked);
                for(var i=0;i<7;i++)
                {
                    if(document.getElementById("ch"+String(i)).checked)
                    {
                        lis.push(typ[i]);
                    }
                }
            alert(lis);
            var json = JSON.stringify(data);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {
                var users = JSON.parse(xhr.responseText);
                var rec=JSON.parse(xhr.responseText);
                val=rec['task']['valid'];
                valp=rec['task']['validp'];
                
    
            data.typd=lis
	        if (xhr.readyState == 4 && xhr.status == "201") {
		    console.table(users);
	        } else {
		    console.error(users);
	        }
            }

        xhr.send(json);
    }
    