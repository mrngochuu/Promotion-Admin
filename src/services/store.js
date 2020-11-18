import {STORES} from '@/services/api'
import {request, METHOD} from '@/utils/request'

export async function getStoreListByBrand() {
  return request(STORES, METHOD.GET)
}

export default {
  getStoreListByBrand,
}
