<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Panel :title="poerty" :arrData="poetryArr" @msgFunc="func"></Panel>
    <Panel :title="algorithm" :arrData="algorithmArr"></Panel>
    <Panel :title="way" :arrData="ways"></Panel>
  </div>
</template>

<script>
  import Panel from './Panel.vue'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'It is my vue test project',
        poerty: '唐诗三百首',
        algorithm: 'LeetCode算法题',
        way: '科目三考道',
        poetryArr: [{name: '行宫', author: '元稹', content: '寥落古行宫，宫花寂寞红。白头宫女在，闲坐说玄宗。', link: 'http://so.gushiwen.org/view_20788.aspx'},
          {name: '行宫', author: '元稹', content: '寥落古行宫，宫花寂寞红。白头宫女在，闲坐说玄宗。', link: ''},
          {name: '行宫', author: '元稹', content: '寥落古行宫，宫花寂寞红。白头宫女在，闲坐说玄宗。', link: ''},
          {name: '行宫', author: '元稹', content: '寥落古行宫，宫花寂寞红。白头宫女在，闲坐说玄宗。', link: ''},
          {name: '行宫', author: '元稹', content: '寥落古行宫，宫花寂寞红。白头宫女在，闲坐说玄宗。', link: ''},
          {name: '行宫', author: '元稹', content: '寥落古行宫，宫花寂寞红。白头宫女在，闲坐说玄宗。', link: ''},
          {name: '行宫', author: '元稹', content: '寥落古行宫，宫花寂寞红。白头宫女在，闲坐说玄宗。', link: ''},
          {name: '行宫', author: '元稹', content: '寥落古行宫，宫花寂寞红。白头宫女在，闲坐说玄宗。', link: ''}],
        algorithmArr: [{title: 'Two Sum', desc: 'indices  exactly ', link: 'https://leetcode.com/problems/two-sum/description/', diffic: 'easy'},
          {name: 'Two Sum', desc: 'indices  exactly ', link: 'https://leetcode.com/problems/two-sum/description/', diffic: 'easy'},
          {name: 'Two Sum', desc: 'indices  exactly ', link: 'https://leetcode.com/problems/two-sum/description/', diffic: 'easy'},
          {name: 'Two Sum', desc: 'indices  exactly ', link: 'https://leetcode.com/problems/two-sum/description/', diffic: 'easy'},
          {name: 'Two Sum', desc: 'indices  exactly ', link: 'https://leetcode.com/problems/two-sum/description/', diffic: 'easy'},
          {name: 'Two Sum', desc: 'indices  exactly ', link: 'https://leetcode.com/problems/two-sum/description/', diffic: 'easy'},
          {name: 'Two Sum', desc: 'indices  exactly ', link: 'https://leetcode.com/problems/two-sum/description/', diffic: 'easy'},
          {name: 'Two Sum', desc: 'indices  exactly ', link: 'https://leetcode.com/problems/two-sum/description/', diffic: 'easy'}],
        ways: [{title: '第一考道', link: '', desc: '第一考道描述'},
          {name: '第一考道', link: '', desc: '第一考道描述'},
          {name: '第一考道', link: '', desc: '第一考道描述'},
          {name: '第一考道', link: '', desc: '第一考道描述'},
          {name: '第一考道', link: '', desc: '第一考道描述'},
          {name: '第一考道', link: '', desc: '第一考道描述'},
          {name: '第一考道', link: '', desc: '第一考道描述'},
          {name: '第一考道', link: '', desc: '第一考道描述'}]
      }
    },
    methods: {
      func () {
        console.log(`触发func函数${this.msg}`)
      }
    },
    components: {
      Panel
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
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
