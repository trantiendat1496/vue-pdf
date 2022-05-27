import { action, observable } from 'mobx'

export interface SnakBarConfig {
  icon?: string
  message?: string
  color?: string
  timeout?: number
}

export class SnackBarController {
  @observable config: SnakBarConfig = {
    timeout: 5000,
  }
  @observable show = false

  @action success(message: string) {
    this.config = {
      icon: 'check_circle',
      message,
      color: 'success',
      timeout: 5000,
    }
    this.show = true
  }

  @action error(message: string) {
    this.config = {
      icon: 'error',
      message,
      color: 'error',
      timeout: 5000,
    }
    this.show = true
  }

  @action close() {
    this.show = false
  }
}

export const snackController = new SnackBarController()
