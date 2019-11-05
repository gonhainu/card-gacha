<template>
  <div id="lever-container">
    <div
      id="rotate"
      ref="rotate"
      @mousedown="start"
      @touchstart="start"
      :style="leverStyle"
    />
    <!-- <div id="rotate-overlay" @mousedown="start" @touchstart="start"></div> -->
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component
export default class Lever extends Vue {
  public leverStyle: { [key: string]: string } = {
    transform: 'rotateZ(0deg)',
  };
  private center: { [key: string]: number } = {
    x: 0,
    y: 0,
  };
  private R2D: number = 180 / Math.PI;
  private active: boolean = false;
  private startAngle: number = 0;
  private angle: number = 0;
  private rotation: number = 0;
  private isRotated: boolean = false;
  private MAX_ANGLE: number = 180;

  public mounted(): void {
    document.addEventListener('mousemove', this.rotate, { passive: false });
    document.addEventListener('touchmove', this.rotate, { passive: false });
    document.addEventListener('mouseup', this.stop, { passive: false });
    document.addEventListener('touchend', this.stop, { passive: false });
  }

  public destroyed(): void {
    document.removeEventListener('mousemove', this.rotate);
    document.removeEventListener('touchmove', this.rotate);
    document.removeEventListener('mouseup', this.stop);
    document.removeEventListener('touchend', this.stop);
  }

  // public get leverStyle(): { [key: string]: any } {
  //     return {
  //         transform: 'rotateZ(' + (this.angle + this.rotation) + 'deg)',
  //     }
  // }

  public start(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    const rot: HTMLElement = this.$refs.rotate as HTMLElement;
    const bb = rot.getBoundingClientRect(),
      t = bb.top,
      l = bb.left,
      h = bb.height,
      w = bb.width;
    let x, y;
    this.center = {
      x: l + w / 2,
      y: t + h / 2,
    };
    if (e instanceof TouchEvent) {
      x = e.touches[0].clientX - this.center.x;
      y = e.touches[0].clientY - this.center.y;
    } else {
      x = e.clientX - this.center.x;
      y = e.clientY - this.center.y;
    }
    this.startAngle = this.R2D * Math.atan2(y, x);
    return (this.active = true);
  }

  public rotate(e: MouseEvent | TouchEvent): void {
    if (!this.active) {
      return;
    }
    e.preventDefault();
    let x, y;
    if (e instanceof TouchEvent) {
      x = e.touches[0].clientX - this.center.x;
      y = e.touches[0].clientY - this.center.y;
    } else {
      x = e.clientX - this.center.x;
      y = e.clientY - this.center.y;
    }
    const d = this.R2D * Math.atan2(y, x);
    this.rotation = d - this.startAngle;
    this.leverStyle.transform =
      'rotateZ(' + (this.angle + this.rotation) + 'deg)';
    console.log(this.angle + this.rotation);
    // this.$emit('leverStyleChanged', this.leverStyle);
    if (
      Math.abs(this.angle + this.rotation) % 180 > this.MAX_ANGLE - 10 &&
      Math.abs(this.angle + this.rotation) % 180 < this.MAX_ANGLE + 10 &&
      !this.isRotated
    ) {
      this.isRotated = true;
      this.$emit('rotated');
    }
  }

  public stop() {
    this.angle += this.rotation;
    if (
      Math.abs(this.angle) % 180 > this.MAX_ANGLE - 10 &&
      Math.abs(this.angle) % 180 < this.MAX_ANGLE + 10 &&
      !this.isRotated
    ) {
      this.isRotated = true;
      this.$emit('rotated');
    }

    return (this.active = false);
  }

  @Watch('angle')
  public angleChanged() {
    this.$emit('angle', this.angle + this.rotation);
  }

  @Watch('rotation')
  public rotationChanged() {
    this.$emit('angle', this.angle + this.rotation);
  }
}
</script>

<style scoped lang="scss">
#rotate {
  width: 480px;
  height: 480px;
  // margin: 0 auto;
  // background-color: #2c3e50;
  background-image: url('/img/lever2.png');
  background-size: cover;
  border-radius: 50%;
  // position: relative;
  // z-index: 6;
}
#rotate-overlay {
  width: 530px;
  height: 530px;
  // margin: 0 auto;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  // left: 280px;
  // top: 1565px;
  z-index: 9998;
  background-color: red;
}
</style>
