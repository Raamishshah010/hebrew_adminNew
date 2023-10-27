let urlParam = new URLSearchParams(window.location.search);
let myParam = urlParam.get('id');




db.collection('productCollection').doc(myParam).get().then((result) => {
    console.log(result.data());

    $('#productDetails').append(`
    <div class="productImage">
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
        window.location.reload();
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