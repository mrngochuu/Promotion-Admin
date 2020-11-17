import {TRANSACTIONS} from '@/services/api'
import {request, METHOD} from '@/utils/request'

export async function getTransactionList() {
  return request(TRANSACTIONS, METHOD.GET)
}

export default {
    getTransactionList
}
