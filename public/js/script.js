document.getElementById("myForm").onsubmit= (e)=>{
    e.preventDefault();

    const url="http://localhost:8080/sent-data";

    //console.log(e.target[0].value);
    var data = { name: e.target[0].value };

    fetch(url, {
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        location.reload();
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function deleteme(item)
{
    var url="http://localhost:8080/remove/"+item.innerText;
    fetch(url,{
        method:'delete',
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log("Message :",data);
        location.reload();
    })
    .catch((error) => {
    console.error('Error:', error);
    });

}