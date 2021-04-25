<template>
  <v-app>
    <!-- <div class="barnav">
      <v-bar
      
      >
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </v-bar> -->
      <router-view/>
    <!-- </div> -->
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
};
</script>
<style>
.barnav {
text-align: center;}
</style>
