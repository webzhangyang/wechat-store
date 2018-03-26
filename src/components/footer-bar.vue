<template>
  <footer class="bottom-container">
    <div class="bottom-nav">
      <a v-for="(val,index) in listArr" :key="val.icon"
                   class="item" :class="{active:val.active}"
                   @click.prevent="setActive(val.path,val.icon)">
        <p class="icon-base b-nav-m relative" :class="[val.active?'active':'',val.icon]">
          <template v-if="(val.icon==='i-car')">
            <span class="show-content" data-number="2">{{count}}</span>
          </template>
        </p>
        <p class="b-nav-m">{{val.txt}}</p>
      </a>
    </div>
  </footer>
</template>

<script>
  import { mapState } from 'vuex'

    export default {
        name: "footer-bar",
      props:['list'],
        data(){
          return {
            listArr: this.list,
          }
        },
      computed:{
        ...mapState({count:state=>state.cart.count})
      },
        methods:{
          setActive(path,icon){
            if(icon==='i-classify'){
              this.$emit('command');
            }else{
              this.$router.push(path);
              this.$emit('for-left');
              // this.$emit('for-active');
            }
          }
        }
    }
</script>

<style scoped>

</style>
