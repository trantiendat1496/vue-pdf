import { observable } from 'mobx'
import VueRouter from 'vue-router'

export class GlobalStore {
  router!: VueRouter

  @observable lightmode = true // localData.lightmode

  constructor() {
    // reaction(
    //   () => this.lightmode,
    //   (mode) => (localData.lightmode = mode)
    // );
  }
}

export const globalStore = new GlobalStore()
