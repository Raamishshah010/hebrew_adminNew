let myID = "kK9dAlv9f9N0EInWpIi3jlSp1EO2"

let urlParam  = new URLSearchParams(window.location.search);
let myParam = urlParam.get('id');

console.log(myParam);



let userName = "";
let profileImage = "";

db.collection('users').doc(myParam).get().then((result) => {
    
    userName = result.data().name;
    profileImage = result.data().profileImage;


    $('#userDetails').append(`
    <h5>${userName}</h5>
    <img src="${profileImage}" alt="">
    `)
}).catch((err) => {
    window.alert(err.message)
});



//! FETCHING ALL MESSAGES
const messages = [];

db.collection('chat')
  .doc(myID)
  .collection('users')
  .doc(myParam)
  .collection('messages')
  .orderBy('time', 'desc')
  .get()
  .then((result) => {
    result.forEach((item) => {
      if (item.exists) {
        // Check if the item is a valid document
        messages.push(item.data());
      }
    });

    // After retrieving all messages, append them to the UI
    appendMessagesToUI(messages);
  })
  .then(() =>{

$(document).ready(function() {
    // This code will be executed when the page is fully loaded
    scrollToBottom();
});

function scrollToBottom() {
    // Scroll to the bottom of the chat container
    const chatContainer = $('#allChats');
    chatContainer.scrollTop(chatContainer[0].scrollHeight);
}
})



function appendMessagesToUI(messages) {
    // Sort the messages in ascending order based on their 'time' field
    messages.sort((a, b) => a.time - b.time);
  
    // Append the sorted messages to the UI
    messages.forEach((item) => {
        if (item.sendTo === myID) {
            $('#allChats').append(`
            <div class="chatSender">
                        <div class="chatSenderImage">
                            <img src="${profileImage}" alt="">

                        </div>
                        <div class="chatSenderMessage">
                            <h5>${userName}</h5>
                            <div class="chatSenderMessageText">

                            <p>${item.message}</p>

                            </div>
                        </div>
                        
                    </div>
            `)
        }else{
            $('#allChats').append(`
            <div class="chatReciever">
                       
                        <div class="chatRecieverMessage">
                            <h5>Admin</h5>
                            <div class="chatRecieverMessageText">

                                <p>${item.message}</p>
                            </div>
                        </div>

                        <div class="chatRecieverImage">
                            <img src="/assets/images/logo.svg" alt="">

                        </div>
                        
                    </div>
            `)
        }
    });
  }

  
  
  
  
  
  



function sendMessage(){

    let message = document.getElementById('message').value;


    if(message === "") return window.alert('Please type a message!');


    let date = new Date().getTime()

    console.log(date);
    let chatRef = db.collection('chat').doc(myID).collection('users').doc(myParam).collection('messages').doc(date.toString());
    
    
    let data = {
        message,
        messageType: "Text",
        sendFrom: myID,
        sendTo: myParam,
        time: date
    }

    chatRef.set(data).then(() => {
        
        window.location.reload()
    }).catch((err) => {
        window.alert(err.message)
    });


}



