<template>
  <div class="brandList">
    <search-form 
      @search-brand="searchBrand" 
      @search-company="searchCompany" 
      @search-time="searchTime" 
      @search-active="searchActive"  />
    <a-list
      class="list"
      :grid='{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }'
      style="margin: 0 -8px;"
      size = 'small'
      :pagination="paginationValue"
    >
      <a-list-item :key="index" v-for="(item, index) in paging" style="padding: 0 8px">
        <a-card @click="showDetails(item)">
          <img slot="cover" src="../../assets/img/brand-default.jpg" alt="Brand" height="154"/>
          <a-card-meta :title="item.brandName">
            <div slot="description">
                <span style="font-weight: bold;">{{ item.companyName }}</span>
            </div>
            <div slot="description" style="height: 100px;min-height: 100px;max-height: 100px; margin-top: 5px;">
              <span>{{ item.description | substringText}}</span>
            </div>
          </a-card-meta>
          <div class="content">
            <span>{{ item.createdDate | substringDate }}</span>
            <div class="div_action">
                <span v-if="item.isActive" slot="actions"><div class="active">ACTIVE</div></span>
                <span v-else slot="actions" class="inactive"><div class="inactive">INACTIVE</div></span>
            </div>
          </div>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import SearchForm from '../list/search/SearchForm'
import {getBrandList} from '@/services/brand'
import {getRoutesConfig} from '@/services/user'
import {loadRoutes} from '@/utils/routerUtil'

export default {
  name: 'BrandList',
  components: {SearchForm},
  data () {
    return {
      brandList: [],
      activeValue: '',
      companyValue: '',
      brandValue: '',
      timeValue: {
        from: null,
        to: null
      },
      pagination: {
        pageSize: 8, 
        showQuickJumper:true,
        showLessItems:true,
        current:1,
        total: 50,
        onChange: this.onPageChange
      }
    }
  },
  mounted () {
    this.initPage()
  },
  computed: {
    paginationValue () {
      return {
        pageSize: 8, 
        showQuickJumper:true,
        showLessItems:true,
        current: this.pagination.current,
        total: this.showList.length,
        onChange: this.onPageChange
      }
    },
    paging () {
        let result = this.showList
        if(result.length > this.paginationValue.pageSize) {
            result = result.filter(item => (result.indexOf(item) >= ((this.pagination.current - 1) * this.pagination.pageSize) && result.indexOf(item) <= (this.pagination.current * this.pagination.pageSize - 1)))
        }
        return result
    },
    showList () {
        let result  = this.brandList

        //search by Brand
        if(this.brandValue !== null || this.brandValue !== '') {
            result = result.filter(item => item.brandName.includes(this.brandValue))
        }

        // search by Company
        if(this.companyValue !== null || this.companyValue !== '') {
            result = result.filter(item => item.companyName.includes(this.companyValue))
        }

        // search by Date
        if(this.timeValue.from !== null && this.timeValue.to !== null) {
            result = result.filter(item => new Date(item.createdDate) >= this.timeValue.from && new Date(item.createdDate) <= this.timeValue.to)
        }

        // search by Active
        if(this.activeValue === '1') {
            result = result.filter(item => item.isActive)
        }

        if(this.activeValue === '2') {
            result = result.filter(item => !item.isActive)
        }
        return result
    }
  },
  methods: {
    initPage () {
      new Promise((resolve, reject) => {
        resolve()
      }).then(res => {
        return getBrandList()
      }).then(res => {
        this.brandList = res.data
      }).then(res => {
        this.brandList.sort((a,b) => new Date(b.createdDate) - new Date(a.createdDate))
      })
    },
    searchBrand (value) {
        this.brandValue = value
    },
    searchCompany (value) {
        this.companyValue = value
    },
    searchTime (value) {
        if(value.length === 0) {
            this.timeValue.from = null
            this.timeValue.to = null
        } else {
            this.timeValue.from = new Date(value[0])
            this.timeValue.to = new Date(value[1])
        }
    },
    searchActive (value) {
        this.activeValue = value
    },
    onPageChange(page, pageSize) {
        this.pagination.current = page
        this.pagination.pageSize = pageSize
    },
    showDetails(item) {
      getRoutesConfig().then(result => {
          const routesConfig = result.data.data
          loadRoutes(routesConfig)
          this.$router.push('/brand-detail')
          this.$message.success('Welcome back')
      })
        // this.$router.push('/brands/brand-detail')
    }
  },
  filters: {
    substringText (text) {
      if(text !== null || text !== '')
      text = text.substring(0, 100)
      if(text.length == 100) text += " ...";
      return text
    },
    substringDate (text) {
        if(text !== null || text !== '')
        return text.substring(0,10);
    }
  }
}
</script>

<style lang="less" scoped>
.brandList {
  .content{
    display: flex;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;
    height: 20px;
    & > span {
      color: @text-color-second;
      flex: 1;
      font-size: 12px;
    }
    .avatarList {
      flex: 0 1 auto;
    }
  }
  .div_action {
      display: inline;
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
