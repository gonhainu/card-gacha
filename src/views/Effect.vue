<template>
  <div id="effect-page">
    <nav>
      <router-link to="/" :class="{ 'lnk-disabled': isLnkDisabled }">
        <img src="/img/back_button.png" />
      </router-link>
      <router-view />
    </nav>
    <div id="effect-container">
      <!-- <img :src="gifImage" />
      <img :src="prizeImagePath" class="prize--img" />-->
      <div id="card">
        <div id="smooth">
          <img :src="cardImagePath" />
        </div>
        <div id="rough">
          <img src="/img/card/RS_card_00.png" />
        </div>
      </div>
      <div id="whiteout"></div>
      <audio
        src="/sounds/SE/drum-roll1.mp3"
        ref="drumroll"
        id="drumroll"
      ></audio>
      <audio
        src="/sounds/SE/e1-001_fanfare_01.mp3"
        ref="fanfare"
        id="fanfare"
      ></audio>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import anime, {
  AnimeInstanceParams,
  AnimeAnimParams,
  AnimeInstance,
  AnimeTimelineAnimParams,
  AnimeParams,
} from 'animejs';

@Component
export default class Effect extends Vue {
  public gifImage: string = '/img/KE_gacha_3.gif?' + new Date().getTime();
  public prizeImagePath: string = '';
  public isLnkDisabled: boolean = true;
  public cardImagePath: string = '/img/card/RS_card_02.png';

  public get queryParams() {
    return this.$route.query.grade;
  }

  public mounted() {
    switch (this.$route.query.grade) {
      case '02':
        this.cardImagePath = '/img/card/RS_card_02.png';
        break;
      case '03':
        this.cardImagePath = '/img/card/RS_card_03.png';
        break;
      case '04':
        this.cardImagePath = '/img/card/RS_card_04.png';
        break;
      case '05':
        this.cardImagePath = '/img/card/RS_card_05.png';
        break;
      case '06':
        this.cardImagePath = '/img/card/RS_card_06.png';
        break;
      case '07':
        this.cardImagePath = '/img/card/RS_card_07.png';
        break;
      case '08':
        this.cardImagePath = '/img/card/RS_card_08.png';
        break;
      default:
        break;
    }
    let drumroll = document.getElementById('drumroll') as HTMLAudioElement;
    drumroll.play();
    let fanfare = document.getElementById('fanfare') as HTMLAudioElement;
    // let tl = anime
    //   .timeline({
    //     targets: '.prize--img',
    //     opacity: 1,
    //     duration: 10,
    //     delay: 2500,
    //   } as AnimeParams)
    //   .add({
    //     targets: '.prize--img',
    //     translateY: -250,
    //     scale: 7,
    //     delay: 100,
    //     duration: 500,
    //   } as AnimeParams);
    // tl.play();
    let _this = this;
    // anime({
    //   targets: '.prize--img',
    //   // opacity: [{ value: 1, delay: 2500, duration: 10 }],
    //   // translateY: [
    //   //   // { value: -250, easing: 'linear', delay: 2000, duration: 500 },
    //   //   { value: -250, delay: 2600, duration: 500 },
    //   // ],
    //   // scale: [{ value: 7, delay: 2600, duration: 500 }],
    //   keyframes: [
    //     { opacity: 1, duration: 10 },
    //     { translateY: -250, scale: 7, delay: 100, duration: 500 },
    //   ],
    //   delay: 2500,
    //   update: function(anim) {
    //     if (anim.currentTime > 1900) {
    //       fanfare.play();
    //     }
    //     if (anim.currentTime > 2400) {
    //       let _drumroll = document.getElementById(
    //         'drumroll',
    //       ) as HTMLAudioElement;
    //       _drumroll.pause();
    //     }
    //   },
    //   complete: function(anim) {
    //     if (anim.completed) {
    //       _this.isLnkDisabled = false;
    //       // console.log(_this.isLnkDisabled);
    //     }
    //   },
    // });
    anime({
      targets: '#smooth',
      keyframes: [
        { rotateY: -180 },
        { rotateY: -90, duration: 1000, easing: 'linear' },
        { rotateY: 1080, duration: 3000, delay: 800 },
        // { rotateY: 1080, duration: 1500, delay: 800 },
      ],
      update: function(anim) {
        if (anim.currentTime > 3000) {
          fanfare.play();
        }
        if (anim.currentTime > 4000) {
          let _drumroll = document.getElementById(
            'drumroll',
          ) as HTMLAudioElement;
          _drumroll.pause();
        }
      },
      complete: function(anim) {
        if (anim.completed) {
          _this.isLnkDisabled = false;
          // console.log(_this.isLnkDisabled);
        }
      },
    });
    anime({
      targets: '#rough',
      keyframes: [
        { rotateY: 0 },
        { rotateY: 90, duration: 1000, easing: 'linear' },
        { rotateY: 1260, duration: 3000, delay: 800 },
        // { rotateY: 1260, duration: 1500 },
      ],
    });
    anime({
      targets: '#whiteout',
      keyframes: [
        // { opacity: 0 },
        { opacity: 1, duration: 1000, delay: 900, easing: 'linear' },
        { opacity: 0, duration: 400, easing: 'linear' },
      ],
    });
  }
  @Watch('isLnkDisabled')
  public flagChanged() {
    // console.log(this.isLnkDisabled);
  }
}
</script>

<style lang="scss" scoped>
#effect-page {
  position: relative;
  width: 1080px;
  height: 1920px;
}
nav {
  position: absolute;
  top: 0;
  right: 0;
  text-align: right;
  z-index: 10;
  & ::v-deep img {
    position: absolute;
    right: 30px;
    top: 25px;
    width: 120px;
    height: 120px;
  }
}
#effect-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 1080px;
  height: 1920px;
  z-index: 1;
  background-image: url('/img/top/RS_gacha_back.png');
  img {
    pointer-events: none;
  }
  .prize--img {
    position: absolute;
    // top: 560px;
    // left: 81px;
    top: 1240px;
    left: 470px;
    width: 140px;
    opacity: 0;
  }
  #card {
    position: absolute;
    perspective: 1000px;
    top: 0;
    left: 0;
    width: 1080px;
    height: 1920px;
  }
  #smooth {
    position: absolute;
    top: 700px;
    left: 0;
    right: 0;
    transform: rotateY(-180deg);
    width: 686px;
    height: 1000px;
    margin: auto;
    // transform-origin: left top;
    backface-visibility: hidden;
  }
  #rough {
    position: absolute;
    top: 700px;
    left: 0;
    right: 0;
    width: 686px;
    height: 1000px;
    // transform-origin: left top;
    backface-visibility: hidden;
    margin: auto;
  }
  #whiteout {
    background: white;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 1080px;
    height: 1920px;
  }
}

.lnk-disabled {
  pointer-events: none;
}
</style>
