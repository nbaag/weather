<template>
  <header>
    <nav style="display: inline">
      <a href="#">Home</a>
      <a href="#">Month</a>
      <a href="#">About</a>
    </nav>
  </header>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
header {
  margin: 5px;
  background-color: rgb(49, 218, 218);
  border-radius: 5px;
  overflow: hidden;
  height: 47px;
  line-height: 47px;
  position: sticky;
  top: 5px;
}

header a {
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  color: #000;
  font-weight: bold;
}

header a:hover {
  background-color: #ddd;
}
</style>