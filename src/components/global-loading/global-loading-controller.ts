import { action, computed, observable } from 'mobx'

export class GlobalLoadingController {
  @observable count = 0

  constructor() {
    //
  }

  @action.bound increaseRequest() {
    this.count = this.count + 1
  }

  @action.bound decreaseRequest() {
    if (this.count > 0) this.count = this.count - 1
  }

  @computed get requesting() {
    return this.count > 0
  }
}

export const loadingController = new GlobalLoadingController()
