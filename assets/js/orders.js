db.collection('orders').get().then((result) => {

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