<template>
  <div class="page-home">
    <Header />
    <SideBar />
    <div class="container">
      <p v-for="(item,key) in buList" :key="'bu_item_'+key">{{item.name}}</p>
    </div>
    <div>{{JSON.stringify($store.state)}}</div>
  </div>
</template>

<script>
import Header from "../../../components/header/index.vue";
import SideBar from "../../../components/side-bar/index.vue";
import "./index.scss";
import buService from "../../../api/bu";
import { setStatus, setUser } from "../../../store/acd/index";

export default {
  name: "home",
  data() {
    return {
      buList: []
    };
  },
  components: {
    Header,
    SideBar
  },
  async mounted() {
    const data = buService.getBuList();
    this.buList = data;

    setStatus("online"); // 这是一个async函数
   await setUser({ id: "new agent" }); // 这是一个async函数
   console.log(this.$store.state.acd.user);
  }
};
</script>
