<template>
  <a-card :bordered="false" class="search-form">
    <a-form :form="form">
      <form-row label="Brand" style="padding-bottom: 11px">
        <a-row>
          <a-col :offset="1" :span="8" class="components-input-demo-presuffix">
            <a-form-item :wrapperCol="{span: 24}">
              <a-input ref="userNameInput" v-model="brandName" placeholder="Brand name" @change="searchBrand">
                <a-icon slot="prefix"><i class="fas fa-bold"></i></a-icon>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :offset="1" :span="8" class="components-input-demo-presuffix">
            <a-form-item :wrapperCol="{span: 24}">
              <a-input ref="TitleInput" v-model="companyName" placeholder="Company name" @change="searchCompany">
                <a-icon slot="prefix"><i class="far fa-building"></i></a-icon>
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
          <a-col :offset="0" :span="9">
            <a-form-item :wrapperCol="{span: 24}"
            >
              <a-range-picker
                format="YYYY-MM-DD"
                :placeholder="['Created from', 'Created to']"
                v-model="time"
                style="margin-left: 30px; width: 336px;"
              />
            </a-form-item>
          </a-col>

          <a-col :offset="1" :span="8" >
            <a-form-item :wrapperCol="{span: 24}" style="margin-left: -7px;"
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
      active: '0',
      brandName: '',
      companyName: '',
      time: []
    }
  },
  watch: {
    time () {
      this.$emit('search-time', this.time)
    },
    active () {
      this.$emit('search-active', this.active)
    }
  },
  methods: {
    lookOption () {
      this.optionFlg = !this.optionFlg
    },
    searchBrand () {
      this.$emit('search-brand', this.brandName)
    },
    searchCompany () {
      this.$emit('search-company', this.companyName)
    }
  }
}
</script>

<style lang="less" scoped>
  .search-form{
    margin-bottom: 24px;
  }
</style>
