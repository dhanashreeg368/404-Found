    var url="http://localhost:5000/todo/api/v1.0/mail";
    var ins=0;
    var dis=['Skin','Fever'];
    var typ=[['a','b'],['c','d','e']];
    var typ1=[];
    var count=0;
    function send()
    {
            var data = {};
            data.name = document.getElementById("cont").value;
            data.mailid= document.getElementById("cont1").value;
            data.contact= document.getElementById("cont2").value;
            d=document.getElementById("cont3");
            data.qual=d.options[d.selectedIndex].value;
            d=document.getElementById("cont4");
            data.dist=d.options[d.selectedIndex].value;
            d=document.getElementById("cont6");
            data.gender=d.options[d.selectedIndex].value;
            d=document.getElementById("cont7");
            data.language=d.options[d.selectedIndex].value;
            data.hosp = document.getElementById("cont8").value;
            data.password = document.getElementById("cont5").value;
            data.insert=0;
            for(var i=0;i<typ[count].length;i++)
            {
                if(document.getElementById("rad"+String(i)).checked)
                {
                    typ1.push(typ[count][i]);
                }
            }
            data.typd=typ1;
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
    function type1()
    {
        d=document.getElementById("cont4");
        t=d.options[d.selectedIndex].value;
        
        for(var i=0;i<dis.length;i++)
        {
            if(t==dis[i])
            {
                count=i;
                break;
            }
        }
        
        for(var i=0;i<typ[count].length;i++)
        {
            a1=document.createElement("input");
            a1.type="radio";
            a1.id="rad"+String(i);
            document.getElementById('f1').appendChild(a1);
            a1=document.createElement("text");
            a1.id="tx"+String(i);
            document.getElementById('f1').appendChild(a1);
            document.getElementById("tx"+String(i)).innerHTML =typ[count][i]+"<br>";
        }
    }
    function remove1()
    {
    var div = document.getElementById('f1');
    while(div.firstChild){
    div.removeChild(div.firstChild);
    }
}   
