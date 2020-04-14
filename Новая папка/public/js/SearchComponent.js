const search =  {
   data () {
        return {
            userSearch: ''
        }
    },
    template: `<form action="#" class="search" @submit.prevent='$parent.$refs.products.filter(userSearch)'>
                <input type="text" class="search-field" v-model="userSearch">
                <button class="search_button submit" type="submit">
                </button>
            </form>
            `
};
