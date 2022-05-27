import { loadingController } from '@/components/global-loading/global-loading-controller'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { promiseHelper } from '@/helpers/promise.helper'
import { globalStore } from '@/stores/global-store'
import { asyncAction } from 'mobx-utils'

export class LoginViewModel {
  constructor() {
    //
  }

  @asyncAction *login() {
    loadingController.increaseRequest()
    yield promiseHelper.delay(1000)
    globalStore.router.replace('top')
    snackController.success('Login OK')
    loadingController.decreaseRequest()
  }
}
