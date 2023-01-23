import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiEyeFill } from "oh-vue-icons/icons";

addIcons(BiEyeFill);

createApp(App)
.use(router)
.component("v-icon", OhVueIcon)
.mount('#app')
