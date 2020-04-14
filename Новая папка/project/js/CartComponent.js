const cartItem = {
    props: ['cart_item'],
    template: `
            <div class="product-basket">                    
                        <img :src="cart_item.img" alt="Some img">
                            <h3 class="product-title">{{ cart_item.product_name }}</h3><button class="del-btn" @click="$root.$refs.cart.remove(cart_item)">&times;</button>
                            <p plass="product-quantity">Quantity: {{ cart_item.quantity }}</p>
                            <p class="product-single-price">$ {{ cart_item.price }} each</p>                   
                
                        <p class="product-price">{{cart_item.quantity*cart_item.price}}</p>
                        
                    </div>
                </div>
        `
}

const cart = {
    components: {'cart-item': cartItem},
    data () {
        return {
            cartUrl: '/getBasket.json',
            imgCart: 'https://placehold.it/50x100',
            cartShown: false,
            cartItems: []
        }
    },
    methods: {
        addProduct (product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result){
                    let find = this.cartItems.find(el => el.id_product === product.id_product);
                    if(find){
                        find.quantity++;
                    } else {
                        let prod = Object.assign ({quantity: 1}, product)
                        this.cartItems.push (prod)
                    }
                } else {
                    console.log('Some error')
                }
            })
        }, 
        remove (product) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result){
                    if (product.quantity > 1) {
                        product.quantity-- 
                    } else {
                        this.cartItems.splice (this.cartItems.indexOf (product), 1)
                    }
                }
            })
        }
        
    },
    mounted () {
        this.$parent.getJson(`${API + this.cartUrl}`)
        .then(data => {
            for(let el of data){
                this.cartItems.push(el);
                this.cartItems.push(el);
            }
        })
    },
    template: `
    <div>
        <button class="btn-cart" type="button" @click="cartShown = !cartShown">BASKET</button>
        <div class="cart-block" v-show="cartShown">
            <cart-item v-for="product of cartItems"
            :key="product.id_product"
            :img="imgCart"
            :cart_item="product"></cart-item>
        </div>
    </div>
    `
}











//const cart = {
//    props: ['cartItems', 'img', 'visibility'],
//    template: `
//        <div class="cart-block" v-show="visibility">
//            <cart-item v-for="item of cartItems" :key="item.id_product" :img="img" :cart-item="item">
//            </cart-item>
//        </div>
//    `
//};
//
//const cart-item = {
//    props: ['img', 'cartItem'],
//    template: `
//    <div class="product-basket">                    
//                        <img :src="img" alt="Some img">
//                            <h3 class="product-title">{{ cartItem.product_name }}</h3><button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
//                            <p plass="product-quantity">Quantity: {{ cartItem.quantity }}</p>
//                            <p class="product-single-price">$ {{ cartItem.price }} each</p>                   
//                
//                        <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
//                        
//                    </div>
//                </div>
//    `
//}
