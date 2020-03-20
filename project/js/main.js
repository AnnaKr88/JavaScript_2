const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        getCartUrl: '/getBasket.json',
        products: [],
        prodInBasket: [],
        prodId: [],
        imgCatalog: 'https://placehold.it/200x150',
        searchLine: '',
        isVisibleCart: 'block',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    let productId = product.id_product;
                    if (this.prodId.includes(productId)) {
                        console.log(product.id_product);
                    } else {

                        let productB = {
                            id: productId,
                            title: product.product_name,
                            price: +product.price,
                            quantity: 1
                        };
                        this.prodInBasket.unshift(productB);
                        this.prodId.unshift(productId);
                        this.render('addBasket', productB);

                    }
                    console.log(this.prodInBasket);
                    
                })
        },
        render(conteiner, event) {
            const block = document.getElementById(conteiner);
            block.innerHTML += `<div class="product-basket" id="${event.id}">
                                <img src="${this.imgCatalog}" alt="Some img">
                                <h3>${event.title}</h3><button id="remove">&times;</button>
                                <p>${event.price}$</p>
                                <button id="minus">-</button><p class="product-quantity">Quantity: ${event.quantity}</p><button id="plus">+</button>
                                <p>Total: ${event.quantity*event.price}$</p>
                                </div>`
        },

        _addEl(event) {
            let plus = document.getElementById('plus').addEventListener('click', () => {
                event.quantity++;
            });
            let minus = document.getElementById('minus').addEventListener('click', () => {
                event.quantity--;
            });
        },

        FilterGoods() {
            console.log(event);
            let regexp = /^[a-zа-я0-9]+\s?[a-zа-я0-9]+?/igu;
            if (this.searchLine.match(regexp)) {
                let word = this.products.find(product => this.searchLine.toLowerCase() === product.product_name.toLowerCase());
                console.log(word);
                if (word) {
                    console.log(word.product_name);
                    document.getElementById('searchField').innerHTML = `<div class="product-search">
                                                                    <img src="${this.imgCatalog}" alt="Some img">
                                                                    <h3>${word.product_name}</h3>
                                                                    <p>${word.price}$</p>
                                                                    
                                                                    </div>`
                } else {
                    document.getElementById('searchField').innerHTML = `Товар не найден.`
                }

            } else {
                document.getElementById('searchField').innerHTML = `Введено недопустимое значение.`
            }
        },

        minus() {
            console.log(event)
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            })

    }
})
