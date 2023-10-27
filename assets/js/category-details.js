let urlParam = new URLSearchParams(window.location.search);
let myParam = urlParam.get('id');



db.collection('categoryCollection').doc(myParam).get().then((result) => {
    console.log(result.data());

    $('#catImage').attr('src', result.data().image);
    $('#categoryName').val(result.data().name);

}).catch((err) => {
    window.alert(err.message)
});


let file = null;

var fileButton = document.getElementById('categoryImage');
fileButton.addEventListener('change', function (e) {

    file = e.target.files[0];


    $('#fileName').html(file.name);

});


function editCategory() {

    let updatedName = $('#categoryName').val();

    if (file === null) {
        $('#subBtn').html('Please Wait....');
        $('#subBtn').addClass('disabled');


        db.collection('categoryCollection').doc(myParam).update({
            name: updatedName
        }).then(() => {
            window.alert('Updated Successfully');
            window.location.reload();
        }).catch((err) => {
            window.alert(err.message);
        });

    } else {
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

                    db.collection('categoryCollection').doc(myParam).update({
                        image: downloadURL
                    }).then(() => {
                        window.alert('Updated Successfully');
                        window.location.reload();
                    }).catch((err) => {
                        window.alert(err.message);
                    });
                })
            })
    }
}




function deleteCategory() {


    let confirm = window.confirm('Are you sure you want to delete this category?');

    if (confirm) {
        $('#deletesubBtn').html('Please Wait....');
        $('#deletesubBtn').addClass('disabled');
        db.collection('categoryCollection').doc(myParam).delete().then(() => {
            window.alert('Deleted Successfully');
            window.location.href = '/category.html';
        }).catch((err) => {
            window.alert(err.message);
        });
    } else {
        console.log('cancelled');
    }


}