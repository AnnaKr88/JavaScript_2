Vue.component('cart', {
    data() {
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          counter: 0,
          showCart: false
      }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                }
                this.countCart(); 
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
            this.countCart()
        },
        //

        remove(product) {
            for (let i = 0; i < this.cartItems.length; i++) {
                if (this.cartItems[i].id_product === +product.id_product) {

                    this.$parent.deleteJson(`/api/cart/${this.cartItems[i].id_product}`, this.cartItems[i])
                        .then(data => {
                            if (data.result === 1) {
                                this.cartItems[i].quantity -= 1;
                                if (this.cartItems[i].quantity === 0) {
                                    this.cartItems.splice(i, 1)
                                }

                            }
                        })
                }
            }
            this.countCart()
        },
        countCart() {
            //this.counter = this.cartItems.length;
            let count = 0;
            this.cartItems.forEach(item => {
                count += item.quantity;
                this.counter = count;
            })
        }
    },
    template: `
        <div>
            <button class="btn-cart" type="button" @click="showCart = !showCart">
                BUSKET
            </button>
            <div class="cart-block" v-show="showCart">
                <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.image" :cart-item="item" @remove="remove">
                </cart-item>
            </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="cartItem.img" alt="img" width="90px">
                
                    <h5 class="product-title">{{ cartItem.product_name }}</h5> <button class="del-btn" @click="$emit('remove', cartItem)"></button>
                    
                        <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                        <div class="product-single-price">$ {{ cartItem.price }} each</div>
                    
                
            </div>
            
                <div class="product-price"><b>Total:</b> $ {{cartItem.quantity*cartItem.price}}</div>         
        </div>
    `
})