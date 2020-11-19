import {STORES} from '@/services/api'
import {request, METHOD} from '@/utils/request'

export async function createPromotion() {
  return request(STORES, METHOD.POST)
}

export default {
    createPromotion,
}
