let urlParam = new URLSearchParams(window.location.search);
let myParam = urlParam.get('id');

let userID;



db.collection('orders').doc(myParam).get().then((result) => {
    console.log(result.data());

    userID = result.data().orderBy;

    $('#orderDetails').append(`
    
    <p>Delivery Price: <strong>₪${result.data().deliveryFee}</strong></p>
    <p>Total Price: <strong>₪${result.data().totalPrice}</strong></p>
    <div style="margin-block: 40px; ">
                <div style="margin-bottom: 30px;">
                    <input class="px-2" type="number" id="adminDeliveryPrice" placeholder="Delivery Price"/>
                </div>
                <div>
                    <input class="px-2" type="number" id="adminTotalPrice" placeholder="Total Price"/>
                </div>
            
            </div>
    <p>Status : <span id="orderStatus"></span></p>

    <button class="btn btn-theme" id="deliverBtn" onclick="changeStatus()">Deliver</button>
    `)


    if(result.data().status === 'pending'){
        $('#orderStatus').append(`
        <span class="badge badge-danger">Pending</span>
        `)

        $('#deliverBtn').html('Click To Deliver')
    }else{
        $('#orderStatus').append(`
        <span class="badge badge-success">Delivered</span>
        `)

        $('#deliverBtn').html('Order Is Delivered')
        $('#deliverBtn').addClass('disabled')

    }





    let i = 0;
    result.data().products.forEach((item) => {

        console.log(item);
        $('#items').append(`
        <div class="productDetails" id="productDetails">
        <div class="productImage">
            <img src="${item.productData.image}" width="100%" alt="">
        </div>
        <div class="productInfo">
            <h6>${item.productData.name}</h6>
            <p>₪${item.productData.price}</p>
            <p>Shipment Price: ₪${item.productData.shipmentPrice}</p>
            <p>Quantity: ${item.quantity}</p>
            
            <p>Requested Note: <span id="requestedNote${i}"></span></p>
        </div>
    </div>

    <hr/>
        `)

        if (item.customRequest) {
            
            $(`#requestedNote${i}`).append(item.requestNote)
        }else{
            $(`#requestedNote${i}`).append('No Requested Note')

        }

        i++;
    })

})
    .then(() => {
        db.collection('users').doc(userID).get().then((result) => {
            console.log(result.data());
            $('#userDetails').append(`
            <div class="userImage">
                <img src="${result.data().profileImage}" alt="">
            </div>
            <div class="userInfo">
                <h5>${result.data().name}</h5>
                <p>${result.data().email}</p>
            </div>
            
            `)
        }).catch((err) => {
            window.alert(err.message)
        });
    })
    .catch((err) => {
        window.alert(err.message)
    });




    function changeStatus(){


        let adminTotalPrice = document.getElementById('adminTotalPrice').value;
        let adminDeliveryPrice = document.getElementById('adminDeliveryPrice').value;

        if (adminTotalPrice === "" || adminDeliveryPrice === "") return window.alert('Please Enter Admin Total And Delivery Price')

        db.collection('orders').doc(myParam).update({
            status: "delivered",
            adminTotalPrice,
            adminDeliveryPrice

        }).then(() => { 
            window.alert('Order Updated Successfully');
            window.location.reload()
        }).catch((err) => {
            window.alert(err.message)
        });

    }