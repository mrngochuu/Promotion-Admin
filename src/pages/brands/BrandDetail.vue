<template>
  <div class="brandDetail">
  <page-layout :title="brandObject.brandName">
    <detail-list size="large" :col="1" slot="headerContent">
      <detail-list-item term="Company">{{ brandObject.companyName }}</detail-list-item>
      <detail-list-item term="Center address">{{ brandObject.centerAddress }}</detail-list-item>
      <detail-list-item term="Website">{{ brandObject.website }}</detail-list-item>
      <detail-list-item term="VAT code">{{ brandObject.vatcode }}</detail-list-item>
      <detail-list-item term="Description">{{ brandObject.description }}</detail-list-item>
      <detail-list-item term="Created date">
        <span>{{ brandObject.createdDate | substringDate }}</span>
        <div class="div_action">
                <span v-if="brandObject.isActive" slot="actions"><div class="active">ACTIVE</div></span>
                <span v-else slot="actions" class="inactive"><div class="inactive">INACTIVE</div></span>
        </div>
      </detail-list-item>
      <img src="../../assets/img/brand-default.jpg" alt="Brand" height="250" style="position: absolute; top: -100px; right: 0px;"/>
      <detail-list type="inner" title="Contact">
        <detail-list-item term="Contact person"> {{ brandObject.contactPerson }}</detail-list-item>
        <detail-list-item term="Phone">{{ brandObject.phoneNumber }}</detail-list-item>
        <detail-list-item term="Fax">{{ brandObject.fax }}</detail-list-item>
      </detail-list>
    </detail-list>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="Store list"
    >
      <div slot="extra">
        <a-radio-group v-model="activeMode">
          <a-radio-button value='0'>All status</a-radio-button>
          <a-radio-button value='1'>Active</a-radio-button>
          <a-radio-button value='2'>Inactive</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" placeholder="Title" v-model="storeValue" />
      </div>
      <a-list size="large">
          <standard-table
            :columns="columns"
            :dataSource="showList"
          >
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle" />
        </template>
      </standard-table>
      </a-list>
    </a-card>
  </page-layout>
  </div>
</template>

<script>
import PageLayout from '@/layouts/PageLayout'
import StandardTable from '@/components/table/StandardTable'
import DetailList from '@/components/tool/DetailList'
import {operation1, operation2, operation3, operationColumns} from '@/mock/common/tableData'
import {mapState} from 'vuex'
// import HeadInfo from '@/components/tool/HeadInfo';

import {getBrandById,getStoreByBrandId} from '@/services/brand'


const DetailListItem = DetailList.Item

export default {
  name: 'BrandDetail',
  components: {DetailListItem, DetailList, PageLayout, StandardTable},
  data () {
    return {
      storeValue: '',
      brandObject: {},
      storeList: [],
      activeMode: '0',
      columns: [
        {title: 'Store', dataIndex: 'storeName'},
        // {title: 'BirthDate', dataIndex: 'dateOfBirth'},
        {title: 'Address', dataIndex: 'address'},
        // {title: 'Phone', dataIndex: 'phone'},
        {title: 'Open time', dataIndex: 'openTime'},
        // {title: 'Address', dataIndex: 'userAddress'},
        {title: 'Close time', dataIndex: 'closeTime'},
        {title: 'Report date', dataIndex: 'reportDateStr'},
        {title: 'Available', dataIndex: 'avaiableStr'},
        {title: 'Active', dataIndex: 'activeStr'}
      ],
    }
  },
  mounted () {
    this.initPage()
  },
  computed: {
    showList () {
      let result = this.storeList
      if(this.storeValue !== null || this.storeValue !== '' ) {
        result = result.filter(item => item.storeName.includes(this.storeValue))
      }
      if(this.activeMode === '1') {
        result = result.filter(item => item.isActive)
      }
      if(this.activeMode === '2') {
        result = result.filter(item => !item.isActive)
      }
      return result
    }
  },
  methods: {
    initPage () {
      let brandId = this.$router.currentRoute.params.id
      if(brandId === undefined || brandId === null || brandId === '' || isNaN(parseInt(brandId))) {
        this.$router.push('/brands/brand-list')
      } else {
        new Promise((resolve, reject) => {
          resolve()
        }).then(res => {
          return getBrandById(brandId)
        }).then(res => {
          this.brandObject = res.data
        }).then(res => {
          return getStoreByBrandId(brandId)
        }).then(res => {
          this.storeList = res.data
          this.storeList.forEach(element => {
            element.activeStr = element.isActive.toString()
            element.avaiableStr = element.isAvailable.toString()
            element.reportDateStr = element.reportDate.toString().substring(0,10)
          })
        })
      }
      
    },
  },
  filters: {
    substringDate (text) {
        if(text !== null || text !== '')
        return text.substring(0,10);
    }
  }
}
</script>

<style lang="less" scoped>
.brandDetail {
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
  .div_action {
      display: inline;
      margin-left: 30px;
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
        padding: 2px 7px;
        font-size: 13px;
        color: white !important;
      }
  }
}
</style>
