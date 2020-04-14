Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
           //imgProduct: 'https://placehold.it/200x150'
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
                this.filtered = this.products.filter(el => el.category == id);
            }
        }
    },
   template: `<div class="products">
                <product v-for="item of filtered" 
                    :key="item.id_product" 
                    :img="item.image"
                    :product="item"
                    @add-product="$parent.$refs.cart.addProduct">
                </product>
               </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <div class="product-item">
                <img :src="img" alt="image" width="180px">
                <div class="desc">
                    <h3 class="title">{{product.product_name}}</h3>
                    <div class="txt-wrap">
                        <span class="price">$ {{product.price}}</span>
                        <button class="buy-btn" @click="$emit('add-product', product)">
                            <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div> 
    `
})