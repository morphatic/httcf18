import Vue        from "vue";
import Router     from "vue-router";
import Home       from "@/views/Home.vue";
import About      from "@/views/About.vue";
import Courses    from "@/views/courses/Courses.vue";
import Course     from "@/views/courses/Course.vue";
import NewCourse  from "@/views/courses/NewCourse.vue";
import Students   from "@/views/students/Students.vue";
import Student    from "@/views/students/Student.vue";
import NewStudent from "@/views/students/NewStudent.vue";
import Subjects   from "@/views/subjects/Subjects.vue";
import Subject    from "@/views/subjects/Subject.vue";
import NewSubject from "@/views/subjects/NewSubject.vue";

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
        icon: "home",
        breadcrumbs: []
      }
    },
    {
      path: "/about",
      name: "about",
      component: About,
      meta: {
        icon: "info",
        breadcrumbs: [
          { text: "Home", href: "/" }
        ]
      }
    },
    {
      path: "/courses",
      name: "courses",
      component: Courses,
      meta: {
        icon: "school",
        breadcrumbs: [
          { text: "Home", href: "/" }
        ]
      }
    },
    {
      path: "/courses/new",
      name: "new-course",
      component: NewCourse,
      meta: {
        breadcrumbs: [
          { text: "Home", href: "/" },
          { text: "Courses", href: "/courses" }
        ]
      }
    },
    {
      path: "/courses/:id",
      name: "course",
      component: Course,
      meta: {
        breadcrumbs: [
          { text: "Home", href: "/" },
          { text: "Courses", href: "/courses" }
        ]
      }
    },
    {
      path: "/students",
      name: "students",
      component: Students,
      meta: {
        icon: "group",
        breadcrumbs: [
          { text: "Home", href: "/" }
        ]
      }
    },
    {
      path: "/students/new",
      name: "new-student",
      component: NewStudent,
      meta: {
        breadcrumbs: [
          { text: "Home", href: "/" },
          { text: "Students", href: "/students" }
        ]
      }
    },
    {
      path: "/students/:id",
      name: "student",
      component: Student,
      meta: {
        breadcrumbs: [
          { text: "Home", href: "/" },
          { text: "Students", href: "/students" }
        ]
      }
    },
    {
      path: "/subjects",
      name: "subjects",
      component: Subjects,
      meta: {
        icon: "subject",
        breadcrumbs: [
          { text: "Home", href: "/" }
        ]
      }
    },
    {
      path: "/subjects/new",
      name: "new-subject",
      component: NewSubject,
      meta: {
        breadcrumbs: [
          { text: "Home", href: "/" },
          { text: "Subjects", href: "/subjects" }
        ]
      }
    },
    {
      path: "/subjects/:id",
      name: "subject",
      component: Subject,
      meta: {
        breadcrumbs: [
          { text: "Home", href: "/" },
          { text: "Subjects", href: "/subjects" }
        ]
      }
    }
  ]
});
