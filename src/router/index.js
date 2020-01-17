import Vue from 'vue';
import VueRouter from 'vue-router';
import Recommend from '@views/recommend'
import Singer from '@views/singer'
import SingerDetail from '@views/singer/singerDetail'
import RecomDetail from '@views/recommend/recomDetail'
import Rank from '@views/rank'
import RankDetail from '@views/rank/rankDetail'
import Search from '@views/search'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    // 重定向到recommend
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: RecomDetail
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id', // 动态路由
        component: SingerDetail
      }
    ]
  },
  {
    path: '/rank',
    component: Rank,
    children: [
      {
        path: ':id', // 动态路由
        component: RankDetail
      }
    ]
  },
  {
    path: '/search',
    component: Search,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
