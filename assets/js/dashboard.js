


db.collection('productCollection').orderBy('date', 'desc').get().then((result) => {

    $('#productCount').html(result.docs.length);
    result.forEach((product) => {
        // console.log(product.data());

        $('#productTable').append(`
        <tr>
            <td ><a class="mb-5" href="/product-details.html?id=${product.data().docID}" class="btn btn-theme">View</a></td>
            <td>...${product.data().description.slice(0, 26)}</td>
            <td>Height: ${product.data().dimensionArr[0].height} | Width: ${product.data().dimensionArr[0].width}</td>
            <td>$${product.data().price}</td>
            <td>
            <span class="mr-2">${product.data().name}</span>
            <img src="${product.data().image}" width="30px" height="30px" alt="image Product"/>
            </td>
        </tr>
        
        `)
    })
}).catch((err) => {
    window.alert(err.message);
});



db.collection("categoryCollection").orderBy('date', 'desc').get().then((result) => {

    $('#categoryCount').html(result.docs.length)

})


//! USERS

db.collection('users').orderBy('createdAt', 'desc').get().then((result) => {
    result.forEach((user) => {
        // console.log(user.data());

        $('#userTable').append(`
        <tr>
            <td><a href="/user-details.html?id=${user.data().userID}">View</a></td>
            <td>${user.data().phoneNumber}</td>
            <td>${user.data().email}</td>
            <td>${user.data().name}</td>
        </tr>
        `)
    })
}).catch((err) => {
    window.alert(err.message)
});


db.collection('chat').doc('kK9dAlv9f9N0EInWpIi3jlSp1EO2').collection('users').get().then((result) => {
    let i = 0;
    result.forEach((item) => {
        // console.log(item.data());

        $('#chatList').append(`
        <a href="/chat.html?id=${item.data().otherID}" class="chatList">
                                <div className="chatList_user">
                                    <h5 id="userDetails${i}"></h5>
                                    <p>${item.data().productName}</p>
                                </div>
                                <img id="userImage${i}" src="/assets/images/logo.svg" alt="">
                            </a>
        `);


        i++;

        db.collection('users').doc(item.data().otherID).get().then((result) => {
            console.log(result.data().profileImage);
            console.log(`#userDetails${(i - 1)}`);
            $(`#userDetails${(i - 1)}`).html(result.data().name)
            $(`#userImage${(i - 1)}`).attr('src', result.data().profileImage)

        }).catch((err) => {
            window.alert(err.message)
        });
    })
}).catch((err) => {
    window.alert(err.message)
});





//! ORDERS

db.collection('orders').get().then((result) => {
    $('#orderCount').html(result.docs.length)
}).catch((err) => {
    window.alert(err.message)
});

db.collection('orders').limit(10).get().then((result) => {

    let i = 0;
    result.forEach((item) => {

        let date = new Date(item.data().createdAt)

        $('#orders').append(`
        <tr>
        <td><a href="/order-details.html?id=${item.data().orderID}">View</a></td>
            <th id="checkStatus${i}"></th>
            <td>${date.toLocaleDateString()}</td>
            <td>₪${item.data().totalPrice}</td>
            <td>${item.data().products.length}</td>
        </tr>
        `);

        if (item.data().status === "pending") {
            $(`#checkStatus${i}`).append(`<span class="badge badge-danger">Pending</span>`)
        } else {
            $(`#checkStatus${i}`).append(`<span class="badge badge-success">Delivered</span>`)

        }

        i++;
    })
}).catch((err) => {
    window.alert(err.message)
});