<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions(["syncData"])
  },
  async created() {
    const slug = this.$route.path.split('/')[1];
    const subdomain = window.location.host.split('.')[0]; //getting subdomain {subdomain}.qrmenus.uz
    let payload;
    if (subdomain == 'localhost:8080') {
      payload = {
        subdomain: 'efendi', //this is required only for testing locally
        slug
      }
    }else {
      payload = {
        subdomain,
        slug
      }
      
    }
    await this.syncData(payload)
    // subdomain == 'localhost:8080' 
    // ? await this.syncData('efendi', slug) //this is required only for testing locally
    // : await this.syncData(subdomain, slug) 

    const favIcon = document.getElementById("favicon")
    favIcon.href = this.favicon 
  },
}
</script>

<style lang="postcss">
#app {
  font-family: Inter, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
} /* TODO: refactor */
</style>
