window.Vue = require('vue');
import VeeValidate from 'vee-validate';


window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Vue.use(VeeValidate);

Vue.component('nav-bar', require('./components/NavBar.vue'));
Vue.component('contact-form', require('./components/ContactForm.vue'));


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const app = new Vue({
    el: '#app'
});