class basket{}
class prodInBasket{}


class ProductsList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
    } 
    
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend',productObj.render())
        }
    }
    sum() {
        let sum = 0;
        let i = 0;
        for(let product of this.goods){
            sum += this.goods[i].price;
            i++;
        }
        return (`Total price: ${sum}$`);
    }
    
}

class ProductItem{
	constructor(product, img = 'https://placehold.it/200x150'){
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
		this.img = img;
		
	}
	
	render(){
		 return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">BUY</button>
            </div>`
	}
}

let list = new ProductsList();
list.render();
console.log(list.sum());




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