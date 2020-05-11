
const setting = {
  state: {
    baseUrl:'',
    pagination: {
      limit: 20
    },
    loading: {
      all: true
    },
    params: {
      tel: '',
      remarkL: 200,
      maxWid: '85%'
    },
    props:{
      value: 'id',
      label: 'name',
      children: 'children'
    },
    category:[]
  },
  
  mutations: {
    SET_CATEGORY: (state, category) => {
      state.category = category
    }
  },
  actions: {
    ADBaseData({ commit }, item) {
      return new Promise((resolve, reject) => {
      
      
      })
    }
  }
}

export default setting
