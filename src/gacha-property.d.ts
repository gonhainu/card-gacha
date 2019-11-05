import Vue from 'vue'
import ElectronStore = require('electron-store')

declare module 'vue/types/vue' {
  interface Vue {
    $configStore: ElectronStore<any>;
  }
}