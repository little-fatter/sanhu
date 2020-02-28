<template>
  <div>
    <van-cell-group title="物品清单">
      <van-cell-group>
        <van-field
          v-model="inventory.dsr.id"
          label="当事人"
          readonly
          placeholder="请选择当事人"
          class="dropdown-menu_noboder">
          <template slot="input">
            <van-dropdown-menu>
              <van-dropdown-item v-model="inventory.dsr.id" :options="dsrOptions" @change="dsrSelectChange" />
            </van-dropdown-menu>
          </template>
        </van-field>
      </van-cell-group>
      <van-panel v-for="(item,mindex) in inventory.list" :key="mindex" :title="`物品(${mindex+1})`">
        <van-field
          v-model="item.name"
          placeholder="请输入名称"
        />
        <van-field
          v-model="item.enterprise"
          placeholder="请输入生产企业或经营单位"
        />
        <van-field
          v-model="item.specification"
          placeholder="请输入规格"
        />
        <van-field
          v-model="item.batchNumber"
          placeholder="请输入生产批次"
        />
        <van-field
          v-model="item.produceDate"
          placeholder="请输入生产时间"
        />
        <van-field
          v-model="item.count"
          type="number"
          placeholder="请输入数量"
        />
        <van-field
          v-model="item.price"
          type="number"
          placeholder="请输入价格"
        />
        <van-field
          v-model="item.pack"
          placeholder="请输入包装"
        />
        <van-field
          v-model="item.remark"
          rows="2"
          autosize
          type="textarea"
          maxlength="200"
          placeholder="请输入物品描述"
          show-word-limit
        />
        <div slot="footer">
          <van-button
            plain
            hairline
            size="small"
            type="info"
            @click="addItem"
            native-type="button"
            icon="plus">添加物品</van-button>
          <van-button
            plain
            hairline
            size="small"
            type="danger"
            @click="removeItem(mindex)"
            native-type="button"
            icon="delete">删除物品</van-button>
        </div>
      </van-panel>
      <van-field
        v-model="inventory.otherItem"
        rows="2"
        autosize
        label="其他物品"
        type="textarea"
        maxlength="200"
        placeholder="请输入物品描述"
        show-word-limit
      />
    </van-cell-group>
  </div>
</template>

<script>
import { isEmpty } from '../../utils/util'
/**
 * 物品清单表单组件
 */
export default {
  name: 'InventoryForm',
  components: {
  },
  props: {
    /**
     *  当事人数组
     */
    dsrs: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    }
  },
  data () {
    return {
      tempDsrs: [],
      inventory: {
        dsr: {},
        list: [],
        otherItem: ''
      },
      dsrOptions: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.initdsyOptions()
    },
    initdsyOptions () {
      var dsrOptions = []
      var isfirst = true
      this.tempDsrs = this.dsrs
      this.tempDsrs.forEach((item, index) => {
        var id = isEmpty(item.id) ? index : item.id
        item.id = id
        if (isfirst) {
          this.inventory.dsr = item
        }
        isfirst = false
        var title = item.partyType === 1 ? (item.name + '|' + item.idCard) : item.name
        var dsrOption = {
          text: title, value: item.id
        }

        dsrOptions.push(dsrOption)
      })
      this.dsrOptions = dsrOptions
      this.addItem()
    },
    dsrSelectChange (value) {
      var dsy = this.tempDsrs.find(item => item.id === value)
      if (dsy) {
        this.inventory.dsr = dsy
      }
    },
    addItem () {
      var item = {
        name: '',
        enterprise: '',
        specification: '',
        batchNumber: '',
        produceDate: '',
        count: null,
        price: null,
        pack: '',
        remark: ''
      }
      this.inventory.list.push(item)
    },
    removeItem (index) {
      this.inventory.list.splice(index, 1)
    },
    getResult () {
      return this.inventory
    }
  }
}
</script>

<style lang="less" scoped>

</style>
