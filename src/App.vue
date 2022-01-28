<template>
  <div id="nav">
    <!--     <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </div>
  <router-view />
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: 'App',
  created() {
    AOS.init()
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --text-color: #2c3e50;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
}

#nav a {
  font-weight: bold;
  color: var(--text-color);
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* Standard animations */

/* Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
