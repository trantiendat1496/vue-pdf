export const promiseHelper = {
  delay: (miniseconds: number) => new Promise((resolve) => setTimeout(resolve, miniseconds)),
  retry: async function (count: number, waitInMs: number, fn: () => any) {
    let error = null
    while (count > 0) {
      await this.delay(waitInMs)
      try {
        await fn()
        return
      } catch (e) {
        error = e
      }
      count--
    }
    throw error
  },
}
