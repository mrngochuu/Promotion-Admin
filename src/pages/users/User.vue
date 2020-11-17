<template>
  <div>
  <a-card :bordered="false" style="margin-bottom: 24px;">
        <div style="display: flex; flex-wrap: wrap">
            <head-info title="Member active" :content="countTotalUser" :bordered="true"/>
            <head-info title="User" :content="countTotalStudy" :bordered="true"/>
            <head-info title="Resolver" :content="countTotalResolver" :bordered="true"/>
            <head-info title="Status active" :content="countTotalStatusActive" :bordered="true" />
            <head-info title="Status inactive" :content="countTotalStatusInactive" />
        </div>
  </a-card>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced ? null: 'fold'">
          <a-row >
            <a-col :span="16" >
              <a-form-item
                label="Username"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 16, offset: 1}"
              >
                <a-input placeholder="Username" v-model="usernameValue"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="Role"
                :labelCol="{span: 7}"
                :wrapperCol="{span: 16, offset: 1}"
              >
                <a-select placeholder="Role" defaultValue="0" v-model="roleValue">
                  <a-select-option value="0">All role</a-select-option>
                  <a-select-option value="1">User</a-select-option>
                  <a-select-option value="2">Resolver</a-select-option>
                  <a-select-option value="3">Administrator</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :offset="16" :span="8">
              <a-form-item
                label="Active"
                :labelCol="{span: 7}"
                :wrapperCol="{span: 16, offset: 1}"
              >
                <a-select placeholder="Active" defaultValue="0" v-model="activeValue">
                  <a-select-option value="0">All active</a-select-option>
                  <a-select-option value="1">Active</a-select-option>
                  <a-select-option value="2">Inactive</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :offset="16" :span="8">
              <a-form-item
                label="Status"
                :labelCol="{span: 7}"
                :wrapperCol="{span: 16, offset: 1}"
              >
                <a-select placeholder="Status" defaultValue="0" v-model="statusValue">
                  <a-select-option value="0">All status</a-select-option>
                  <a-select-option value="1">Active</a-select-option>
                  <a-select-option value="2">Inactive</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </a-form>
    </div>
    <div>
      <standard-table
        :columns="columns"
        :dataSource="showList"
        @clear="onClear"
        @change="onChange"
        @selectedRowChange="onSelectChange"
      >
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle" />
        </template>
      </standard-table>
    </div>
  </a-card>
  </div>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
import {getUserList} from '@/services/user'
import HeadInfo from '../../components/tool/HeadInfo'

export default {
  name: 'UserList',
  components: {StandardTable, HeadInfo},
  data () {
    return {
      advanced: true,
      columns: [
        {title: 'Username', dataIndex: 'email'},
        // {title: 'BirthDate', dataIndex: 'dateOfBirth'},
        {title: 'Fullname', dataIndex: 'fullName'},
        // {title: 'Phone', dataIndex: 'phone'},
        {title: 'Gender', dataIndex: 'userGender'},
        // {title: 'Address', dataIndex: 'userAddress'},
        {title: 'Active', dataIndex: 'activeStr'},
        {title: 'Status', dataIndex: 'status'},
        {title: 'Role', dataIndex: 'roleStr'},
        {title: 'Level', dataIndex: 'level'}
      ],
      selectedRows: [],
      disableYear: true,
      userList: [],
      roleValue: '0',
      statusValue: '0',
      activeValue: '0',
      usernameValue: '',
    }
  },
  beforeCreate: {

  },
  mounted () {
    this.initPage()
  },
  computed: {
    countTotalUser () {
      return this.userList.filter(item => item.active).length
    },
    countTotalStatusActive () {
      return this.userList.filter(item => item.status.toLowerCase() === 'active' && item.active).length
    },
    countTotalStatusInactive () {
      return this.userList.filter(item => item.status.toLowerCase() !== 'active' && item.active).length
    },
    countTotalStudy () {
      return this.userList.filter(item => item.roleStr.toLowerCase() === 'user' && item.active).length
    },
    countTotalResolver () {
      return this.userList.filter(item => item.roleStr.toLowerCase() === 'resolver' && item.active).length
    },
    showList() {
      let result = this.userList
      if (this.usernameValue !== null && this.usernameValue !== '') {
        result = result.filter(item => item.email.includes(this.usernameValue))
      }

      if (this.activeValue === '1') {
        result = result.filter(item => item.active)
      } else if (this.activeValue === '2') {
        result = result.filter(item => !item.active)
      }

      if (this.roleValue === '1') {
        result = result.filter(item => item.role.id.toLowerCase() === 'user')
      } else if (this.roleValue === '2') {
        result = result.filter(item => item.role.id.toLowerCase() === 'resolver')
      } else if (this.roleValue === '3') {
        result = result.filter(item => item.role.id.toLowerCase() === 'admin')
      }

      if (this.statusValue === '1') {
        result = result.filter(item => item.status.toLowerCase() === 'active')
      } else if (this.statusValue === '2') {
        result = result.filter(item => item.status.toLowerCase() === 'inactive')
      }
      return result
    }
  },
  methods: {
    initPage() {
      new Promise((resolve, reject) => {
        resolve()
      }).then(res => {
        return getUserList()
      }).then(res => {
        this.userList = res.data.result
        this.userList.forEach(user => {
          user.roleStr = user.role.name,
          user.activeStr = user.active ? 'active' : 'inactive'
        })
      })
    },
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
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    remove () {
      // this.userList = this.userList.filter(item => this.selectedRows.findIndex(row => row.id === item.id) === -1)
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
      // this.dataSource.unshift({
      //   key: this.dataSource.length,
      //   no: 'NO ' + this.dataSource.length,
      //   description: 'This is a description',
      //   callNo: Math.floor(Math.random() * 1000),
      //   status: Math.floor(Math.random() * 10) % 4,
      //   updatedAt: '08/11/2020'
      // })
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
