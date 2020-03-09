<template>
  <div class="ItemDetails">
    <van-cell title="当事人" :value="Party"></van-cell>
    <InventoryFormView :inventory="loadData"></InventoryFormView>
    <van-cell>
      <van-button type="info" native-type="submit" size="large" @click="returnSubmitForm">返回</van-button>
    </van-cell>
  </div>
</template>

<script>
import InventoryFormView from "../../components/business/InventoryFormView";
import {
  getDetaildata,
  commonOperateApi,
  getDictionaryItems,
  DictionaryCode,
  commonSaveApi,
  getDetialdataByfilter,
  getDetialdataByEventInfoId
} from "../../api/regulatoryApi";
export default {
  name: "ItemDetails",
  components: {
    InventoryFormView
  },
  props: {},
  data() {
    return {
      Party: "",
      lawParty: "张三 435526198032565545",
      itemsListData: {
        // dsr:{
        //   name:""
        // },
        list: [
          {
            ProductName: "鱼网",
            Enterprise: "昆明制药",
            specification: "大王",
            batchNumber: "阿达",
            DateOfManufacture: "2015-12-31",
            Number: "56",
            price: "5261",
            Packing: "好的包装",
            Remarks: "收缴所得"
          }
        ],
        otherItem: "其他物品"
      }
    };
  },
  watch: {},
  computed: {
    loadData(){
      return []
    }
  },
  methods: {
    returnSubmitForm() {
      this.$router.go(-1);
    },
    // 页面数据
    init() {
      const id = this.$route.params.item.ID;
      getDetaildata("form_confiscated_item", id).then(res => {
        this.loadData.push(res);
        this.Party = res[0].handler;
        console.log(this.loadData);
      });
    }
  },
  created() {
    this.init();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
</style>
