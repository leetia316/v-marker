<template>
  <div id="app">
    <search-bar></search-bar>
    <div class="mui-content">
      <search-result></search-result>
    </div>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import SearchResult from './components/SearchResult.vue'

import store from '../vuex/store'

export default {
  components: {
    SearchBar,
    SearchResult
  },
  store
}
</script>

