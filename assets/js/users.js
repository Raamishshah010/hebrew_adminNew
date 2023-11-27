db.collection('users').get().then((result) => {
    let i = 0;


    result.forEach((item) => {

        $('#users').append(`
        
        <tr>
            <th scope="row"><img id="profileImage${i}" src="${item.data().profileImage}" width="40px"/></th>
            <td>${item.data().name}</td>
            <td>${item.data().email}</td>
            <td>${item.data().phoneNumber}</td>
            <td>${item.data().companyName}</td>
        </tr>
        
        `);

        if (item.data().profileImage === "") {
            $(`#profileImage${i}`).attr('src' , '/assets/images/logo.svg')
        }

        i++;
    })
}).catch((err) => {
    window.alert(err.message)
});