let urlParam = new URLSearchParams(window.location.search);
let myParam = urlParam.get('id');




db.collection('productCollection').doc(myParam).get().then((result) => {
    console.log(result.data());

    $('#productDetails').append(`
    <div class="productImage"  style="position: relative;">
    <img data-toggle="modal" data-target="#exampleModal" src="/assets/images/edit.png" style="position: absolute; right: 4px; top: 10px; cursor: pointer;" width="20px" alt="">

        <img src="${result.data().image}" width="100%" alt="">
    </div>
    <div class="productInfo">
        <h6>${result.data().name}</h6>
        <p>$${result.data().price}</p>
        <p>${result.data().description}</p>
    </div>
    `)


    $('#name').val(result.data().name)
    $('#price').val(result.data().price)
    $('#description').val(result.data().description)



}).catch((err) => {
    window.alert(err.message)
});




function editProduct() {


    let updatedName = $('#name').val();
    let updatedPrice = $('#price').val();
    let updatedDescription = $('#description').val();

    if (updatedName === "" || updatedPrice === "" || updatedDescription === "") return window.alert("Please enter all fields");


    $('#subBtn').html('Please Wait....');
    $('#subBtn').addClass('disabled');

    db.collection('productCollection').doc(myParam).update({
        name: updatedName,
        price: parseInt(updatedPrice),
        description: updatedDescription
    }).then(() => {
        window.alert("Product updated successfully");
        window.location.href = '/product.html'

    }).catch((err) => {
        window.alert(err.message)
    });

}




function deleteProduct() {
    let confirm = window.confirm('Are you sure you want to delete this product?');

    if (confirm) {

        $('#deleteSubBtn').html('Please Wait....');
        $('#deleteSubBtn').addClass('disabled');

        db.collection('productCollection').doc(myParam).delete().then(() => {
            window.alert("Product deleted successfully");
            window.location.href = '/product.html'
        }).catch((err) => {
            window.alert(err.message)
        });
    } else {
        console.log('cancelled');
    }
}







let file = null;

var fileButton = document.getElementById('productImage');
fileButton.addEventListener('change', function (e) {

    file = e.target.files[0];


    $('#fileName').html(file.name);

});

function editImage() {

     if(file === null) return window.alert('Please Select An Image')


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


                db.collection('productCollection').doc(myParam).update({
                    image: downloadURL
                }).then(() => {
                    window.alert("Product updated successfully");
                    window.location.href = '/product.html'

                }).catch((err) => {
                    window.alert(err.message)
                });




            })
        })
}