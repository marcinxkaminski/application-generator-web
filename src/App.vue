<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
import ApplicationForm from "./components/ApplicationForm/ApplicationForm.vue";
import ApplicationPdf from "./components/ApplicationPdf.vue";

export default {
  name: "app",
  components: {
    ApplicationForm,
    ApplicationPdf,
  },
};
</script>
