<template>
  <header id="search-bar" class="mui-bar mui-bar-nav">
    <div class="show-collection-switch" @click='showCollection'>
      <span class="mui-icon mui-icon-bars"></span>
    </div>
    <input type="search" class="mui-input-clear mui-input-speech" v-model='keyword' @keyup.enter='setKeyword(0)'>
    <div class='search-switch' @click='setKeyword(0)'>
      <span class="mui-icon mui-icon-search"></span>
    </div>
  </header>
  <ul class="collection-box" v-show='collectionSwitch' transition='show'>
    <li class="coll-name" v-for='item in collectItem' @click='oprateItem(item)'>
      {{ item }}
      <span class="mui-badge mui-badge-danger" v-show='editSwitch'>×</span>
    </li>
    <li class="coll-name edit-switch" @click='showEdit'>编辑</li>
    <li class="clear"></li>
  </ul>
</template>

<script>
  require('../../static/js/zepto.min.js')

  export default { 
    data() {
      return {
        keyword: '',
        collectionSwitch: 0,
        editSwitch: 0
      }
    },
    methods: {
      showCollection() {
        let switchFun = (obj, key) => {
          key == 1? document.querySelector('.show-collection-switch').style.transform = 'rotate(90deg)': document.querySelector('.show-collection-switch').style.transform = 'rotate(0deg)'
          obj.collectionSwitch = key
        }
        this.collectionSwitch == 0? switchFun(this, 1): switchFun(this, 0)
      },
      showEdit() {
        this.editSwitch == 0? this.editSwitch = 1: this.editSwitch = 0
      },
      oprateItem(name) {
        if(this.editSwitch == 0) {
          this.setKeyword(name)
          document.querySelector('.show-collection-switch').click()
        } else if(this.editSwitch == 1) {
          this.deleteCollection(name)
        }
      },
      setKeyword(key) {
        if(key == 0) {
          this.searchFun(this.keyword)
        } else {
          this.searchFun(key)
        }
      }
    },
    vuex: {
      getters: {
        collectItem(state) {
          return state.collectItems
        }
      },
      actions: {
        deleteCollection: ({ dispatch }, name) => {
          dispatch('DELETE_COLLECTION', name)
        },
        searchFun: ({ dispatch }, keyword) => {
          $.get('http://localhost:8090', { query: keyword }, (data) => {
            dispatch('SET_RESULT', JSON.parse(data))
          })
        }
      }
    }
  }
</script>

<style scoped>
  #search-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    z-index: 100;
  }
  #search-bar .show-collection-switch {
    transition: all 400ms;
    cursor: pointer;
  }
  #search-bar .search-switch {
    cursor: pointer;
  }
  #search-bar input {
    margin-left: 10px;
    margin-right: 10px;
    text-align: left;
  }
  .show-transition {
    position: fixed;
    top: 44px;
    list-style: none;
    margin: 0;
    padding: 10px 0 0 10px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #ddd;
    z-index: 100;
    transition: all 300ms;
  }
  .show-enter, .show-leave {
    top: 0;
    opacity: 0;
  }
  .collection-box .coll-name {
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 13px;
    cursor: pointer;
  }
  .collection-box .clear {
    clear: both;
  }
  .collection-box .edit-switch {
    float: left;
    background: #eee;
  }
</style>