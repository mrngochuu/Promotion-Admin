import {BRANDS} from '@/services/api'
import {request, METHOD} from '@/utils/request'

export async function getBrandList() {
  return request(BRANDS, METHOD.GET)
}

export async function getBrandById(brandId) {
  return request(BRANDS + "/" +brandId, METHOD.GET)
}

export async function getStoreByBrandId(brandId) {
  return request(BRANDS + "/" +brandId + "/stores", METHOD.GET)
}

export default {
  getBrandList,
  getBrandById,
  getStoreByBrandId
}
