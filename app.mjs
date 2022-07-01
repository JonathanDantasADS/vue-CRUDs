import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {path: '/home', component: home},
    {path: '/departamento', component: departamento},
    {path: '/funcionario', component: funcionario}
]

const router= new VueRouter({
    routes
}) 

const app = new Vue({
    router
}).$mount('#app')
