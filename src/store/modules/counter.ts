import {
  Mutation,
  MutationAction,
  Action,
  VuexModule,
  getModule,
  Module,
} from 'vuex-module-decorators';
import store from '@/store/store';

export interface ICounterState {
  counter: number;
}

@Module({ dynamic: true, store, name: 'counter', namespaced: true })
class Counter extends VuexModule implements ICounterState {
  counter: number = 0;
  pod: Array<string> = [];

  @Mutation
  public SET_COUNTER(num: number) {
    this.counter = num;
  }

  @Mutation
  public SET_POD(pod: Array<string>) {
    this.pod = pod;
  }

  @Action
  public increment() {
    this.SET_COUNTER(this.counter + 1);
  }

  @Action
  public decrement() {
    if (this.counter > 0) {
      this.SET_COUNTER(this.counter - 1);
    }
  }

  @MutationAction({ mutate: ['counter'] })
  public async resetCounter() {
    return {
      counter: 0,
    };
  }
}

export const counterModule = getModule(Counter);
