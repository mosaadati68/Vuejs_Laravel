import Home from '../pages/Home.vue'
// const About = () => import('../pages/About.vue')
// const Cart = () => import('../components/Cart.vue')
// const OrderPayment = () => import('../components/OrderPayment.vue')
// const Support = () => import('../pages/Support.vue')
// const ThankYou = () => import('../pages/ThankYou.vue')

export default [
    /* Front End Routes */
    // {
    //     path: '/about',
    //     component: About,
    //     name: 'about',
    //     meta: {
    //         permission: 'guest',
    //         fail: '/error'
    //     }
    // },
    // {
    //     path: '/cart',
    //     component: Cart,
    //     name: 'cart',
    //     meta: {
    //         permission: 'guest',
    //         fail: '/error'
    //     }
    // },
    {
        path: '/',
        name: 'home',
        component: Home
        // meta: {
        //     permission: 'guest',
        //     fail: '/error'
        // }
    }
    // {
    //     path: '/support',
    //     component: Support,
    //     name: 'support',
    //     meta: {
    //         permission: 'guest',
    //         fail: '/error'
    //     }
    // },
    // {
    //     path: '/thank-you',
    //     component: ThankYou,
    //     name: 'thankyou',
    //     meta: {
    //         permission: 'guest',
    //         fail: '/error'
    //     }
    // },
    // {
    //     path: '/payment/:order',
    //     name: 'order.payment',
    //     beforeEnter(to, from, next) {
    //         // Put the full page url including the protocol http(s) below
    //         window.location = "https://google.com"
    //     }
    //     // path: '/payment/:order',
    //     // props: true,
    //     // name: 'product.show',
    //     // meta: {
    //     //     permission: 'guest',
    //     //     fail: '/error'
    //     // }
    // },
]
