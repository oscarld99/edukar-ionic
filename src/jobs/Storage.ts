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

  async setObject (key: string, obj: any): Promise<void> {
    await Storage.set({
      key: key,
      value: JSON.stringify(obj)
    })
  }

  async getObject<T> (key: string): Promise<T | null> {
    const { value } = await Storage.get({ key })
    if (value === null) return value
    const obj = JSON.parse(value)
    return obj
  }

  async setItem (key: string, value: string): Promise<void> {
    await Storage.set({
      key,
      value
    })
  }

  async getItem (key: string): Promise<string | null> {
    const { value } = await Storage.get({ key })
    return value
  }

  async removeItem (key: string): Promise<void> {
    await Storage.remove({ key })
  }

  async keys (): Promise<string[]> {
    const { keys } = await Storage.keys()
    return keys
  }

  async clear (): Promise<void> {
    await Storage.clear()
  }
}
