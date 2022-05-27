import { snackController } from './../components/snack-bar/snack-bar-controller'
import { DataStore } from '@aws-amplify/datastore'

export const datastoreRegister = async () => {
  DataStore.configure({
    errorHandler: (error) => {
      console.log('Unrecoverable error', { error })
      snackController.error(error.message)
    },
    syncPageSize: 1000,
  })
}
