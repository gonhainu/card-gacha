<template>
  <div class="home" :style="backgroundStyle">
    <div id="counter" v-show="isShowCounter">{{ counter }}</div>
    <lever @rotated="incrementCounter" @angle="changeBackground" ref="lever" />
    <img v-show="backgroundState === 0" src="/img/top/rs_gacha_top_01.png" />
    <img v-show="backgroundState === 1" src="/img/top/rs_gacha_top_02.png" />
    <img v-show="backgroundState === 2" src="/img/top/rs_gacha_top_03.png" />
    <!-- <div id="cover-block"></div> -->
    <!-- <img id="lever-guide-arrow" src="/img/arrow.png" />
    <img id="hand" src="/img/hand.png" />-->
    <audio src="/sounds/SE/cupsle_toy01.mp3" ref="leverSE" id="leverSE"></audio>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Lever from '@/components/Lever.vue';
import CanvasGacha from '@/components/CanvasGacha.vue';
import { counterModule } from '@/store/modules/counter';
import * as _ from 'lodash';

@Component({
  components: {
    Lever,
    CanvasGacha,
  },
})
export default class Home extends Vue {
  public imgPath: string = require('path').join(
    process.env.BASE_URL,
    '/img/logo.png',
  );
  public backgroundStyle: { [key: string]: any } = {
    'background-image': 'url("/img/back01.png")',
  };
  public imageUrl: string = '"/img/back01.png"';
  public backgroundState: number = 0;
  public leverSEElement: any;
  public isShowCounter: boolean = false;
  public isShift: boolean = false;
  public pod: Array<string> = [];

  public mounted() {
    // this.leverSEElement = this.$refs.leverSE as HTMLAudioElement;
    this.leverSEElement = document.getElementById(
      'leverSE',
    ) as HTMLAudioElement;
    counterModule.SET_COUNTER(this.$configStore.get('counter'));
    let vm = this;
    document.addEventListener('keydown', this.downKey);
    document.addEventListener('keyup', this.upKey);
  }

  public downKey(event: KeyboardEvent) {
    if (event.keyCode === 82 && this.isShift) {
      counterModule.resetCounter();
      console.log('reset');
    }
    if (event.keyCode === 86) {
      this.isShowCounter = !this.isShowCounter;
    }
    if (event.keyCode === 16) {
      this.isShift = true;
    }
  }

  public upKey(event: KeyboardEvent) {
    if (event.keyCode === 16) {
      this.isShift = false;
    }
  }

  public destroyed() {
    document.removeEventListener('keydown', this.downKey);
    document.removeEventListener('keyup', this.upKey);
  }

  public incrementCounter() {
    counterModule.increment();
    this.$configStore.set('counter', counterModule.counter);
    if (counterModule.pod.length === 0) {
      this.pod = this.getPod();
      this.pod = _.shuffle(this.pod);
      counterModule.SET_POD(this.pod);
      console.log(this.pod);
    }
    console.log(this.$configStore.get('counter'));
    let cardNum: string | undefined = counterModule.pod.pop();
    console.log(cardNum);
    this.$router.push(`effect?grade=${cardNum}`);
  }

  public changeBackground(val: number) {
    if (Math.abs(val) % 180 > 110 && this.backgroundState === 1) {
      this.backgroundState = 2;
      this.leverSEElement.play();
    } else if (Math.abs(val) % 180 > 50 && this.backgroundState === 0) {
      this.backgroundState = 1;
      this.leverSEElement.play();
    } else {
      // this.backgroundState = 0;
    }
  }

  public get counter() {
    // return this.$configStore.get('counter');
    return counterModule.counter;
  }

  public getPod() {
    return this.$configStore.get('pod');
  }
}
</script>

<style scoped lang="scss">
.home {
  width: 1080px;
  height: 1920px;
  // background-image: url('/img/back01.png');
  background-size: cover;
  #counter {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
    font-size: 50px;
  }
  & ::v-deep #lever-container {
    position: absolute;
    left: 300px;
    top: 1370px;
    z-index: 4;
  }
  #cover-block {
    position: absolute;
    width: 600px;
    height: 285px;
    left: 240px;
    top: 1280px;
    z-index: 6;
    background-color: #2b358d;
  }
  #lever-guide-arrow {
    position: absolute;
    left: 280px;
    top: 1565px;
    z-index: 8;
    transform-origin: 257px 0%;
    animation: rotate_arrow 1.5s infinite;
    animation-timing-function: linear;
  }
  #hand {
    position: absolute;
    top: 1620px;
    left: 680px;
    z-index: 11;
    animation: fuwafuwa 1.5s infinite;
    animation-timing-function: linear;
  }
}

@keyframes rotate_arrow {
  0% {
    transform: rotate(180deg);
  }
  // 70% {
  //   transform: rotate(360deg);
  // }
  100% {
    transform: rotate(540deg);
  }
}

@keyframes fuwafuwa {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(30px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
