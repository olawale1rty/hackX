let applicont = document.querySelector('#appliContainer');
const headers = {
    'Content-Type': 'application/json',
    'Authorization': "Bearer" + ' ' + localStorage.getItem("pass"),
    'withCredentials': true, 
  }
  let userNameArr = [];
 let usersId = [];
 let gotten = true;
 const getUserDetails = () => {
  console.log('bull shit 4 bull eye');
}

axios.get("https://hackxbackend.herokuapp.com/alluser" , { headers: headers })
.then((response) => {
  var doc = response.data.doc;
  console.log(doc);
  var id = 0;
  var demId = "";
  let newCont = () => {
    console.log(id);
    let dateCreated = doc[i].createdAt;
    let editedDate = moment(new Date(dateCreated)).format('YYYY-MM-DD');
    let newPane = 
    `<div class="submission-detail">
        <div class="column-one">
            <div class="real-submission">
                <h5 class="submission-tag">Application ${id}</h5>
                <h5 class="participant-name">${doc[i].firstname + " "} ${doc[i].lastname}</h5>
            </div>
        </div>
        <div class="col" style="display: flex; flex-direction: column;">
        <h5 class="time">${editedDate}</h5>
        <button style="font-weight: bold"  id= ${demId}>View</button>
    </div>
    <hr class="submission-hr"></hr>`;
    applicont.innerHTML += newPane;
    userNameArr.push(doc[i].username);
  }
  for(var i = doc.length - 1; i > -1; i--) {
    id++;
    demId = `${"pane" + i}`;
    newCont();
    console.log(doc[i].username);
    usersId.push(window['pane'+i]);
  }
  console.log(userNameArr);
  localStorage.setItem('usernameArray', userNameArr);
  console.log(usersId);
  for (var i=0; i<usersId.length; i++) {
    usersId[i].addEventListener('click', getUserDetails());
  }
})
.catch((error) => console.error(error));

const deleteUser = () => {
  axios.get("https://hackxbackend.herokuapp.com/deleteuser?username?" + username , { headers: headers })
  .then((response) => {
    if(response.data == "olax has been deleted.");
    console.log('successfully deleted');
  })
  .catch((error) => console.error(error));
}



