Vue.component('search', {
    //    data() {
    //        return {
    //            userSearch:'',
    //        }
    //    },
    props: ['userSearch', 'filter'],
    template: `<div class="searchField">
             <form action="#" class="search-form">
                <input type="text" class="search-field" :userSearch="userSearch">
                <button class="submit" type="submit" @click="$parent.$emit('filter')">
                    <i class="fas fa-search"></i>
                </button>
            </form><p>{{userSearch}}</p>
            </div>`
});

//Vue.component('searchPost', {
//    template: `<div><h1>Search</h1></div>`
//})
