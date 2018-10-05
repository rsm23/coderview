window.Vue = require('vue');
import VeeValidate from 'vee-validate';


window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Vue.use(VeeValidate);

Vue.component('nav-bar', require('./components/NavBar.vue'));
Vue.component('contact-form', require('./components/ContactForm.vue'));
Vue.component('codemirror', require('./components/Codemirror.vue'));
Vue.component('editor', require('./components/Editor.vue'));

// require lib
import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'

// require more codemirror resource...

// you can set default global options and events when use
Vue.use(VueCodemirror, /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const app = new Vue({
    el: '#app'
});