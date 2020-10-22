import Vue from 'vue';
import App from './App.vue';

import MSChart from "my-chart-demo";
Vue.use(MSChart);


Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
