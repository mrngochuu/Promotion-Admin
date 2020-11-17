import {REQUESTS} from '@/services/api'
import {request, METHOD} from '@/utils/request'

export async function getRequestList() {
  return request(REQUESTS, METHOD.GET)
}

export default {
    getRequestList,
}
