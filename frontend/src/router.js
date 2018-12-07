import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Courses from "./views/courses/Courses.vue";
import Course from "./views/courses/Course.vue";
import NewCourse from "./views/courses/NewCourse.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        icon: "home"
      }
    },
    {
      path: "/about",
      name: "about",
      component: About,
      meta: {
        icon: "info"
      }
    },
    {
      path: "/courses",
      name: "courses",
      component: Courses,
      meta: {
        icon: "school"
      }
    },
    {
      path: "/courses/:id",
      name: "course",
      component: Course
    },
    {
      path: "/courses/new",
      name: "new_course",
      component: NewCourse
    }
  ]
});
