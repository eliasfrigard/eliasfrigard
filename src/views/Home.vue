<template>
  <div class="ui container home" :class="{ devTheme: devHoover }">
    <div class="icons">
      <!--       <div class="musicIcons" data-aos="fade-right">
        <i class="fab fa-facebook"></i>
        <i class="fab fa-spotify"></i>
        <i class="fab fa-youtube"></i>
      </div> -->
      <div
        class="langIcons"
        data-aos="fade-right"
        @mouseover="langHoover = true"
        @mouseleave="langHoover = false"
      >
        <div>
          <img src="/images/flags/united-kingdom.png" alt="" />
          <img src="/images/flags/sweden.png" alt="" />
          <img src="/images/flags/finland.png" alt="" />
        </div>
      </div>
      <div class="devIcons" data-aos="fade-left">
        <i class="fab fa-stack-overflow"></i>
        <i class="fab fa-github"></i>
        <i class="fab fa-linkedin"></i>
        <i class="fab fa-spotify"></i>
        <i class="far fa-envelope"></i>
      </div>
    </div>

    <div class="links">
      <HomeLink
        @mouseover="musicHoover = true"
        @mouseleave="musicHoover = false"
        title="Musician"
        icon="fas fa-music"
        data-aos="fade-in"
      />
      <HomeLink
        @mouseover="devHoover = true"
        @mouseleave="devHoover = false"
        title="Software Developer"
        icon="fas fa-laptop-code"
        data-aos="fade-in"
      />
    </div>
    <h1 data-aos="fade-in">Elias Frigård</h1>

    <div class="wrapper" data-aos="fade-in">
      <transition name="fade" mode="out-in">
        <div v-if="musicHoover" class="hooverDiv musicImg">
          <img
            class="hooverImg"
            src="/images/11053175_921294837914321_1486525969073814021_n.jpg"
            alt=""
            rel="preload"
          />
        </div>
        <div v-else-if="devHoover" class="hooverDiv devImg">
          <img
            class="hooverImg"
            src="/images/Group 2 (6).png"
            alt=""
            rel="preload"
          />
        </div>

        <div v-else class="text">
          <p id="typewriting" class="line-1 anim-typewriter">
            Hello! My name is Elias. Welcome to my website!
          </p>

          <p>
            I am a creative individual with my hands in two fields of work and
            many different projects. Since I was seven years old I have spent
            much of my time playing music. My time as a musician has given me
            the opportunity to connect and create art with people from around
            the world.
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
      </transition>
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
      langHoover: false,
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

.langIcons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.langIcons img {
  width: 32px;
  margin: 12px;
  cursor: pointer;
  opacity: 0.85;
}

.langIcons img:hover {
  opacity: 1;
  transform: scale(1.16);
}

.icons i {
  cursor: pointer;
  font-size: 34px;
  margin: 12px;
}

.icons i:hover {
  transform: scale(1.15);
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
  text-shadow: 3px 5px 6px rgba(44, 62, 80, 0.2);
}

.wrapper {
  height: 370px;
  width: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  text-align: center;
  letter-spacing: 0.5px;
  font-size: 16px;
  max-width: 860px;
}

.text p {
  line-height: 200%;
  font-weight: 600;
}

#typewriting {
  font-weight: 500;
}

.hooverDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  min-height: 100%;
  width: 100%;
  background-color: white;
}

.hooverImg {
  max-width: 90%;
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

.line-1 {
  font-family: 'Caveat', cursive;
  font-size: 36px;

  top: 50%;
  width: 24em;
  margin: 0 auto;
  border-right: 2px solid var(--text-color);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  transform: translateY(-50%);
}

/* Animation */
.anim-typewriter {
  animation: typewriter 3.5s steps(44) 0.5s 1 normal both,
    blinkTextCursor 500ms steps(44) infinite normal;
}
@keyframes typewriter {
  from {
    width: 0;
  }
  to {
    width: 17.5em;
  }
}
@keyframes blinkTextCursor {
  from {
    border-right-color: var(--text-color);
  }
  to {
    border-right-color: transparent;
  }
}
</style>
