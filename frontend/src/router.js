import Vue        from "vue";
import Router     from "vue-router";
import Home       from "./views/Home.vue";
import About      from "./views/About.vue";
import Courses    from "./views/courses/Courses.vue";
import Course     from "./views/courses/Course.vue";
import NewCourse  from "./views/courses/NewCourse.vue";
import Students   from "./views/students/Students.vue";
import Student    from "./views/students/Student.vue";
import NewStudent from "./views/students/NewStudent.vue";

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
      path: "/courses/new",
      name: "new-course",
      component: NewCourse
    },
    {
      path: "/courses/:id",
      name: "course",
      component: Course
    },
    {
      path: "/students",
      name: "students",
      component: Students,
      meta: {
        icon: "group"
      }
    },
    {
      path: "/students/new",
      name: "new-student",
      component: NewStudent
    },
    {
      path: "/students/:id",
      name: "student",
      component: Student
    }
  ]
});
