<template>
  <myHeader/>
  <router-view></router-view>

</template>

<script>
  import myHeader from '@/components/my-header.vue'
  export default {
    components: {
      myHeader
    }
  }
</script>

<style lang="scss">
  $light: rgb(159, 216, 235);
  
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: $light;
  font-family: Arial, Helvetica, sans-serif;
}

h1, h2{
  margin: 4px;

}
</style>