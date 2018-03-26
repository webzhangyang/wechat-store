import * as types from '../mutation/mutation-types'

const cartN=types.ADD_CART_COUNT;

const state={
  count:0,
};
const getters={

};
const mutations={
  [cartN](state,{amount=1}){
    state.count+=amount;
  }
};
const actions={
  addCartCount({commit,state},product){
    commit(cartN,product.amount)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
