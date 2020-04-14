Vue.component('filter-el', {
    data() {
      return {
          userSearch: ''
      }
    },
    template: `
        <form action="#" class="search-form search" @submit.prevent="$parent.$refs.products.filter(userSearch)">
            <input type="text" class="search-field" v-model="userSearch" placeholder="Search..">
            <button type="submit" class="search_button">
            </button>
        </form>
    `
})

// @submit.prevent - отменяем стандартные действия
// $refs - свойство, которое ссылается на нашу верстку <products ref="products"></products>
// v-model="userSearch" - связь между версткой и компонентом userSearch: ''
// Можно использовать свойство props - для доступа к внешним свойствам компонентов


Vue.component('category', {
    data() {
      return {
          genre: ''
      }
    },
    template: `
        <div class="category">
            <button class="category-btn" v-on:click="$parent.$refs.products.filterByCategory(0)">All</button>
            <button class="category-btn" v-on:click="$parent.$refs.products.filterByCategory(1)">Action</button>
            <button class="category-btn" v-on:click="$parent.$refs.products.filterByCategory(2)">RPG</button>
            <button class="category-btn" v-on:click="$parent.$refs.products.filterByCategory(3)">Sport</button>
        </div>
    `
})