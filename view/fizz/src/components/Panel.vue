<template>
    <div class="panel">
      <h2>{{title}}</h2>
      <button class="btn btn-primary" @click="clickBtn">改变数据</button>
      <ul>
        <li v-for="p in arrData"><a :href="p.link" target="_blank">{{p.name}}</a></li>
      </ul>
    </div>
</template>

<script>
  export default {
    name: 'Panel',
    props: {
      title: {type: String},
      arrData: {type: Array}
    },
    data () {
      return {
        childData: [{name: '巴尔扎克和小裁缝'}]
      }
    },
    methods: {
      clickBtn () {
        // 此处尝试修改arrData
        this.arrDate = [{name: '你'}, {name: '真'}, {name: '棒'}]
        this.$emit('changeArrData', this.arrDate)
        this.$emit('msgFunc')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .panel{
    width: 30%;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
    margin: 0 auto;
    float: left;
    margin-left: 10px;
  }
</style>
