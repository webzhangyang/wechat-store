<template>
  <div class="rec-d-row water-col" v-for="(val,pIndex) in col">
    <div class="row-detail water-detail"
         v-for="(value,cIndex) in htmlData" v-if="cIndex%col===pIndex"
         :key="value.id"
    >
      <a href="#/hello">
        <div class="row-d-img detail-img">
          <img :src="value.mainImges | getImg" alt=""/>
        </div>
        <p class="row-d-text">{{value.productName}}</p>
      </a>
      <div class="row-d-info">
        <div class="info-l">
          <p class="now-price">￥<span class="span">{{value.salesPrice}}</span></p>
          <p class="old-price">￥<span>{{value.marketPrice}}</span></p>
        </div>
        <a class="info-r addCartNum" href="#">
          <i class="icon-base i-car-add"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "product-list"
    }
</script>

<style scoped>

</style>
