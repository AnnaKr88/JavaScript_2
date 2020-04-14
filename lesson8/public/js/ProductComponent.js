Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
        
        filterByCategory(id) {
            if (id == 0) {
                this.filtered = this.products;
            } else {
                this.filtered = this.products.filter(el => el.genre == id);
            }
        }
    },
   template: `<div class="products">
                <product v-for="item of filtered" 
                    :key="item.id_product" 
                    :img="item.img"
                    :product="item"
                    @add-product="$parent.$refs.cart.addProduct">
                </product>
               </div>
    `
});

Vue.component('product', {
    props: ['product'],
    template: `
            <div class="product-item">
                <img :src="product.img" alt="image" width="180px">                
                    <h5>{{product.product_name}}</h5>
                    
                        <p>$ {{product.price}}</p>
                        <button class="buy-btn" @click="$emit('add-product', product)">
                            BUY
                        </button>
            </div> 
    `
})