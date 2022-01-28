<template>
  <div class="button">
    <i :class="icon"></i>

    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: 'HomeLink',
  props: {
    title: String,
    link: String,
    icon: String,
  },
  created() {
    console.log(this.title)
  },
}
</script>

<style scoped>
.button {
  height: 140px;
  width: 50%;
  margin: 0 20px;
  border-bottom: 2px solid var(--text-color);
  /* background-color: hsla(210, 29%, 24%, 0.3); */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
}

.button:hover {
  background-color: var(--text-color);
  border-radius: 5px;
  color: white;
}

.button:hover > h2 {
  transform: scale(1.1);
}

.button:before {
  background-color: blue;
}

.links h2 {
  font-size: 30px;
}

i {
  font-size: 22px;
}
</style>
