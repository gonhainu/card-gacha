import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import ElectronStore from 'electron-store';
import { app } from 'electron';
import '@babel/polyfill';

Vue.config.productionTip = false;
Vue.prototype.$configStore = new ElectronStore({
  defaults: {
    counter: 0,
    pod: ['02', '03', '04', '05', '06', '07', '08'],
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
