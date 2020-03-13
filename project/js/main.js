const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getRequest = (url, cb) => {
    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();
        // window.ActiveXObject -> xhr = new ActiveXObject()
        xhr.open("GET", url, true);
        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject(console.log('Error'));
                } else {
                    resolve(xhr.responseText);
                }
            }

        };
        xhr.send();
    });
}

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = []; //массив товаров
        this.allProducts = []; //массив объектов
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render()
            });
    }
    //    _fetchProducts(cb) {
    //        getRequest(`${API}/catalogData.json`, (data) => {
    //            this.goods = JSON.parse(data);
    //            console.log(this.goods);
    //            cb();
    //        })
    //    }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());

        }
        
        
    }
}


class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;

    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">  
                    <h3>${this.title}</h3>
                    <p>${this.price} p.</p>
                    <button class="buy-btn" id="buy_${this.id}">Купить</button>
            </div>`
    }

}
let list = new ProductsList();

class basket {
    constructor(container = '.addBasket') {
        this.container = container;

        this._getProdBasket()
            .then(data => {
//                console.log(data);
                this.contents = [...data.contents];
                this.render()
            })
    }

    _getProdBasket() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    

    render() {
        const block = document.querySelector(this.container);
        let i =0;
        for (let product of this.contents) {
            let productObj = new addProduct(product);
            block.innerHTML += productObj.render();
            let button = document.getElementById(`buy_${this.contents[i].id_product}`).onclick = function(){
                console.log(event);
                
                
            };
            i++;
        }
        
        
    }
}

class addProduct {
    constructor(product) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.quantity = product.quantity;

    }
    render() {
        return `<div class="addProduct" data-id="${this.id}"> 
                    <h3>${this.title}</h3>
                    <h4>${this.price}p.</h4>
                    <p>${this.quantity}шт.</p>
                </div>`
    }
}



let cart = new basket();





//let button = document.querySelector('.btn-cart').onclick = function(event){console.log(event)};









//console.log(list.calcSum());
//class basket{}
//class prodInBasket{}
//
//
//class ProductsList{
//    constructor(container = '.products'){
//        this.container = container;
//        this.goods = [];
//        this.allProducts = [];
//        this._fetchProducts();
//    } 
//    
//    _fetchProducts(){
//        this.goods = [
//            {id: 1, title: 'Notebook', price: 2000},
//            {id: 2, title: 'Mouse', price: 20},
//            {id: 3, title: 'Keyboard', price: 200},
//            {id: 4, title: 'Gamepad', price: 50},
//        ];
//    }
//    render() {
//        const block = document.querySelector(this.container);
//        for(let product of this.goods){
//            const productObj = new ProductItem(product);
//            this.allProducts.push(productObj);
//            block.insertAdjacentHTML('beforeend',productObj.render())
//        }
//    }
//    sum() {
//        let sum = 0;
//        let i = 0;
//        for(let product of this.goods){
//            sum += this.goods[i].price;
//            i++;
//        }
//        return (`Total price: ${sum}$`);
//    }
//    
//}
//
//class ProductItem{
//	constructor(product, img = 'https://placehold.it/200x150'){
//		this.title = product.title;
//		this.price = product.price;
//		this.id = product.id;
//		this.img = img;
//		
//	}
//	
//	render(){
//		 return `<div class="product-item" data-id="${this.id}">
//                <img src="${this.img}" alt="Some img">
//                <h3>${this.title}</h3>
//                <p>${this.price}</p>
//                <button class="buy-btn">BUY</button>
//            </div>`
//	}
//}
//
//let list = new ProductsList();
//list.render();
//console.log(list.sum());
//
//
//

//const products = [
//    {id: 1, title: 'Notebook', price: 2000, img:'img/pic_1.jpg'},
//    {id: 2, title: 'Mouse', price: 20, img:'img/pic_1.jpg"'},
//    {id: 3, title: 'Keyboard', price: 200, img:'img/pic_1.jpg'},
//    {id: 4, title: 'Gamepad', price: 50, img:'img/pic_1.jpg'},
//];
//const [a,b,c,d]= products;
////console.log(a.title);
//const renderProduct = (id = a.id, title = a.title, price = a.price, img = a.img) => {
//    return document.querySelector('.products').innerHTML += `<div class="product-item" id='${id}'>
//                <img src="${img}">
//                <h3>${title}</h3>
//                <p>${price}$</p>
//                <button class="buy-btn">B U Y</button>
//            </div>`
//};
//const renderPage = list => {
//    const productsList = list.map(item => renderProduct(item.id, item.title, item.price, item.img));
////    console.log(productsList);
////    let i = 0;  
////    productsList.forEach(el =>{             
////        document.querySelector('.products').innerHTML += productsList[i];
////         i++;
////    });
//};
//
//renderPage(products);
