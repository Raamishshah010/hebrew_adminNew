
let dimensionArr = []

function addDimension() {
    let height = document.getElementById('height').value;
    let width = document.getElementById('width').value;

    dimensionArr.push({
        height: height,
        width: width
    });

    $('#dimensionsData').html('')

    console.log(dimensionArr);

    for (let i = 0; i < dimensionArr.length; i++) {
        const element = dimensionArr[i];

        console.log(element);

        $('#dimensionsData').append(`
    <div class="pill">
    <small>Height: ${element.height}</small>
    <small>Width: ${element.width}</small>
    </div>
    `)

    }

}



let file = null;

var fileButton = document.getElementById('productImage');
fileButton.addEventListener('change', function (e) {

    file = e.target.files[0];


    $('#fileName').html(file.name);

});



let catName = '';
let catID = '';

db.collection('categoryCollection').get().then((result) => {
    let i = 0;
    result.forEach((category) => {


        $('#catList').append(`
        <button class="dropdown-item" id="catID${i}" >${category.data().name}</button>
        `)


        $(`#catID${i}`).on('click', (e) => {
            catName = category.data().name;
            catID = category.data().docID;


            $('#catNameText').html(catName)
        })


        i++;

    })



}).catch((err) => {
    window.alert(err.message);
});




function addProduct() {


    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;

    let description = document.getElementById('description').value;

    if (catName == "" || name === "" || price === "" || description === "" || dimensionArr <= 0) return window.alert('Please Fill All Fields');


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

                let prodRef = db.collection("productCollection").doc();

                let data = {
                    name,
                    catName,
                    catID,
                    price: parseInt(price),
                    description,
                    dimensionArr,
                    image: downloadURL,
                    docID: prodRef.id,
                    date: new Date()

                }

                prodRef.set(data).then(() => {
                    window.alert('Product Added Successfully')
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