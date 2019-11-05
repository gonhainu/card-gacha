<template>
  <div>
    <canvas id="world" ref="world" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  Engine,
  Render,
  World,
  Bodies,
  IRenderDefinition,
  IRendererOptions,
  Composites,
  Composite,
  Body,
} from 'matter-js';

@Component
export default class CanvasGacha extends Vue {
  public leverStyle: { [key: string]: any } = {
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
  private engine: any;
  private render: any;
  private world: any;
  private winWidth = 600;
  private winHeight = 600;

  public mounted(): void {
    this.engine = Engine.create();
    this.world = this.engine.world;

    let canvas: HTMLElement | null = document.getElementById('world');
    this.render = Render.create({
      canvas: canvas as HTMLCanvasElement,
      engine: this.engine,
      options: {
        width: this.winWidth,
        height: this.winHeight,
        background: '#8bc2c9',
        wireframes: false,
      } as IRendererOptions,
    });

    let boxA = Bodies.circle(300, 200, 40, {
      render: {
        fillStyle: 'white',
        strokeStyle: 'transparent',
      },
    });

    let stack: Composite = Composites.stack(
      100,
      100,
      11,
      5,
      0,
      0,
      (x: number, y: number) => {
        return Bodies.circle(x, y, 60, {
          render: {
            fillStyle: 'white',
            strokeStyle: 'transparent',
          },
        });
      },
    );

    let ground: Body = Bodies.rectangle(
      (this.winWidth * 4) / 5,
      (this.winHeight * 4) / 5,
      this.winWidth / 2,
      10,
      {
        isStatic: true,
        angle: -Math.PI / 4,
        render: {
          fillStyle: 'black',
          strokeStyle: 'transparent',
        },
      },
    );

    let ground2: Body = Bodies.rectangle(
      this.winWidth / 5,
      (this.winHeight * 4) / 5,
      this.winWidth / 2,
      10,
      {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: 'black',
          strokeStyle: 'transparent',
        },
      },
    );

    let wallL: Body = Bodies.rectangle(
      0,
      this.winHeight / 2,
      10,
      this.winHeight,
      {
        isStatic: true,
        render: {
          fillStyle: 'white',
          strokeStyle: 'transparent',
        },
      },
    );
    let wallR: Body = Bodies.rectangle(
      this.winWidth,
      this.winHeight / 2,
      10,
      this.winHeight,
      {
        isStatic: true,
        render: {
          fillStyle: 'white',
          strokeStyle: 'transparent',
        },
      },
    );

    World.add(this.world, [ground, ground2, wallL, wallR]);
    World.add(this.world, [stack]);
    Engine.run(this.engine);
    Render.run(this.render);
  }

  // public get leverStyle(): { [key: string]: any } {
  //     return {
  //         transform: 'rotateZ(' + (this.angle + this.rotation) + 'deg)',
  //     }
  // }
}
</script>

<style scoped lang="scss">
#rotate {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background-color: #2c3e50;
  border-radius: 50%;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    margin: 3% auto;
    height: 12%;
    width: 1.4%;
    border-radius: 25%;
    background: orange;
    box-shadow: 0 0 2px 0 orange;
  }
}
</style>
