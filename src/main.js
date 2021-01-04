import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../public/public.css'
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

Vue.config.productionTip = false;
VueMarkdownEditor.use(vuepressTheme);

Vue.use(VueMarkdownEditor);

Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
