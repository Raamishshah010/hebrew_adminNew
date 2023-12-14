let urlParam = new URLSearchParams(window.location.search);
let myParam = urlParam.get('id');


console.log(myParam);


db.collection('users').doc(myParam).get().then((result) => {
    console.log(result.data());

    let date = new Date(result.data().createdAt)

    $("#userDetails").append(`
    <div class="productImage" style="position: relative;">
                                        <img src="" id="userImage" width="100%" alt="">
                                    </div>
                                    <div class="productInfo">
                                        <h6>${result.data().name}</h6>
                                        <p>${result.data().email}</p>
                                        <p>${result.data().phoneNumber}: מספר טלפון </p>
                                        <p>${result.data().companyName}: שם החברה </p>
                                        <p>${ date.toString().slice(0,15)}: הצטרף ב- </p>
                                        <p></p>
                                    </div>
    `)


    if(result.data().profileImage === ""){
        $('#userImage').attr('src', '/assets/images/logo.svg')
    }else{
        $('#userImage').attr('src', result.data().profileImage)

    }

}).catch((err) => {
    window.alert(err.message)
}); 