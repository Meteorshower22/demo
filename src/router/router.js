import {createMemoryHistory, createRouter} from "vue-router";

const routes = [
  {path:'/',redirect:'/search'},
  {name:'search',path:'/search',component:()=>import('../views/search.vue')},
  {path: '/error',component:()=>import('../views/Error.vue')}
]
const router = createRouter({
  history:createMemoryHistory(),
  routes
})
// router.beforeEach((to, from, next)=>{
//   console.log(to);
//   if (to.fullPath!=='/search'){
//     next({redirect:'/error'})
//   }else{
//     next()
//   }
//
// })
export default router