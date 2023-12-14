db.collection("categoryCollection").orderBy('date', 'desc').get().then((result) => {
result.forEach((category) => {
    console.log(category.data());



    $('#categoryTable').append(`
    <tr>
        <td><a href="/category-details.html?id=${category.data().docID}">View/Edit</a></td>
        <td>${category.data().date.toDate().toString().slice(0,15)}</td>
        <td>${category.data().name}</td>
        <td><img src="${category.data().image}" width="30px" height="30px"/></td>
    </tr>
    `)
})
}).catch((err) => {
    window.alert(err.message);
});

