<template>
  <div class="request">
    <a-card :bordered="false" style="margin-bottom: 24px;">
      <div style="display: flex; flex-wrap: wrap">
          <head-info title="Total request" :content="countTotalRequest" :bordered="true"/>
          <head-info title="Watting" :content="countTotalWatting" :bordered="true"/>
          <head-info title="Processing" :content="countTotalProcessing" :bordered="true"/>
          <head-info title="Complete" :content="countTotalComplete" />
      </div>
    </a-card>
    <search-form 
      @search-user="searchUser" 
      @search-title="searchTitle" 
      @status-change="statusChange" 
      @active-change="activeChange" 
    />
    <a-card :bordered="false">
      <a-list itemLayout="vertical" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item :key="index" v-for="(item, index) in showList">
          <div class="content">
            <div class="detail">
              {{ item.shortDescription }}
            </div>
            <div class="author">
              <a-icon type="user" />
              <span class="email">{{ item.student.email }}</span>
              <em>{{ item.dateCreate }}</em>
            </div>
          </div>
          <div class="div_action">
            <span slot="actions"><i class="far fa-clock" style="margin-right: 8px" aria-hidden="true"></i>{{ item.duration }} minutes</span>
          </div>
          <div class="div_action">
            <span slot="actions"><i class="far fa-bell" style="margin-right: 8px"></i><div :class="item.status.toLowerCase() === 'waiting' ? 'waitting' : (item.status.toLowerCase() === 'processing' ? 'processing' : 'complete')">{{ item.status | toUpperCase }}</div></span>
          </div>
          <div class="div_action">
            <span v-if="item.active" slot="actions"><i class="far fa-check-circle" style="margin-right: 8px"></i><div class="active">ACTIVE</div></span>
            <span v-else slot="actions" class="inactive"><i class="far fa-check-circle" style="margin-right: 8px"></i><div class="inactive">INACTIVE</div></span>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '../../components/tool/HeadInfo'
import SearchForm from './../list/search/SearchForm'
import {getRequestList} from '@/services/request'

export default {
  name: 'Request',
  components: {SearchForm, HeadInfo},
  data () {
    return {
      requestList: [],
      statusValue: '',
      activeValue: '',
      usernameValue: '',
      titleValue: '',
    }
  },
  mounted () {
    this.initPage()
  },
  computed: {
    countTotalRequest () {
      return this.requestList.length
    },
    countTotalWatting () {
      return this.requestList.filter(item => item.status.toLowerCase() === 'waiting').length
    },
    countTotalProcessing () {
      return this.requestList.filter(item => item.status.toLowerCase() === 'processing').length
    },
    countTotalComplete () {
      return this.requestList.filter(item => item.status.toLowerCase() === 'complete').length
    },
    showList () {
      if(this.statusValue === '' && this.activeValue === '' && this.usernameValue === '' && this.titleValue === '') {
        return this.requestList
      }

      return this.requestList.filter((item) => 
        (this.statusValue === '' || item.status.toLowerCase() === this.statusValue)
        && (this.activeValue === '' || item.active.toString() === this.activeValue)
        && item.student.email.includes(this.usernameValue)
        && item.shortDescription.includes(this.titleValue)
      )
    }
  },
  methods: {
    initPage () {
      new Promise((resolve, reject) => {
        resolve()
      }).then(res => {
        return getRequestList()
      }).then(res => {
        this.requestList = res.data.result
      })
    },
    searchUser (value) {
      this.usernameValue = value
    },
    searchTitle (value) {
      this.titleValue = value
    },
    statusChange (value) {
      this.statusValue = (value === '0' ? '' : (value === '1' ? 'waiting' : (value === '2' ? 'processing' : 'complete')))
    },
    activeChange (value) {
      this.activeValue = (value === '0' ? '' : (value === '1' ? 'true' : 'false'))
    },
  },
  filters: {
    toUpperCase (text) {
      if(text !== null || text !== '')
      return text.toUpperCase()
    }
  }
}
</script>

<style lang="less" scoped>
  .request {
    .tag {
      .ant-tag {
        text-align: center;
        font-weight: bold;
      }
    }
    .extra{
      width: 272px;
      height: 1px;
    }
    .content {
      .detail {
        line-height: 22px;
        max-width: 720px;
        font-size: 20px;
      }
      .author {
        color: @text-color-second;
        margin-top: 16px;
        line-height: 22px;
        & > :global(.ant-avatar) {
            vertical-align: top;
            margin-right: 8px;
            width: 20px;
            height: 20px;
            position: relative;
            top: 1px;
          }
        & > em {
            color: @disabled-color;
            font-style: normal;
            margin-left: 16px;
          }
      }
      .email {
        margin-left: 10px;
        font-weight: bold;
      } 
    }
    .div_action {
      display: inline;
      padding-right: 30px;
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
      .waitting {
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
