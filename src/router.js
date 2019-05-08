import Vue from 'vue';
import Router from 'vue-router';
import ApllicationForm from '@/components/ApplicationForm/ApplicationForm.vue';
import ApplicationPdf from '@/components/ApplicationPdf.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ApllicationForm,
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: ApplicationPdf,
    },
  ],
  state: {},
});
