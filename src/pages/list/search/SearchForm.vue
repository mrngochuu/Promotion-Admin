<template>
  <a-card :bordered="false" class="search-form">
    <a-form :form="form">
      <form-row label="User" style="padding-bottom: 11px">
        <a-row>
          <a-col :offset="1" :span="8" class="components-input-demo-presuffix">
            <a-form-item :wrapperCol="{span: 24}">
              <a-input ref="userNameInput" v-model="userName" placeholder="Username" @change="searchUser">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :offset="1" :span="8" class="components-input-demo-presuffix">
            <a-form-item :wrapperCol="{span: 24}">
              <a-input ref="TitleInput" v-model="title" placeholder="Title" @change="searchTitle">
                <a-icon slot="prefix" type="file-search" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :offset="1" :span="3">
            <a-form-item :wrapperCol="{span: 4}">
              <a-button @click="lookOption">Optional</a-button>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="4">
            <a-form-item :wrapperCol="{span: 4}">
              <a-button @click="search"><i class="fas fa-search" style="margin-right: 8px;"></i>Search</a-button>
            </a-form-item>
          </a-col> -->
        </a-row>
      </form-row>
      <form-row label="Options" v-show="optionFlg">
        <a-row>
          <a-col :span="6" style="margin-left: 23px;">
            <a-form-item :wrapperCol="{span: 24}">
              <a-select placeholder="Status" v-model="status">
                <a-select-option value="0">All status</a-select-option>
                <a-select-option value="1">Watting</a-select-option>
                <a-select-option value="2">Processing</a-select-option>
                <a-select-option value="3">Complete</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :offset="1" :span="6">
            <a-form-item :wrapperCol="{span: 24}"
            >
              <a-select placeholder="Active" v-model="active">
                <a-select-option value="0">All active</a-select-option>
                <a-select-option value="1">Active</a-select-option>
                <a-select-option value="2">Inactive</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </form-row>
        
    </a-form>
  </a-card>
</template>

<script>
import TagSelect from '../../../components/tool/TagSelect'
import FormRow from '../../../components/form/FormRow'

const TagSelectOption = TagSelect.Option

export default {
  name: 'SearchForm',
  components: {FormRow},
  data() {
    return {
      form: this.$form.createForm(this),
      optionFlg: false,
      status: '0',
      active: '0',
      userName: '',
      title: '',
    }
  },
  watch: {
    status () {
      this.$emit('status-change', this.status)
    },
    active () {
      this.$emit('active-change', this.active)
    }
  },
  methods: {
    lookOption () {
      this.optionFlg = !this.optionFlg
    },
    searchUser () {
      this.$emit('search-user', this.userName)
    },
    searchTitle () {
      this.$emit('search-title', this.title)
    }
  }
}
</script>

<style lang="less" scoped>
  .search-form{
    margin-bottom: 24px;
  }
</style>
