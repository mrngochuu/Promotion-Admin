<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced ? null: 'fold'">
          <a-row >
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="Username"
              :labelCol="{span: 7}"
              :wrapperCol="{span: 16, offset: 1}"
            >
              <a-input placeholder="Username" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="Role"
              :labelCol="{span: 7}"
              :wrapperCol="{span: 16, offset: 1}"
            >
              <a-select placeholder="Role" defaultValue="0">
                <a-select-option value="0" @click="selectRole(0)">All</a-select-option>
                <a-select-option value="1" @click="selectRole(1)">Leaner</a-select-option>
                <a-select-option value="2" @click="selectRole(2)">Coach</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="Status"
              :labelCol="{span: 7}"
              :wrapperCol="{span: 16, offset: 1}"
            >
              <a-select placeholder="Status" defaultValue="0">
                <a-select-option value="0">All</a-select-option>
                <a-select-option value="1">Active</a-select-option>
                <a-select-option value="2">Inactive</a-select-option>
                <a-select-option value="3">Unconfirmed</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
          <a-row v-if="isCoach">
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="Major"
              :labelCol="{span: 7}"
              :wrapperCol="{span: 16, offset: 1}"
            >
              <a-select placeholder="Major" defaultValue="0">
                <a-select-option value="0">All</a-select-option>
                <a-select-option value="architecture">Architecture</a-select-option>
                <a-select-option value="art">Art</a-select-option>
                <a-select-option value="bussiness">Bussiness</a-select-option>
                <a-select-option value="communication">Communication</a-select-option>
                <a-select-option value="computerscience">Computer science</a-select-option>
                <a-select-option value="doctor">Doctor</a-select-option>
                <a-select-option value="languages">Languages</a-select-option>
                <a-select-option value="mathematic">Mathematic</a-select-option>
                <a-select-option value="other">Orther</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="Certificate"
              :labelCol="{span: 7}"
              :wrapperCol="{span: 16, offset: 1}"
            >
              <a-select placeholder="Certificate" defaultValue="0">
                <a-select-option value="0">All</a-select-option>
                <a-select-option value="1">Associate</a-select-option>
                <a-select-option value="2">Bachelor</a-select-option>
                <a-select-option value="3">Master</a-select-option>
                <a-select-option value="4">Doctoral</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="Exp. year"
              :labelCol="{span: 7}"
              :wrapperCol="{span: 16, offset: 1}"
            >
              <a-input-number :min="0" placeholder="Year" :disable="disableYear"/>
              <a-button type="primary" @click="selectYear()" style="margin-left: 10px;">
                Choose
              </a-button>
            </a-form-item>
            
          </a-col>
        </a-row>
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="clearDataSearch()">Clear</a-button>
          <a-button type="submit" style="margin-left: 8px; width: 150px;" icon="search" @click="search()" >Search</a-button>
        </span>
      </a-form>
    </div>
    <div>
      <standard-table
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows.sync="selectedRows"
        @clear="onClear"
        @change="onChange"
        @selectedRowChange="onSelectChange"
      >
        <div slot="action" slot-scope="{text}">
          <a style="margin-right: 8px" v-if="text.status === 'Unconfirmed'">
            <a-icon type="plus"/> Accept
          </a>
          <a style="margin-right: 8px" v-if="text.status === 'Unconfirmed'">
            <a-icon type="edit"/> Ignore
          </a>
          <a v-if="text.status === 'Active'">
            <a-icon type="delete" /> Block
          </a>
          <a v-if="text.status === 'InActive'">
            <a-icon type="plus" /> Unblock
          </a>
        </div>
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle" />
        </template>
      </standard-table>
    </div>
  </a-card>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
// const columns = [
//   {
//     title: 'Id',
//     dataIndex: 'no'
//   },
//   {
//     title: 'Username',
//     dataIndex: 'description',
//     scopedSlots: { customRender: 'description' }
//   },
//   {
//     title: 'Fullname',
//     dataIndex: 'callNo',
//     sorter: true,
//     needTotal: true,
//     customRender: (text) => text + ' 次'
//   },
//   {
//     dataIndex: 'status',
//     needTotal: true,
//     slots: {title: 'statusTitle'}
//   },
//   {
//     title: '更新时间',
//     dataIndex: 'updatedAt',
//     sorter: true
//   },
//   {
//     title: '操作',
//     scopedSlots: { customRender: 'action' }
//   }
// ]

// const dataSource = []

// for (let i = 0; i < 100; i++) {
//   dataSource.push({
//     key: i,
//     no: 'NO ' + i,
//     description: 'This is a description',
//     callNo: Math.floor(Math.random() * 1000),
//     status: Math.floor(Math.random() * 10) % 4,
//     updatedAt: '2018-07-26'
//   })
// }

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    sorter: true
  },
  {
    title: 'Username',
    dataIndex: 'username',
  },
  {
    title: 'Fullname',
    dataIndex: 'fullname',
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
  {
    title: 'Create Date',
    dataIndex: 'createDate',
    sorter: true
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    scopedSlots: { customRender: 'action' }
  }
]

const dataSource = []

for (let i = 0; i < 100; i++) {
  dataSource.push({
    key: i,
    id: i,
    username: 'MrNgocHuu',
    fullname: 'Do Ngoc Huu',
    role: Math.floor(Math.random() * 2) === 1 ? 'Coach': 'Leaner',
    status: Math.floor(Math.random() * 2) === 1 ? 'Active' : 'InActive',
    createDate: '08/11/2020'
  })
}

export default {
  name: 'QueryList',
  components: {StandardTable},
  data () {
    return {
      advanced: true,
      columns: columns,
      dataSource: dataSource,
      selectedRows: [],
      isCoach: false,
      disableYear: true,
    }
  },
  authorize: {
    deleteRecord: 'delete'
  },
  computed: {

  },
  methods: {
    selectYear() {
      this.disableYear = !this.disableYear
    },
    selectRole (value) {
      if(value === 2) {
        this.isCoach = true
      } else {
        this.isCoach = false
      }
    },
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter(item => item.key !== key)
      this.selectedRows = this.selectedRows.filter(item => item.key !== key)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    remove () {
      this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
      this.selectedRows = []
    },
    onClear() {
      this.$message.info('You cleared all checked rows.')
    },
    onStatusTitleClick() {
      this.$message.info('You clicked on the status title.')
    },
    onChange() {
      this.$message.info('Status changed')
    },
    onSelectChange() {
      this.$message.info('The selected row has changed')
    },
    addNew () {
      this.dataSource.unshift({
        key: this.dataSource.length,
        no: 'NO ' + this.dataSource.length,
        description: 'This is a description',
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: '08/11/2020'
      })
    },
    handleMenuClick (e) {
      if (e.key === 'delete') {
        this.remove()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search{
    margin-bottom: 54px;
  }
  .fold{
    width: calc(100% - 216px);
    display: inline-block
  }
  .operator{
    margin-bottom: 18px;
  }
  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
