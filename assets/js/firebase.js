const firebaseConfig = {
    apiKey: "AIzaSyCMhQ3tieLEf222V2NOzdaj1zlUOqULimA",
    authDomain: "hebrow-ec2a4.firebaseapp.com",
    projectId: "hebrow-ec2a4",
    storageBucket: "hebrow-ec2a4.appspot.com",
    messagingSenderId: "613498408030",
    appId: "1:613498408030:web:80b61721ac4f6ce55038cf"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


let db = firebase.firestore();


function logout(){
    window.location.href = '/index.html'
}