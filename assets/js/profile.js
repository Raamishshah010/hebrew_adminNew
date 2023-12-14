


db.collection('admin').doc('kK9dAlv9f9N0EInWpIi3jlSp1EO2').get().then((result) => {

    console.log(result.data());

    $('#adminProfile').append(`
    <div class="productImage" style="position: relative;">
        <img data-toggle="modal" data-target="#exampleModal" src="/assets/images/edit.png" style="position: absolute; right: 4px; top: 10px; cursor: pointer;" width="20px" alt="">
        <img src="${result.data().image}" style="width: 120px; height: 120px; border-radius: 50%; " alt="">
    </div>
    <div class="productInfo">
        <h6>${result.data().name}</h6>
        <p>${result.data().email}</p>
                                        
    </div>
    `)

    $('#name').val(result.data().name)


}).catch((err) => {
    window.alert(err.message)
});




function editName() {
    let updatedName = $('#name').val();

    if (updatedName === "") return window.alert('Please Write A Name')

    db.collection('admin').doc('kK9dAlv9f9N0EInWpIi3jlSp1EO2').update({
        name: updatedName
    }).then(() => {
        window.alert('Updated Successfully');
        window.location.reload()
    }).catch((err) => {
        window.alert(err.message)
    });
}





let file = null;

var fileButton = document.getElementById('productImage');
fileButton.addEventListener('change', function (e) {

    file = e.target.files[0];


    $('#fileName').html(file.name);

});

function editImage() {

    if (file === null) return window.alert('Please Select An Image')


    $('#editImageBtn').html('Please Wait....');
    $('#editImageBtn').addClass('disabled');

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


                db.collection('admin').doc('kK9dAlv9f9N0EInWpIi3jlSp1EO2').update({
                    image: downloadURL
                }).then(() => {
                    window.alert("Profile Image updated successfully");
                    window.location.reload()

                }).catch((err) => {
                    window.alert(err.message)
                });




            })
        })
}




function changePass() {

    let newPassword = document.getElementById('password').value;

    if (newPassword === "") return window.alert('Please Write A New Password')

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "uid": "kK9dAlv9f9N0EInWpIi3jlSp1EO2",
        "newPassword": newPassword
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://malicious-doll-production.up.railway.app/change-pass", requestOptions)
        .then(response => response.json())
        .then(result => {
            window.alert(result.message);
            window.location.reload();
        })
        .catch(error => console.log('error', error));
}