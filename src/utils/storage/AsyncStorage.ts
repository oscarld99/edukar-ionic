import StorageJobs from '../../jobs/Storage'

const storageJobs = StorageJobs.getInstance()

export const getItemStorage = async (data: string): Promise<string | null> => {
  return await storageJobs.getItem(data)
}

export const getObjectStorage = async <T>(data: string): Promise<T> => {
  return await storageJobs.getObject<T>(data) as T
}

export const setItemStorage = async (data: string, body: any): Promise<void> => {
  await storageJobs.setItem(data, body)
}

export const setObjectStorage = async (data: string, body: any): Promise<void> => {
  await storageJobs.setObject(data, body)
}
