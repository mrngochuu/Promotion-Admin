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
            <a-alert type="error" :closable="true" v-show="error.promotionError" :message="error.promotionError" showIcon style="margin-bottom: 24px;" />
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
                                                v-model="promotion.expirationDate"
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
                                        v-model="brandStr"
                                        placeholder="Brand"
                                        size="large"
                                        v-decorator="['brand', {rules: [{ required: true, message: 'Please select brand.', whitespace: true}]}]"  
                                    >
                                        <a-select-option :key="index" v-for="(item, index) in list.brand" :value="item.id.toString()">{{ item.brandName }}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :offset="2" :span="11" v-if="getStoreToShow.length > 0">
                                <a-form-item>
                                    <a-select 
                                        v-model="storeStr"
                                        placeholder="Store"
                                        size="large"
                                        v-decorator="['store', {rules: [{ required: true, message: 'Please select store.', whitespace: true}]}]"       
                                    >
                                        <a-select-option :key="index" v-for="(item, index) in getStoreToShow" :value="item.storeId.toString()">{{ item.storeName }}</a-select-option>
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
                                                v-model="promotion.fromHappyDay"
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
                                            <!-- Product condition -->
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
                                                        <a-alert type="error" :closable="true" v-show="error.productConditionError" :message="error.productConditionError" showIcon style="margin-bottom: 24px;" />
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
                                                <a-col :offset="1" :span="8" v-show="showProductConditionField">
                                                    <a-input
                                                        placeholder="Quantity"
                                                        type="number"
                                                        min="1"
                                                        v-model="condition.product.quantity"
                                                    />
                                                </a-col>
                                            </a-row>
                                            <!-- list product condition added -->
                                            <a-row v-show="getProductConditionList.length > 0">
                                                <a-col :offset="5" :span="8">
                                                    <a-card title="Product list">
                                                        <a-row :key="index" v-for="(item,index) in getProductConditionList">
                                                            <a-col :span="21">
                                                                <a-button type="dashed" style="width: 100%; text-align: left; margin-bottom: 5px;" >
                                                                    {{ item.productCode }}
                                                                </a-button>
                                                            </a-col>
                                                            <a-col :span="1">
                                                                <a-button type="danger" @click="deleteProductCondition(index)" style="margin-bottom: 5px;">
                                                                    <a-icon type="delete" />
                                                                </a-button>
                                                            </a-col>
                                                        </a-row>
                                                    </a-card>
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
                                                        <a-alert type="error" :closable="true" v-show="error.productActionError" :message="error.productActionError" showIcon style="margin-bottom: 24px;" />
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
                                                <a-col :offset="1" :span="8" v-show="showProductActionField">
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
                                            <a-row style="margin-bottom: 8px;" v-show="showProductActionField">
                                                <a-col :offset="5" :span="8">
                                                    <!-- list product condition added -->
                                                    <a-row v-show="getProductActionList.length > 0">
                                                        <a-card title="Product list">
                                                            <a-row :key="index" v-for="(item,index) in getProductActionList">
                                                                <a-col :span="21">
                                                                    <a-button type="dashed" style="width: 100%; text-align: left; margin-bottom: 5px;" >
                                                                        {{ item.productCode }}
                                                                    </a-button>
                                                                </a-col>
                                                                <a-col :span="1">
                                                                    <a-button type="danger" @click="deleteProductAction(index)" style="margin-bottom: 5px;">
                                                                        <a-icon type="delete" />
                                                                    </a-button>
                                                                </a-col>
                                                            </a-row>
                                                        </a-card>
                                                    </a-row>
                                                </a-col>
                                                <a-col :offset="1" :span="8">
                                                    <!-- product discount percent -->
                                                    <a-row style="margin-bottom: 8px;">
                                                        <a-col :span="24">
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
                                                        <a-col :span="24">
                                                            <a-input
                                                                placeholder="Max quantity"
                                                                type="number"
                                                                min="1"
                                                                step="1"
                                                                suffix="unit"
                                                                v-model="action.product.quantity"
                                                            />
                                                        </a-col>
                                                    </a-row>
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
                                                <a-col :offset="1" :span="8" v-show="showGiftField">
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
                                        <a-alert type="error" :closable="true" v-show="error.conditionLevelError" :message="error.conditionLevelError" showIcon style="margin-bottom: 24px;" />
                                    </a-card>
                                </a-modal>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row v-show="list.promotionDetail.length > 0">
                        <a-card title="Condition and Action list" class="conditionShow">
                            <a-card :key="index" v-for="(item, index) in getPromotionDetail" :title="'Condition level - ' + (index + 1)" >
                                <a-row>
                                    <a-col :span="24">
                                        <a-card title="Condition" style="margin-bottm: 8px !important; box-shadow: none;">
                                            <p>Condition amount: {{ item.conditionGroup.minAmount |renderMoney }} ~ {{ item.conditionGroup.maxAmount | renderMoney }}</p>
                                            <p>Condition quantity: {{ item.conditionGroup.minQuantity | renderUnit }} ~ {{ item.conditionGroup.maxQuantity | renderUnit }}</p>
                                            <p v-show="item.conditionGroup.conditionProduct.products.length > 0">
                                                Condition product: {{ item.conditionGroup.conditionProduct.products }}
                                            </p>
                                            <p v-show="item.conditionGroup.conditionProduct.products.length > 0">
                                                Product quantity: {{ item.conditionGroup.conditionProduct.quantity | renderUnit }}
                                            </p>
                                        </a-card>

                                        <a-card title="Discount" style="margin-bottm: 8px;" v-show="item.actionGroup.discountAmount !== 0 || item.actionGroup.discountPercent !== 0 || item.actionGroup.actionProduct.products.length > 0">
                                            <p>Amount: {{ item.actionGroup.discountAmount | renderMoney }}</p>
                                            <p>Percent: {{ item.actionGroup.discountPercent | renderPercent }} - (max: {{ item.actionGroup.maxDiscountPercent | renderMoney }})</p>
                                            <p v-show="item.actionGroup.actionProduct.products.length > 0">
                                                Products: {{ item.actionGroup.actionProduct.products }}
                                            </p>
                                            <p v-show="item.actionGroup.actionProduct.products.length > 0">
                                                Discount amount product: {{ item.actionGroup.actionProduct.discountAmount | renderMoneyPerUnit }}
                                            </p>
                                            <p v-show="item.actionGroup.actionProduct.products.length > 0">
                                                Discount percnet product: {{ item.actionGroup.actionProduct.discountPercent | renderPercentPerUnit }}
                                            </p>
                                            <p v-show="item.actionGroup.actionProduct.products.length > 0">
                                                Total discount products: {{ item.actionGroup.actionProduct.quantity | renderUnit }}
                                            </p>
                                        </a-card>

                                        <a-card title="Gift" v-show="item.postAction.giftCode !== ''">
                                            <p>Gift code: {{ item.postAction.giftCode }}</p>
                                            <p>Gift quantity: {{ item.postAction.giftQuantity | renderUnit }}</p>
                                        </a-card>
                                    </a-col>
                                    <a-row>
                                        <a-button type="danger" @click="deleteConditionLevelList(index)" style="width:100%;">
                                            <a-icon type="delete" />
                                        </a-button>
                                    </a-row>
                                </a-row>
                            </a-card>
                        </a-card>
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
import {setAuthorization} from '@/utils/request'
import {loadRoutes} from '@/utils/routerUtil'
import {getBrandList, getStoreByBrandId} from '@/services/brand'
import {createPromotion} from '@/services/promotion'
export default {
  name: 'PromotionForm',
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
      brandStr: '',
      storeStr: '',
      promotion: {
        name: '',
        className: '',
        code: '',
        startTime: null,
        expirationDate: undefined,
        shortDescription: '',
        description: '',
        brandId: undefined,
        storeId: undefined,
        level: '',
        fromHappyHour: null,
        toHappyHour: null,
        fromHappyDay: undefined,
        toHappyDay: undefined,
        promotionDetail: []
      },
      condition: {
        minAmount: undefined,
        maxAmount: undefined,
        minQuantity: undefined,
        maxQuantity: undefined,
        product: {
            productCode: '',
            quantity: undefined,
        }
      },
      action: {
        discountAmount: undefined,
        discountPercent: undefined,
        maxDiscountPercent: undefined,
        product: {
            productCode: '',
            discountAmount: undefined,
            discountPercent: undefined,
            quantity: undefined,
        },
      },
      gift: {
        giftCode: '',
        giftQuantity: undefined
      },
      error: {
        promotionError: '',
        productConditionError: '',
        productActionError: '',
        conditionLevelError: '',
      },
      list: {
        productCondition: [],
        productAction: [],
        brand: [],
        store: [],
        promotionDetail: [],
      },
      logging: false,
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.initPage()  
  },
  watch: {
    brandStr (value) {
      this.promotion.brandId = parseInt(value)
      this.getStoreList()
    },
    storeStr (value) {
      this.promotion.storeId = parseInt(value)
    }
  },
  computed: {
    objectChange () {
        return {
            promotionName: this.promotion.name,
            promotionClassName: this.promotion.className,
            promotionCode: this.promotion.code,
            startDate: new Date(this.promotion.startTime),
            expirationDate: parseInt(this.promotion.expirationDate === undefined ? 0 : this.promotion.expirationDate),
            shortDescription: this.promotion.shortDescription,
            description: this.promotion.description,
            fromHappyDay: parseInt(this.promotion.fromHappyDay === undefined ? -1 : this.promotion.fromHappyDay),
            toHappyDay: parseInt(this.promotion.toHappyDay === undefined ? -1 : this.promotion.toHappyDay),
            fromHourHappy: parseInt(this.promotion.fromHappyHour === null ? -1 : new Date(this.promotion.toHappyHour).getHours()),
            toHourHappy: parseInt(this.promotion.toHappyHour === null ? -1 : new Date(this.promotion.toHappyHour).getHours()),
            brandId: this.promotion.brandId,
            storeGroupId: 0,
            storeId: this.promotion.storeId,
            level: this.promotion.level,
            promotionDetail: this.promotion.promotionDetail
        }
    },
    getPromotionDetail () {
        return this.list.promotionDetail
    },
    getProductConditionList () {
        return this.list.productCondition
    },
    getStoreToShow () {
        return this.list.store
    },
    getProductActionList () {
        return this.list.productAction
    },
    showGiftField () {
        return this.gift.giftCode === null || this.gift.giftCode === '' ? false : true
    },
    showProductConditionField () {
        if (this.list.productCondition.length > 0) {
            return true
        }
        return false
    },
    showProductActionField () {
        if (this.list.productAction.length > 0) {
            return true
        }
        return false
    },
  },
  methods: {
    initPage () {
        new Promise((resolve, reject) => {
            resolve()
        }).then(res => {
            return getBrandList()
        }).then(res => {
            this.list.brand = res.data
        }).then(res => {
            this.list.brand.sort((a,b) => new Date(b.createdDate) - new Date(a.createdDate))
        })
    },
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
            let _this = this
            createPromotion(_this.objectChange).then(res => {
                if(res.data.toLowerCase() === 'success') {
                    this.$message.success('Creating new promotion is successful.')
                    this.clearAllData()
                } else {
                    this.error.promotionError = res.data
                }
            })
        }
      })
    },

    clearAllData () {
        this.brandStr = '',
        this.storeStr = '',
        this.promotion.name = ''
        this.promotion.className = ''
        this.promotion.code = ''
        this.promotion.startTime = null
        this.promotion.expirationDate = undefined,
        this.promotion.shortDescription = '',
        this.promotion.description = '',
        this.promotion.brandId = undefined,
        this.promotion.storeId = undefined,
        this.promotion.level = '',
        this.promotion.fromHappyHour = null,
        this.promotion.toHappyHour = null,
        this.promotionDetail = []
        this.clearConditionLevelData()
        this.list.listPromotionDetail = []
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
    showConditionLevel () {
        this.visibleCondition.conditionLevel = true
    },
    getStoreList () {
        if (this.promotion.brandId === null || this.promotion.brandId === '') {
            return
        }
        new Promise((resolve, reject) => {
          resolve()
        }).then(res => {
          return getStoreByBrandId(this.promotion.brandId)
        }).then(res => {
          this.list.store = res.data
        })
    },
    handleConditionLevelOk(e) {
      if(this.condition.minAmount === undefined 
        && this.condition.maxAmount === undefined
        && this.condition.minQuantity === undefined
        && this.condition.maxQuantity === undefined
        && this.list.productCondition.length === 0) {
        this.error.conditionLevelError = "Condition is not null!"
        return
      }

      if (this.list.productCondition.length > 0 
        && (this.condition.product.quantity === undefined || this.condition.product.quantity === 0)) {
        this.error.conditionLevelError = "Condition product quantity is greater than 0!"
        return
      }

      if (this.list.productAction.length > 0 
        && ((this.action.product.discountAmount === undefined || this.action.product.discountAmount === 0) 
        || (this.action.discountPercent === undefined || this.action.discountPercent === 0 ))) {
        this.error.conditionLevelError = "Discount amount or percent in products is greater than 0!"
        return
      }

      if ((this.gift.giftCode !== null || this.gift.giftCode !== '' ) && (this.gift.giftQuantity === 0 || this.gift.giftQuantity === undefined)) {
          this.error.conditionLevelError = "Gift quantity is greater than 0!"
          return
      }

      let conditonGroup = {
        "minAmount": parseInt(this.condition.minAmount === undefined ? 0 : this.condition.minAmount),
        "maxAmount": parseInt(this.condition.maxAmount === undefined ? 0 : this.condition.maxAmount),
        "minQuantity": parseInt(this.condition.minQuantity === undefined ? 0 : this.condition.minQuantity),
        "maxQuantity": parseInt(this.condition.maxQuantity === undefined ? 0 : this.condition.maxQuantity),
        "conditionProduct": {
        "products": this.list.productCondition,
        "quantity": parseInt(this.condition.product.quantity === undefined ? 0 : this.condition.product.quantity)
      }}
      let actionGroup = {
        "discountAmount": parseInt(this.action.discountAmount === undefined ? 0 : this.action.discountAmount),
        "discountPercent": parseInt(this.action.discountPercent === undefined ? 0 : this.action.discountPercent),
        "maxDiscountPercent": parseInt(this.action.maxDiscountPercent === undefined ? 0 : this.action.maxDiscountPercent),
        "actionProduct": {
            "products": this.list.productAction,
            "discountAmount": parseInt(this.action.product.discountAmount === undefined ? 0 : this.action.product.discountAmount),
            "discountPercent": parseInt(this.action.product.discountPercent === undefined ? 0 : this.action.product.discountPercent),
            "quantity": parseInt(this.action.product.quantity === undefined ? 0 : this.action.product.quantity)
        }
      }
      let postAction = {
        "giftCode": this.gift.giftCode,
        "giftQuantity": parseInt(this.gift.giftQuantity === undefined ? 0 : this.gift.giftQuantity)
      }

      let temp = {
          "conditionGroup": conditonGroup,
          "actionGroup": actionGroup,
          "postAction": postAction
      }
      this.list.promotionDetail.push(temp)
      this.listPromotionDetail = this.list.promotionDetail
      this.promotion.promotionDetail = this.list.promotionDetail
      this.clearConditionLevelData()
      this.visibleCondition.conditionLevel = false
    },
    clearConditionLevelData() {
        // clear condition
        this.condition.minAmount = undefined
        this.condition.maxAmount = undefined
        this.condition.minQuantity = undefined
        this.condition.maxQuantity = undefined
        this.condition.product.productCode = ''
        this.condition.product.quantity = undefined
        this.list.productCondition = []

        // clear action
        this.action.discountAmount = undefined
        this.action.discountPercent = undefined
        this.action.maxDiscountPercent = undefined
        this.action.product.productCode = ''
        this.action.product.discountAmount = undefined
        this.action.product.discountPercent = undefined
        this.action.product.quantity = undefined
        this.list.productAction = []

        // clear gift
        this.gift.giftCode = ''
        this.gift.giftQuantity = undefined
    },
    handleStartTime (value) {
        
    },
    disabledStartDate () {

    },
    handleConditionProductOk () {
      
      if (this.condition.product.productCode === null || this.condition.product.productCode === '') {
        this.error.productConditionError = "Can not add empty product code!"
        return
      }

      if (this.list.productCondition.some(item => item.productCode === this.condition.product.productCode)) {
        this.error.productConditionError = "Product code does exist!"
        return
      }
      this.list.productCondition.push({"productCode": this.condition.product.productCode})
      this.condition.product.productCode = ''
      this.product.condition.visible = false;
    },
    handleActionProductOk () {
      if (this.action.product.productCode === null || this.action.product.productCode === '') {
        this.error.productActionError = "Can not add empty product code!"
        return
      }

      if (this.list.productAction.some(item => item.productCode === this.action.product.productCode)) {
        this.error.productActionError = "Product code does exist!"
        return
      }
      this.list.productAction.push({"productCode": this.action.product.productCode})
      this.action.product.productCode = ''
      this.product.action.visible = false;
    },
    deleteProductCondition (index) {
        this.list.productCondition.splice(index, 1)
    },
    deleteProductAction (index) {
        this.list.productAction.splice(index, 1)
    },
    deleteConditionLevelList (index) {
        this.list.promotionDetail.splice(index, 1)
        this.promotion.promotionDetail = this.list.promotionDetail
    }
  },
  filters: {
    renderMoney (value) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " vnd"
    },
    renderUnit (value) {
        return value.toString() + " unit"
    },
    renderPercent (value) {
        return value.toString() + " %"
    },
    renderMoneyPerUnit (value) {
        return value.toString() + " vnd/unit"
    },
    renderPercentPerUnit (value) {
        return value.toString() + " %/unit"
    }
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
