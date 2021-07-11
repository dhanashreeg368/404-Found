var url="http://localhost:5000/todo/api/v1.0/type"
var val = 0,valp=0;
var typ=["Blood element analysis","Vitamin Profile","Thyroid Profile","Vitamin D","Vitamin B12","fCBC Test","TSH"]
var lis1=[]
var doc="1234";
function send1()
    {   
            var data = {};
            data.dist= "Skin";
            data.loc="Pune";
            data.lis=[];
                for(var i=0;i<7;i++)
                {
                    if(document.getElementById("ch"+String(i)).checked)
                    {
                        lis1.push(typ[i]);
                    }
                }
            localStorage.setItem("rt",lis1);
            data.typd=lis1;
            var json = JSON.stringify(data);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {
                var users = JSON.parse(xhr.responseText);
                var rec=JSON.parse(xhr.responseText);
                lis1=rec['task']['lis'];
	        if (xhr.readyState == 4 && xhr.status == "201") {
		    console.table(users);
	        } else {
		    console.error(users);
	        }
            }

        xhr.send(json);
    }
    function fn()
    {   
        a=document.createElement('div');
        a.classList.add("dropdown-content");
        a.id="dyn";
        document.getElementById("divm").appendChild(a);
        for(var i=0;i<lis1.length;i++)
        {
            a1=document.createElement('a');
            a1.href="C:/Users/Aditya/404-Found/confirmation.html";
            //a1.href="#";
            a1.dataset.doc=i;
            a1.onclick=function()
            {
                doc=lis1[this.dataset.doc][0];
                alert(doc);
                localStorage.setItem("doc",doc);
            }
            a1.id="ahr"+String(i);
            a1.classList.add("anchor");
            a2 = document.createTextNode(lis1[i][0]+" "+lis1[i][1]+" "+lis1[i][2]);
            document.getElementById("dyn").appendChild(a1);
            document.getElementById("ahr"+String(i)).appendChild(a2);
        }
        a=document.getElementById('mbutt');
        a.onclick="";
    }