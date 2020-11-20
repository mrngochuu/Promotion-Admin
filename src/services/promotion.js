import {PROMOTIONS} from '@/services/api'
import {request, METHOD} from '@/utils/request'

const CREATE = '/create-promotion'
export async function createPromotion(param) {
  return request(PROMOTIONS + CREATE, METHOD.POST, param)
}

export default {
    createPromotion,
}
