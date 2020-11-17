<template>
  <div class="transaction">
    <a-card :bordered="false">
      <div style="display: flex; flex-wrap: wrap">
          <head-info title="Total transaction" :content="countTotal" :bordered="true"/>
          <head-info title="Processing" :content="countProcessing" :bordered="true"/>
          <head-info title="Complete" :content="countComplete"/>
      </div>
    </a-card>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="Transaction list"
    >
      <div slot="extra">
        <a-radio-group v-model="statusMode">
          <a-radio-button value='0'>All status</a-radio-button>
          <a-radio-button value='1'>Processing</a-radio-button>
          <a-radio-button value='2'>Complete</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" placeholder="Title" v-model="searchValue" />
      </div>
      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item :key="index" v-for="(item, index) in showList">
          <a-list-item-meta>
            <a slot="title" class="title">{{ item.request.shortDescription }}</a>
            <div slot="title" class="empty"></div>
            <div slot="title" class="div_action">
                <span slot="actions"><i class="far fa-clock" style="margin-right: 8px" aria-hidden="true"></i>{{ item.request.duration }} minutes</span>
            </div>
            <div slot="title" class="div_action">
                <span slot="actions"><i class="far fa-bell" style="margin-right: 8px"></i><div :class="item.status.toLowerCase() === 'waitting' ? 'waitting' : (item.status.toLowerCase() === 'processing' ? 'processing' : 'complete')">{{ item.status | toUpperCase }}</div></span>
            </div>
            <div slot="title" class="div_action">
                <span v-if="item.active" slot="actions"><a-icon type="transaction" style="margin-right: 8px"/><div class="money">{{ item.totalPrice | renderMoney }} VND</div></span>
            </div>
          </a-list-item-meta>
          <!-- <div slot="actions">
            <a>编辑</a>
          </div> -->
          <!-- <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>编辑</a></a-menu-item>
                <a-menu-item><a>删除</a></a-menu-item>
              </a-menu>
              <a>更多<a-icon type="down"/></a>
            </a-dropdown>
          </div> -->
          <div class="list-content">
            <div class="list-content-item">
              <span>Student</span>
              <p>{{ item.request.student.email }}</p>
            </div>
            <div class="list-content-item">
              <span>Resolver</span>
              <p>{{ item.requestApply.resolver.email }}</p>
            </div>
            <div class="list-content-item">
              <span>Create date</span>
              <p>{{ item.dateCreate }}</p>
            </div>
            <div class="list-content-item">
              <span>Process</span><br>
              <a-progress :percent="item.status.toLowerCase() === 'waitting' ? 0 : (item.status.toLowerCase() === 'processing' ? 50 : 100)" style="width: 80px" />
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '../../components/tool/HeadInfo'
import {getTransactionList} from '@/services/transaction'

export default {
  name: 'Transaction',
  components: {HeadInfo},
  data () {
    return {
        requestData: [],
        statusMode: '0',
        searchValue: ''
    }
  },
  mounted () {
    this.initPage()
  },
  computed: {
    showList() {
        let result = this.requestData
        if(this.searchValue !== null && this.searchValue !== '') {
            result = result.filter(item => item.request.shortDescription.includes(this.searchValue))
        }
        if(this.statusMode === '1')
            return result.filter(item => item.status.toLowerCase() === 'processing')
        if(this.statusMode === '2')
            return result.filter(item => item.status.toLowerCase() === 'complete')
        return result
    },
    countTotal () {
        return this.requestData.length
    },
    countProcessing () {
        return this.requestData.filter(item => item.status.toLowerCase() === 'processing').length
    },
    countComplete () {
        return this.requestData.filter(item => item.status.toLowerCase() === 'complete').length
    },
  },
  methods: {
    initPage () {
      new Promise((resolve, reject) => {
        resolve()
      }).then(res => {
        return getTransactionList()
      }).then(res => {
        this.requestData = res.data.result
      })
    },
  },
  filters: {
    renderMoney (value) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  }
}
</script>

<style lang="less" scoped>
.transaction {
  .list-content-item{
    color: @text-color-second;
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    span{
      line-height: 20px;
    }
    p{
      margin: 4px 0 0;
      line-height: 22px;
    }
  }
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  .empty {
    margin-top: 15px;
  }
  .div_action {
      margin-top: 10px;
      display: inline;
      padding-right: 15px;
      .money {
          display: inline;
      }
      .active {
        background-color: green;
        display: inline;
        border-radius: 5px;
        padding: 2px 20px;
        font-size: 13px;
        color: white !important;
      }
      .inactive {
        background-color: red;
        display: inline;
        border-radius: 5px;
        padding: 2px 20px;
        font-size: 13px;
        color: white !important;
      }
      .watting {
        background-color: #edf285;
        display: inline;
        border-radius: 5px;
        padding: 2px 30px;
        font-size: 13px;
        color: white !important;
      }
      .processing {
        background-color: #41aea9;
        display: inline;
        border-radius: 5px;
        padding: 2px 20px;
        font-size: 13px;
        color: white !important;
      }
      .complete {
        background-color: #ec524b;
        display: inline;
        border-radius: 5px;
        padding: 2px 26px;
        font-size: 13px;
        color: white !important;
      }
    }
} 
</style>
