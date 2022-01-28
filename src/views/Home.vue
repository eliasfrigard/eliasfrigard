<template>
  <div class="home">
    <h1>Elias Frigård</h1>
    <div class="links">
      <h2>Musician, Saxophonist</h2>
      <h2>Software Developer</h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
}
</script>

<style scoped>
.home {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home h1 {
  font-size: 140px;
  text-transform: uppercase;
  margin-bottom: 50px;
}

.links {
  width: 50%;
  display: flex;
  justify-content: space-evenly;
}

.links h2 {
  font-size: 30px;
  text-transform: uppercase;
}
</style>
