import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout";
import Index from "../views/Index";
import Blog from "../views/Blog";
import Tag from "../views/Tag";
import User from "../views/User";
import Home from "../views/Home";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "Index",
        component: Index
    },
    // {
    //     path: "/",
    //     name: "Layout",
    //     component: Layout,
    //     redirect: '/blog',
    //     children: [
    //         {
    //             path: "blog",
    //             name: "blog",
    //             component: Blog,
    //             meta: {title: '博客管理'}
    //         }
    //     ]
    // },
    {
        path: "/",
        name: "Layout",
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: "home",
                name: "home",
                component: Home,
                meta: {title: '个人信息'}
            }
        ]
    },
    {
        path: "/blog",
        component: Layout,
        children: [
            {
                path: "/",
                component: Blog,
                meta: {title: '博客管理'}
            }
        ]
    },
    {
        path: "/user",
        component: Layout,
        children: [
            {
                path: "/",
                component: User,
                meta: {title: '用户管理'}
            }
        ]
    },
    {
        path: "/tag",
        component: Layout,
        children: [
            {
                path: "/",
                component: Tag,
                meta: {title: '标签管理'}
            }
        ]
    }
];
/*  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/!* webpackChunkName: "about" *!/ "../views/About.vue")
  }*/


const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('token') || localStorage.getItem('token') || to.path === '/login') {
        next()
    } else {
        next({
            replace: true,
            path: '/login'
        })
    }
})

export default router;
