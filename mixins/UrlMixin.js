import {UrlManager} from "@/src/js/UrlManager";

let UrlMixin = {
  data(){
    return {
      MyUrlManager:null,
      /**
       * @type UrlManager
       */
      urlManager:null,
      urlRout:'',
      initFilters:{},
    }
  },
  created() {
    this.urlManager = new (this.MyUrlManager?this.MyUrlManager:UrlManager)(this.urlRout,this)
    this.urlManager.onDomOccurred('created')
  },
  methods:{
    setInitFilter({replace = false, initFilter = false}={}){
      if('hasPaginate' in this){
        this.urlManager.set_page(this.urlManager.get_page() || 1);
      }

      if(initFilter){
        this.urlManager.onChgFilter(this.initFilters,true)
      }

      this.urlManager.goQuery(replace)
    },
    getQuery(key='', {isVal = null, byIncl = false,toInt=false}={}){
      return this.urlManager.getRoutQuery(key, {isVal, byIncl,toInt})
    },
    watchQuery(val,{onChg,onNoChg}){
      const urlManager= this.urlManager,vm=this
      urlManager.onWatchQuery(val,{
        onNoChg(){
          urlManager.resetAnyFilter()
        },
        onChg(){
          urlManager.replicateByUrl()
          if(onChg) onChg()
        }
      })
    }
  }
}
export default UrlMixin;
