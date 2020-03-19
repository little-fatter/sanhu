<template>
  <map-for-mobile class="map-for-mobile" :style="{width:getWidth() + 'px',height:getHeight() + 'px'}"/>
</template>
<script>
import MapForMobile from '@/components/myComponents/map/MapForMobile.vue'

export default {
  components: { MapForMobile },
  methods: {
    getWidth: () => {
      return document.body.clientWidth
    },
    getHeight: () => {
      return document.body.clientHeight
    }
  },
  mounted: () => {
    document['app'] = this
  }
}
</script>
<style scoped>
html,body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.full{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.map-for-mobile{
  width: 100%;
  height: 100%;
}
</style>
