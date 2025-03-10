import './assets/main.css'
import IconSprite from './components/AppIconSprite.vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.component('IconSprite', IconSprite)
app.mount('#app')
