document.getElementById('pid').innerHTML=String(localStorage.getItem("patient"));
document.getElementById('did').innerHTML=String(localStorage.getItem("doc"));
document.getElementById('mid').innerHTML="Skin";
a=localStorage.getItem("rt");
str="";
for(var i=0;i<a.length;i++)
{
    str=str+String(a[i]);
}
document.getElementById('rid').innerHTML=str;
const myImages = [];
function addImage(imageBlob) {
  myImages.push(imageBlob);
}

function redrawImages() {
  const divForImages = document.getElementById('myImages');
  divForImages.innerHTML = '';
  myImages.forEach((imageBlob) => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(imageBlob);
    divForImages.appendChild(img);
  });
}

function addImageAndRedraw() {
  const fileInput = document.getElementById('FILE');
  if (fileInput.files.length === 1) {
    addImage(fileInput.files[0]);
    redrawImages();
  } else {
    alert('No file selected. Select a file and try again.');
  }
}


var url="http://localhost:5000/todo/api/v1.0/img";
var ins = 0;
function sendimg()
    {   
        if(myImages.length!=0)
        {
            var data = {};
            data.pid=String(localStorage.getItem("patient"));
            data.did=String(localStorage.getItem("doc"));
            data.lis=myImages[0];
            data.insert=0;
            var json = JSON.stringify(data);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {
                var users = JSON.parse(xhr.responseText);
                var rec=JSON.parse(xhr.responseText);
                ins=rec['task']['insert'];
            if(ins==0)
            {
                alert("Not inserted");
            }
            else if(ins==1)
            {
                alert("Inserted");
            }
	        if (xhr.readyState == 4 && xhr.status == "201") {
		    console.table(users);
	        } else {
		    console.error(users);
	        }
            }

        xhr.send(json);
        }
    }
    const button = document.getElementById('buut');
    button.addEventListener('click', addImageAndRedraw);