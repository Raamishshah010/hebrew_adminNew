


db.collection('productCollection').orderBy('date', 'desc').get().then((result) => {
    result.forEach((product) => {
        console.log(product.data());

        $('#productTable').append(`
        <tr>
            <td ><a class="mb-5" href="/product-details.html?id=${product.data().docID}" class="btn btn-theme">View</a></td>
            <td>...${product.data().description.slice(0,26)}</td>
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