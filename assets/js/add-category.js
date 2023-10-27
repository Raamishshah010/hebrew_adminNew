let file = null;

var fileButton = document.getElementById('categoryImage');
fileButton.addEventListener('change', function (e) {

    file = e.target.files[0];


    $('#fileName').html(file.name);

});




function addCategory(){
    
    let name = document.getElementById('categoryName').value;

    if (name == "" || file == null) return window.alert("Please enter all fields");
        
    $('#subBtn').html('Please Wait....');
    $('#subBtn').addClass('disabled');

    var storageRef = firebase.storage().ref('images/CategoryImg' + Date.now());

    var uploadTask = storageRef.put(file);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            $('#progressBar').html(`Uploaded ${progress}%`);
            console.log('Upload is ' + progress + '% done');
            console.log(snapshot.state)
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // Handle unsuccessful uploads
            console.log(error)
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);

                let catRef = db.collection("categoryCollection").doc();

                let data = {
                    name,
                    image : downloadURL,
                    docID : catRef.id,
                    date : new Date()
                    
                }

                catRef.set(data).then(() => {
                    window.alert('Category Added Successfully')
                    window.location.reload();
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    console.log(errorMessage);
                    window.alert(errorMessage)
                });
            })
        })

}