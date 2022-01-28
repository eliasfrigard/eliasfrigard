<template>
  <div class="ui container home" :class="{ devTheme: devHoover }">
    <div class="icons">
      <div class="musicIcons">
        <i class="fab fa-facebook"></i>
        <i class="fab fa-spotify"></i>
        <i class="fab fa-youtube"></i>
      </div>
      <div class="devIcons">
        <i class="fab fa-stack-overflow"></i>
        <i class="fab fa-github"></i>
        <i class="fab fa-linkedin"></i>
      </div>
    </div>

    <div class="links">
      <HomeLink
        @mouseover="musicHoover = true"
        @mouseleave="musicHoover = false"
        title="Musician"
        icon="fas fa-music"
      />
      <HomeLink
        @mouseover="devHoover = true"
        @mouseleave="devHoover = false"
        title="Software Developer"
        icon="fas fa-laptop-code"
      />
    </div>
    <h1>Elias Frigård</h1>

    <div class="wrapper">
      <div v-if="musicHoover" class="hooverDiv musicImg">
        <img
          class="hooverImg"
          src="/images/11053175_921294837914321_1486525969073814021_n.jpg"
          alt=""
          rel="preload"
        />
      </div>
      <div v-if="devHoover" class="hooverDiv devImg">
        <img
          class="hooverImg"
          src="/images/Group 2 (5).png"
          alt=""
          rel="preload"
        />
      </div>

      <div v-if="!devHoover && !musicHoover" class="text">
        <h2 class="welcome">Hello, my name is Elias. Welcome to my website!</h2>
        <br />

        <p>
          I am a creative individual with my hands in two fields of work and
          many different projects. Since I was seven years old I have spent much
          of my time playing music. My time as a musician has given me the
          opportunity to connect and create art with people from around the
          world.
        </p>

        <p>
          Another part of me has always been interested in technical things,
          computers and how they work. As a kid, I used to open up and fiddle
          around with different electronic devices and spend nights changing
          software on my computer to make it behave like I wanted it to.
        </p>

        <p>
          This website is the culmination of many years of work, studies and
          creativity. Use the links above to find out more about my life and
          work as a musician and software developer.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import HomeLink from '@/components/HomeLink.vue'

export default {
  name: 'Home',
  components: {
    HomeLink,
  },
  data() {
    return {
      devHoover: false,
      musicHoover: false,
    }
  },
}
</script>

<style scoped>
.icons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150px;
  padding: 0 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icons i {
  font-size: 34px;
  margin: 12px;
}

.home {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 100px 0;
}

.home h1 {
  font-size: 140px;
  text-transform: uppercase;
}

.wrapper {
  height: 370px;
  width: 50%;
  position: relative;
}

.text {
  text-align: center;
  letter-spacing: 0.5px;
  font-size: 16px;
}

.text p {
  line-height: 200%;
  font-weight: 600;
}

.hooverDiv {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  min-height: 100%;
  width: 100%;
  background-color: white;
}

.hooverImg {
  max-width: 70%;
}

.devImg {
  /*   background-image: url('/images/Group 2 (5).png');
  background-color: white;
  background-position: top;
  background-repeat: no-repeat;
  background-size: 80%; */
}

.musicImg {
  /*   background-image: url('/images/11053175_921294837914321_1486525969073814021_n.jpg');
  background-color: white;
  background-position: top;
  background-repeat: no-repeat;
  background-size: contain; */
}

.devTheme {
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

.welcome {
  font-family: 'Caveat', cursive;
  font-size: 36px;
}
</style>
