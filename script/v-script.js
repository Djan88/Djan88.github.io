const ExampleStore = {
  data() {
    return {
      filters: [
        {
          name: 'Подборки',
          slug: 'shortList',
          id: 1,
          selected: false
        },
        {
          name: 'Все категории',
          slug: 'all',
          id: 2,
          selected: false
        },
        {
          name: 'Акции',
          slug: 'sale',
          id: 3,
          selected: false
        },
        {
          name: 'Где поесть',
          slug: 'restrants',
          id: 4,
          selected: false
        },
        {
          name: 'Продукты',
          slug: 'food',
          id: 5,
          selected: false
        },
        {
          name: 'Одежда',
          slug: 'clothes',
          id: 6,
          selected: false
        },
      ],
      stores:[
        {
          name: 'Ostin',
          id: 100,
          categoryes: ['all', 'sale', 'clothes']
        },
        {
          name: 'City',
          id: 110,
          categoryes: ['all', 'sale', 'clothes']
        },
        {
          name: 'KFC',
          id: 112,
          categoryes: ['all', 'food', 'restrants', 'shortList']
        },
        {
          name: 'King',
          id: 113,
          categoryes: ['all', 'restrants']
        },
        {
          name: 'Еда и Вода',
          id: 114,
          categoryes: ['all', 'restrants']
        },
        {
          name: 'Пятерочка',
          id: 142,
          categoryes: ['all', 'food', 'sale']
        },
        {
          name: 'П-Косметика',
          id: 152,
          categoryes: ['all', 'sale']
        },
        {
          name: 'Детский Мир',
          id: 172,
          categoryes: ['all', 'sale', 'clothes']
        },
        {
          name: 'CROPP',
          id: 272,
          categoryes: ['all', 'sale', 'clothes']
        },
        {
          name: 'Apple',
          id: 273,
          categoryes: ['all', 'shortList']
        },
        {
          name: 'Вкусвил',
          id: 192,
          categoryes: ['all', 'food', 'sale']
        },
        {
          name: 'Впрок',
          id: 141,
          categoryes: ['all', 'food', 'sale']
        },
        {
          name: 'Азбука вкуса',
          id: 172,
          categoryes: ['all', 'food', 'sale', 'shortList']
        },
        {
          name: 'Технопарк',
          id: 173,
          categoryes: ['all', 'sale', 'shortList']
        },
      ],
      filterParam: '',
      query:'',
      filterStatus: true,
      oldVal: 0,
      newVal: 0,
    }
  },
  methods: {
    selectFilter(id){
      for (let i = 0; i < this.filters.length; i++) {
        this.filters[i].selected = false;
      }
      let currentFilter = this.filters.find((filter) => filter.id === id)
      if (!currentFilter) {
        this.filters[0].selected = true;
        this.filterParam = this.filters[0].slug
        return
      }
      currentFilter.selected = true;
      this.filterParam = currentFilter.slug
    },
    filterVisibility(){
      this.newVal = window.pageYOffset
      if (this.newVal > this.oldVal && this.newVal > 40) {
        console.log('down '+this.oldVal + ' ' + this.newVal);
        this.filterStatus = false
        this.oldVal = this.newVal
        
      } else if (this.oldVal - this.newVal > 40) {
        console.log('up ' + this.oldVal + ' ' + this.newVal);
        this.filterStatus = true
        this.oldVal = this.newVal
      }
    }
  },
  computed: {
    filteredStores(){
      return this.stores.filter((store) => store.categoryes.includes(this.filterParam))
    },
    queryParams() {
      return this.filteredStores.filter(elem => elem.name.toUpperCase().includes(this.query.toUpperCase()))
    },
  },
  mounted(){
    this.selectFilter()
    this.filteredStores
    window.addEventListener('scroll', this.filterVisibility)

  },
  beforeUnmount() {
    window.removeEventListener('scroll')
  },
}
Vue.createApp(ExampleStore).mount('#app');