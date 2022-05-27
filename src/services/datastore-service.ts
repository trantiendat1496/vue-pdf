import { snackController } from './../components/snack-bar/snack-bar-controller'
import {
  DataStore,
  Predicates,
  DataStoreSnapshot,
  PersistentModel,
  PersistentModelConstructor,
  ProducerModelPredicate,
  ProducerPaginationInput,
  SubscriptionMessage,
  ObserveQueryOptions,
} from '@aws-amplify/datastore'
import { PredicateAll } from '@aws-amplify/datastore/lib-esm/predicates/index'
import Observable from 'zen-observable-ts'

export default class DataStoreService {
  async get<T extends PersistentModel>(
    modelConstructor: PersistentModelConstructor<T>,
    criteria?: ProducerModelPredicate<T> | typeof PredicateAll,
    paginationProducer?: ProducerPaginationInput<T>
  ): Promise<T[] | undefined> {
    try {
      const items = await DataStore.query(modelConstructor, criteria, paginationProducer)
      return items
    } catch (error) {
      this.handleError(error)
    }
  }

  async create<T extends PersistentModel>(model: T): Promise<T | undefined> {
    try {
      const item = await DataStore.save(model)
      return item
    } catch (error) {
      this.handleError(error)
    }
  }

  async update<T extends PersistentModel>(
    modelConstructor: PersistentModelConstructor<T>,
    model: any
  ): Promise<T | undefined> {
    try {
      const original = await DataStore.query(modelConstructor, model.id)
      if (!original) {
        throw `Item with id: ${model.id} not found !`
      }

      const updatedItem = await DataStore.save(
        modelConstructor.copyOf(original!, (updated) => {
          const keys = Object.keys(model)
          keys.forEach((key) => {
            ;(updated as any)[key] = model[key]
          })
        })
      )
      return updatedItem
    } catch (error) {
      this.handleError(error)
    }
  }

  async deleteById<T extends PersistentModel>(
    modelConstructor: PersistentModelConstructor<T>,
    id: string
  ): Promise<T[] | undefined> {
    try {
      const item = await DataStore.delete(modelConstructor, id)
      return item
    } catch (error) {
      this.handleError(error)
    }
  }

  observeQuery<T extends PersistentModel>(
    modelConstructor: PersistentModelConstructor<T>,
    criteria?: ProducerModelPredicate<T> | typeof PredicateAll,
    paginationProducer?: ObserveQueryOptions<T>
  ): Observable<DataStoreSnapshot<T>> | undefined {
    try {
      return DataStore.observeQuery(modelConstructor, criteria, paginationProducer)
    } catch (error) {
      this.handleError(error)
    }
  }

  observe<T extends PersistentModel>(
    modelConstructor: PersistentModelConstructor<T>,
    criteria?: string | ProducerModelPredicate<T>
  ): Observable<SubscriptionMessage<T>> | undefined {
    try {
      return DataStore.observe(modelConstructor, criteria)
    } catch (error) {
      this.handleError(error)
    }
  }

  handleError(error) {
    snackController.error(error)
  }
}

export const datastoreService = new DataStoreService()
