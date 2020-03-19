<template>
  <div>
    <van-cell-group title="物品清单">
      <van-cell-group>
        <van-field
          v-model="inventory.lawParty"
          label="当事人"
          readonly
          placeholder="请选择当事人"
          class="dropdown-menu_noboder">
          <template slot="input">
            <van-dropdown-menu>
              <van-dropdown-item v-model="inventory.lawParty" :options="dsrOptions" />
            </van-dropdown-menu>
          </template>
        </van-field>
      </van-cell-group>
      <van-panel v-for="(item,mindex) in inventory.list" :key="mindex" :title="`物品(${mindex+1})`">
        <van-field
          v-model="item.ProductName"
          placeholder="请输入名称"
        />
        <van-field
          v-model="item.Enterprise"
          placeholder="请输入生产企业或经营单位"
        />
        <van-field
          v-model="item.Specifications"
          placeholder="请输入规格"
        />
        <van-field
          v-model="item.DateOfManufacture"
          placeholder="请输入生产批次或者生产日期"
        />
        <van-field
          v-model="item.Number"
          type="number"
          placeholder="请输入数量"
        />
        <van-field
          v-model="item.UnitPrice"
          type="number"
          placeholder="请输入价格"
        />
        <van-field
          v-model="item.Packing"
          placeholder="请输入包装"
        />
        <van-field
          v-model="item.Remarks"
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
        v-model="inventory.Othergoods"
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
      inventory: {
        lawParty: null,
        list: [],
        Othergoods: ''
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
      this.dsrs.forEach(item => {
        var title = item.Typesofparties === '个人' ? (item.Name + '|' + item.IDcard) : item.Name
        var dsrOption = {
          text: title, value: item.ID
        }
        dsrOptions.push(dsrOption)
      })
      this.dsrOptions = dsrOptions
      this.inventory.lawParty = dsrOptions[0].value
      this.inventory.lawPartyName = dsrOptions[0].text
      this.addItem()
    },
    addItem () {
      var item = {
        ProductName: '',
        Enterprise: '',
        Specifications: '',
        DateOfManufacture: '',
        Number: null,
        UnitPrice: null,
        Packing: '',
        Remarks: ''
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
