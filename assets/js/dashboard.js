


db.collection('productCollection').orderBy('date', 'desc').get().then((result) => {

    $('#productCount').html(result.docs.length);
    result.forEach((product) => {
        console.log(product.data());

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
        console.log(user.data());

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
