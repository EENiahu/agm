import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@babel/polyfill';
import { VueMaskDirective } from 'v-mask';

Vue.config.productionTip = false;
Vue.directive('mask', VueMaskDirective);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
