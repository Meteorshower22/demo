import { createApp } from 'vue'
import './styles/element/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import './style.css'
import router from './router/router'
import App from './App.vue'


createApp(App).use(ElementPlus).use(router).mount('#app')
