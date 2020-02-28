<template>
  <div class="com-g-header">
    <span>{{msg}}</span>
    <button @click="clickMethod">点击</button>
  </div>
</template>
<script>
import "./index.scss";

export default {
  data() {
    return {
      msg: 'Header'
    };
  },
  methods: {
    clickMethod() {
      alert(this.msg);
    }
  }
};
</script>
