Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility'],
    template: `
        <div class="cart-block" v-show="visibility">
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="img" :cart-item="item">
            </cart-item>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="product-basket">                    
                        <img :src="img" alt="Some img">
                            <h3 class="product-title">{{ cartItem.product_name }}</h3><button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
                            <p plass="product-quantity">Quantity: {{ cartItem.quantity }}</p>
                            <p class="product-single-price">$ {{ cartItem.price }} each</p>                   
                
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                        
                    </div>
                </div>
    `
})