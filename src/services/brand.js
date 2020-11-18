import {BRANDS, BRANDBYID} from '@/services/api'
import {request, METHOD} from '@/utils/request'

export async function getBrandList() {
  return request(BRANDS, METHOD.GET)
}

export async function getBrandById(brandId) {
  return request(BRANDS, METHOD.GET,BRANDBYID)
}

export default {
  getBrandList,
  getBrandById,
}
