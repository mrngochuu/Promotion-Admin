<template>
    <div class="common-layout">
    <div class="top">
      <div class="header">
        <span class="title">Promotion</span>
      </div>
    </div>
    <div class="form">
      <a-form @submit="onSubmit" :form="form">
        <!-- <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
          <a-tab-pane tab="Login" key="1"> -->
            <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
            <a-row>
                <a-col :offset=1 :span="22">
                    <a-card title="Promotion information">
                        <a-row>
                            <!-- Promotion name -->
                            <a-col :span="11">
                                <a-form-item>
                                    <a-input
                                        autocomplete="autocomplete"
                                        size="large"
                                        placeholder="Promotion name"
                                        v-model="promotion.name"
                                        v-decorator="['name', {rules: [{ required: true, message: 'Please enter promotion name.', whitespace: true}]}]"
                                    >
                                    </a-input>
                                </a-form-item>
                            </a-col>

                            <!-- Promotion class name -- promotion type -->
                            <a-col :offset="2" :span="11">
                                <a-form-item>
                                    <a-select 
                                        v-model="promotion.className"
                                        placeholder="Promotion type"
                                        size="large"
                                        v-decorator="['type', {rules: [{ required: true, message: 'Please select promotion type.', whitespace: true}]}]"
                                    >
                                        <a-select-option value='auto apply'>Auto apply</a-select-option>
                                        <a-select-option value='discount coupon code'>Discount coupon code</a-select-option>
                                        <a-select-option value='gift card'>Gift card</a-select-option>
                                        <a-select-option value='stand alone code'>Stand-alone code</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>

                        <a-row>
                            <!-- Promotion code -->
                            <a-col :span="11">
                                <a-form-item>
                                    <a-input
                                        v-model="promotion.code"
                                        size="large"
                                        placeholder="code"
                                        v-decorator="['code', {rules: [{ required: true, message: 'Please enter promotion code.', whitespace: true}]}]"
                                    >
                                    </a-input>
                                </a-form-item>
                            </a-col>

                            <!-- start date - end date -->
                            <a-col :offset="2" :span="11">
                                <a-form-item>
                                    <a-row>
                                        <a-col :span="13">
                                            <!-- start -->
                                            <a-date-picker
                                                size="large"
                                                v-model="promotion.startTime"
                                                :disabled-date="disabledStartDate"
                                                show-time
                                                format="YYYY-MM-DD HH:mm:ss"
                                                placeholder="Start"
                                                @openChange="handleStartTime"
                                            />
                                        </a-col>
                                        <a-col :offset="1" :span="10">
                                            <!-- expiration date -->
                                            <a-input
                                                size="large"
                                                placeholder="Total day"
                                                type="number"
                                                min="1"
                                                v-decorator="['total', {rules: [{ required: true, message: 'Please enter total day.', whitespace: true}]}]"
                                            >
                                            </a-input>
                                        </a-col>
                                    </a-row>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <!-- short description -->
                            <a-col :span="24">
                                <a-form-item>
                                    <a-input
                                        v-model="promotion.shortDescription"
                                        size="large"
                                        placeholder="Short description"
                                        v-decorator="['shortDescription', {rules: [{ required: true, message: 'Please enter short description.', whitespace: true}]}]"
                                    >
                                    </a-input>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <!-- description -->
                            <a-col :span="24">
                                <a-form-item>
                                    <a-textarea 
                                        v-model="promotion.description"
                                        placeholder="Description" 
                                        size="large" 
                                        :rows="4"
                                        v-decorator="['description', {rules: [{ required: true, message: 'Please enter description.', whitespace: true}]}]"
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>

                        <!-- Brand and Store -->
                        <a-row>
                            <a-col :span="11">
                                <a-form-item>
                                    <a-select 
                                        v-model="promotion.brand"
                                        placeholder="Brand"
                                        size="large"
                                        v-decorator="['brand', {rules: [{ required: true, message: 'Please select brand.', whitespace: true}]}]"
                                    >
                                        <a-select-option value='auto apply'>Auto apply</a-select-option>
                                        <a-select-option value='discount coupon code'>Discount coupon code</a-select-option>
                                        <a-select-option value='gift card'>Gift card</a-select-option>
                                        <a-select-option value='stand alone code'>Stand-alone code</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :offset="2" :span="12" v-if="storeShow">
                                <a-form-item>
                                    <a-select 
                                        v-model="promotion.store"
                                        placeholder="Store"
                                        size="large"
                                        v-decorator="['store', {rules: [{ required: true, message: 'Please select store.', whitespace: true}]}]"
                                    >
                                        <a-select-option value='auto apply'>Auto apply</a-select-option>
                                        <a-select-option value='discount coupon code'>Discount coupon code</a-select-option>
                                        <a-select-option value='gift card'>Gift card</a-select-option>
                                        <a-select-option value='stand alone code'>Stand-alone code</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-card>
                </a-col>
            </a-row>
            <!-- level and condition in promotion level -->
            <a-row>
                <a-col :offset="1" :span="22">
                <a-card title="Conditions in promotion level">
                    <a-row>
                        <!-- level -->
                        <a-col :span="11">
                            <a-form-item>
                                <a-select 
                                    v-model="promotion.level"
                                    placeholder="Level"
                                    v-decorator="['level', {rules: [{ required: true, message: 'Please select level.', whitespace: true}]}]"
                                >
                                    <a-select-option value='order'>Order</a-select-option>
                                    <a-select-option value='product'>Product</a-select-option>
                                    <a-select-option value='gift'>Gift</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <!-- condition in promotion level -->
                        <a-col :offset="2" :span="11">
                            <a-form-item>
                                <a-button type="primary" @click="showConditionInPromotionLevel" style="width:100%;">
                                    Add contions in promotion level
                                </a-button>
                                <a-modal 
                                    v-model="visibleCondition.promotionLevel" 
                                    title="Conditions in promotion level" 
                                    @ok="handleConditionPromotionOk"
                                    centered
                                >
                                    <!-- happy hour -->
                                    <a-row>
                                        <a-col :span="5">
                                            <p style="padding-top: 4px;">Happy hour: </p>
                                        </a-col>
                                        <a-col :span="8">
                                            <a-time-picker format="HH" placeholder="From" style="width: 100%;" v-model="promotion.fromHappyHour" /> 
                                        </a-col>
                                        <a-col :span="1">
                                            <p style="text-align: center; padding-top: 4px;">-</p>
                                        </a-col>
                                        <a-col :span="8">
                                            <a-time-picker format="HH" placeholder="To" style="width: 100%;"  v-model="promotion.toHappyHour" /> 
                                        </a-col>
                                    </a-row>
                                    <!-- happy day -->
                                    <a-row style="margin-top: 20px;">
                                        <a-col :span="5">
                                            <p style="padding-top: 4px;">Happy day: </p>
                                        </a-col>
                                        <a-col :span="8">
                                            <a-select 
                                                placeholder="From"
                                                style="width: 100%;"
                                                v-model="promotion.FromHappyDay"
                                            >
                                                <a-select-option value='1'>Monday</a-select-option>
                                                <a-select-option value='2'>Tuesday</a-select-option>
                                                <a-select-option value='3'>Wednesday</a-select-option>
                                                <a-select-option value='4'>Thurday</a-select-option>
                                                <a-select-option value='5'>Friday</a-select-option>
                                                <a-select-option value='6'>Saturday</a-select-option>
                                                <a-select-option value='0'>Sunday</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :span="1">
                                            <p style="text-align: center; padding-top: 4px;">-</p>
                                        </a-col>
                                        <a-col :span="8">
                                            <a-select 
                                                placeholder="To"
                                                style="width: 100%;"
                                                v-model="promotion.toHappyDay"
                                            >
                                                <a-select-option value='1'>Monday</a-select-option>
                                                <a-select-option value='2'>Tuesday</a-select-option>
                                                <a-select-option value='3'>Wednesday</a-select-option>
                                                <a-select-option value='4'>Thurday</a-select-option>
                                                <a-select-option value='5'>Friday</a-select-option>
                                                <a-select-option value='6'>Saturday</a-select-option>
                                                <a-select-option value='0'>Sunday</a-select-option>
                                            </a-select>
                                        </a-col>
                                    </a-row>
                                </a-modal>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-card>
                </a-col>
            </a-row>
            <!-- condition and action -->
            <a-row>
                <a-col :offset="1" :span="22">
                <a-card title="Conditions and actions in detail level">
                    <a-row>
                        <!-- condition and action detail -->
                        <a-col :span="24">
                            <a-form-item>
                                <a-button type="dashed" @click="showConditionLevel" style="width:100%;">
                                    <a-icon type="plus" />
                                </a-button>
                                <a-modal 
                                    v-model="visibleCondition.conditionLevel" 
                                    centered
                                    width="80%"
                                    @ok="handleConditionLevelOk" 
                                    class="conditionLevel"
                                >
                                    <!-- Condition -->
                                    <a-card title="Condition" style="border-radius: 5px;box-shadow: 6px 6px 6px #e8e8e8; margin-bottom: 20px;">
                                        <a-row>
                                            <!-- Amount -->
                                            <a-row>
                                                <a-col :span="5">
                                                    <p style="padding-top: 4px;">Order amount: </p>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-input
                                                        placeholder="Min"
                                                        type="number"
                                                        min="1000"
                                                        step="1000"
                                                        suffix="VND"
                                                        v-model="condition.minAmount"
                                                    />
                                                </a-col>
                                                <a-col :span="1">
                                                    <p style="text-align: center; padding-top: 4px;">-</p>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-input
                                                        placeholder="Max"
                                                        type="number"
                                                        min="1000"
                                                        step="1000"
                                                        suffix="VND"
                                                        v-model="condition.maxAmount"
                                                    />
                                                </a-col>
                                            </a-row>
                                            <!-- Quantity -->
                                            <a-row>
                                                <a-col :span="5">
                                                    <p style="padding-top: 4px;">Buy quantity: </p>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-input
                                                        placeholder="Min"
                                                        type="number"
                                                        min="1"
                                                        step="1"
                                                        suffix="Unit"
                                                        v-model="condition.minQuantity"
                                                    />
                                                </a-col>
                                                <a-col :span="1">
                                                    <p style="text-align: center; padding-top: 4px;">-</p>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-input
                                                        placeholder="Max"
                                                        type="number"
                                                        min="1"
                                                        step="1"
                                                        suffix="Unit"
                                                        v-model="condition.maxQuantity"
                                                    />
                                                </a-col>
                                            </a-row>
                                            <!-- Product -->
                                            <a-row>
                                                <a-col :span="5">
                                                    <p style="padding-top: 4px;">Product conditon: </p>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-button type="dashed" @click="showProductCondition" style="width:100%;">
                                                        <a-icon type="plus" />
                                                    </a-button>
                                                    <a-modal 
                                                        v-model="product.condition.visible" 
                                                        title="Product condition" 
                                                        centered
                                                        @ok="handleConditionProductOk" 
                                                        class="conditionLevel"
                                                    > 
                                                        <a-row>
                                                            <a-col :span="24">
                                                                <a-input
                                                                    placeholder="Product code"
                                                                    type="text"
                                                                    v-model="condition.product.productCode"
                                                                />
                                                            </a-col>
                                                        </a-row>
                                                    </a-modal>
                                                </a-col>
                                                <a-col :offset="1" :span="8">
                                                    <a-input
                                                        placeholder="Quantity"
                                                        type="number"
                                                        min="1"
                                                        v-model="condition.product.quantity"
                                                    />
                                                </a-col>
                                            </a-row>
                                        </a-row>
                                    </a-card>
                                    <!-- Action -->
                                    <a-card title="Discount" style="border-radius: 5px; box-shadow: 6px 6px 6px #e8e8e8; margin-bottom: 20px;">
                                        <a-row>
                                            <!-- Amount action -->
                                            <a-row>
                                                <a-col :span="5">
                                                    <p style="padding-top: 4px;">Discount amount: </p>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-input
                                                        placeholder="Amount"
                                                        type="number"
                                                        min="1000"
                                                        step="1000"
                                                        suffix="VND"
                                                        v-model="action.discountAmount"
                                                    />
                                                </a-col>
                                            </a-row>
                                            <!-- Percent -->
                                            <a-row>
                                                <a-col :span="5">
                                                    <p style="padding-top: 4px;">Discount percent: </p>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-input
                                                        placeholder="Percent"
                                                        type="number"
                                                        min="0.1"
                                                        step="0.1"
                                                        max="100"
                                                        suffix="%"
                                                        v-model="action.discountPercent"
                                                    />
                                                </a-col>
                                                <a-col :span="1">
                                                    <p style="text-align: center; padding-top: 4px;">-</p>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-input
                                                        placeholder="Max discount"
                                                        type="number"
                                                        min="1000"
                                                        step="1000"
                                                        suffix="VND"
                                                        v-model="action.maxDiscountPercent"
                                                    />
                                                </a-col>
                                            </a-row>
                                            <!-- Product action-->
                                            <a-row>
                                                <a-col :span="5">
                                                    <p style="padding-top: 4px;">Discount product: </p>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-button type="dashed" @click="showProductAction" style="width:100%;">
                                                        <a-icon type="plus" />
                                                    </a-button>
                                                    <a-modal 
                                                        v-model="product.action.visible"
                                                        title="Discount product"
                                                        centered
                                                        @ok="handleActionProductOk" 
                                                        class="conditionLevel"
                                                    >
                                                        <!-- product code action -->
                                                        <a-row style="margin-bottom: 10px;">
                                                            <a-col :span="23">
                                                                <a-input
                                                                    placeholder="Product code"
                                                                    type="text"
                                                                    v-model="action.product.productCode"
                                                                />
                                                            </a-col>
                                                        </a-row>
                                                    </a-modal>
                                                </a-col>
                                                <a-col :offset="1" :span="8">
                                                    <a-input
                                                        placeholder="Amount"
                                                        type="number"
                                                        min="1000"
                                                        step="1000"
                                                        suffix="VND/unit"
                                                        v-model="action.product.discountAmount"
                                                    />
                                                </a-col>
                                            </a-row>
                                            <!-- product discount percent -->
                                            <a-row style="margin-bottom: 8px;">
                                                <a-col :offset="14" :span="8">
                                                    <a-input
                                                        placeholder="Percent"
                                                        type="number"
                                                        min="0.1"
                                                        step="0.1"
                                                        suffix="%/unit"
                                                        v-model="action.product.discountPercent"
                                                    />
                                                </a-col>
                                            </a-row>

                                            <!-- product max discount -->
                                            <a-row>
                                                <a-col :offset="14" :span="8">
                                                    <a-input
                                                        placeholder="Max quantity"
                                                        type="number"
                                                        min="1"
                                                        step="1"
                                                        suffix="unit"
                                                        v-model="action.product.maxQuantity"
                                                    />
                                                </a-col>
                                            </a-row>
                                        </a-row>
                                    </a-card>
                                    <!-- Gift -->
                                    <a-card title="Gift" style="border-radius: 5px; box-shadow: 6px 6px 6px #e8e8e8; margin-bottom: 20px;">
                                        <a-row>
                                            <a-row>
                                                <a-col :span="5">
                                                    <p style="padding-top: 4px;">Gift: </p>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-input
                                                        placeholder="Gift code"
                                                        type="text"
                                                        v-model="gift.giftCode"
                                                    />
                                                </a-col>
                                                <a-col :offset="1" :span="8">
                                                    <a-input
                                                        placeholder="Quantity"
                                                        type="number"
                                                        min="1"
                                                        step="1"
                                                        suffix="Unit"
                                                        v-model="gift.giftQuantity"
                                                    />
                                                </a-col>
                                            </a-row>
                                        </a-row>
                                    </a-card>
                                </a-modal>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-card>
                </a-col>
            </a-row>
            <a-row>
                <a-col :offset="1" :span="22">
                    <a-form-item>
                    <a-button :loading="logging" style="width: 100%; height: 40px; border-radius: 5px; margin-top: 24px; font-weight: bold; font-size: 18px;" size="large" htmlType="submit" type="primary">Create</a-button>
                    </a-form-item>
                </a-col>
            </a-row>
      </a-form>
    </div>
    </div>
</template>

<script>
// import CommonLayout from '@/layouts/CommonLayout'
import {login, getRoutesConfig} from '@/services/user'
import {setAuthorization} from '@/utils/request'
import {loadRoutes} from '@/utils/routerUtil'

export default {
  name: 'Login',
  components: {},
  data () {
    return {
      storeShow: false,
      visibleCondition: {
        promotionLevel: false,
        conditionLevel: false,
      },
      product: {
        condition: {
            list: [],
            visible: false,
        },
        action: {
            list: [],
            visible: false,
        }
      },
      promotion: {
        name: '',
        className: '',
        code: '',
        startTime: {},
        expirationDate: 0,
        shortDescription: '',
        description: '',
        brand: '',
        store: '',
        level: '',
        
      },
      logging: false,
      error: '',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    systemName () {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          console.log('haha')
        }
      })
    },
    showProductCondition () {
        this.product.condition.visible = true
    },
    showProductAction () {
        this.product.action.visible = true
    },
    showConditionInPromotionLevel () {
        this.visibleCondition.promotionLevel = true
    },
    handleConditionPromotionOk(e) {
      console.log(e);
      this.visibleCondition.promotionLevel = false;
    },
    showConditionLevel() {
        this.visibleCondition.conditionLevel = true
    },
    handleConditionLevelOk(e) {
      console.log(e);
      this.visibleCondition.conditionLevel = false;
    },
    handleStartTime (value) {

    },
    disabledStartDate () {

    },
    handleConditionProductOk () {
      this.product.condition.visible = false;
    },
    handleActionProductOk () {
      this.product.action.visible = false;
    },
  }
}
</script>

<style lang="less" scoped>
  .common-layout{
    .ant-card {
        border-radius: 5px;
        box-shadow: 10px 10px 10px #e8e8e8;
        margin-bottom: 30px;
    }
    .conditionLevel {
        .ant-card {
            border-radius: 5px;
            box-shadow: 6px 6px 6px #e8e8e8;
            margin-bottom: 20px;
        }
    }
    .top {
      text-align: center;
      .header {
        margin-bottom: 30px;
        height: 44px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: @title-color;
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: @text-color-second;
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .form{
      .icon {
        font-size: 24px;
        color: @text-color-second;
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }
</style>
