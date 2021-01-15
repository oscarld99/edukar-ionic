/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Plugins } from '@capacitor/core'

const { Storage } = Plugins

export default class StorageJobs {
  private static instance: StorageJobs

  public static getInstance (): StorageJobs {
    if (!StorageJobs.instance) {
      StorageJobs.instance = new StorageJobs()
    }
    return StorageJobs.instance
  }

  async setObject (key: string, obj: any) {
    await Storage.set({
      key: key,
      value: JSON.stringify(obj)
    })
  }

  async getObject (key: string) {
    const ret = await Storage.get({ key })
    const obj = JSON.parse(ret.value + '')
    return obj
  }

  /* async setItem () {
    await Storage.set({
      key: 'name',
      value: 'Max'
    })
  }

  async getItem () {
    const { value } = await Storage.get({ key: 'name' })
    console.log('Got item: ', value)
  }

  async removeItem () {
    await Storage.remove({ key: 'name' })
  }

  async keys () {
    const { keys } = await Storage.keys()
    console.log('Got keys: ', keys)
  } */

  async clear () {
    await Storage.clear()
  }
}
