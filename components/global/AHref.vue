<template>
  <a v-if="isNewTab" :title="titleUrl" :href="hrefUrl" target="_blank">{{cont}}</a>
  <nuxt-link v-else :title="titleUrl" :to="hrefUrl">{{cont}}</nuxt-link>
</template>

<script>
import {MyConfigMixin} from "@/mixins/MyConfigMixin";

export default {
  name: 'AHref',
  props:{
    conf:{
      type: String,
      default:''
    },
    toUrl:{
      type: String,
      default:''
    },
    cont:{
      type: String,
      default:''
    },
    titleUrl:{
      type: String,
      default:''
    },
    pageName:{
      type: String,
      default:''
    },
    pageId:{
      type: [String,Number],
      default:''
    },
    queryParams:{
      type: Object
    }
  },
  computed:{
    isNewTab(){
      return this.isConf_aHref(this.conf,'newTab')
    },
    hrefUrl(){
      let url;
      if(this.toUrl){
        url = this.toUrl
      }
      else{
        url = `${this.pageName}`
        if(this.pageId){
          url += `/${this.pageId}`
        }
        if(this.queryParams){
          url += `?`
          $zpl.objFind(this.queryParams,(val,key,i)=>{
            if(i>0){
              url += `&`
            }
            url += `${key}=${val}`
          })
        }
      }
      if(!/^[\\.\/]/.test(url[0])){
        if(this.isNewTab){
          const $router = this.$router;
          const baseDir = $router.options.base || ''
          return `${baseDir}/${url}`
        }
        else{
          return `/${url}`
        }
      }
    }
  },
  mixins:[MyConfigMixin]
};
</script>
