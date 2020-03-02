const products = [
    {id: 1, title: 'Notebook', price: 2000, img:'img/pic_1.jpg'},
    {id: 2, title: 'Mouse', price: 20, img:'img/pic_1.jpg"'},
    {id: 3, title: 'Keyboard', price: 200, img:'img/pic_1.jpg'},
    {id: 4, title: 'Gamepad', price: 50, img:'img/pic_1.jpg'},
];
const [a,b,c,d]= products;
//console.log(a.title);
const renderProduct = (id = a.id, title = a.title, price = a.price, img = a.img) => {
    return document.querySelector('.products').innerHTML += `<div class="product-item" id='${id}'>
                <img src="${img}">
                <h3>${title}</h3>
                <p>${price}$</p>
                <button class="buy-btn">B U Y</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.id, item.title, item.price, item.img));
//    console.log(productsList);
//    let i = 0;  
//    productsList.forEach(el =>{             
//        document.querySelector('.products').innerHTML += productsList[i];
//         i++;
//    });
};

renderPage(products);