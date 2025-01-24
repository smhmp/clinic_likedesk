import {lg, lgErr} from "@/src/js/dbg";

let PaginateMixin = {
  data(){
    return {
      hasPaginate:true,
      listItems: null,
      selectedLimit: 25,
      selectedLastPage: 0,
      lastPage: 1,
      listenerWheel: null,
      latestPosDest: 0,
    }
  },
  created() {
    if(!('urlManager' in this)){
      lgErr('Add "UrlMixin" in Component/Component',this)
    }
  },
  methods:{
    readyListenWheel(token){
      try{
        if(this.listenerWheel){
          this.$zplUi.adev(window,'mousewheel',this.listenerWheel)
        }
        this.listenerWheel  = (e)=>{
          token.wheelOccured = true
        }
        this.$zplUi.adev(window,'mousewheel',this.listenerWheel)
      }
      catch (e) {}
      return token
    },
    readyPaginate({addi=[],max=0,initSelected=0}={}){
      this.chgItemsLimit({addi,max})
      this.chkLimit({initSelected})
    },
    onChgPage(page){
      const urlManager= this.urlManager
      urlManager.set_page(page)
      urlManager.goNewQuery()
    },
    chkLimit({initSelected}){
      const items = this.listItems
      const limit = this.urlManager.getRoutQuery('limit',{toInt:true})
      if(limit){
        if(items.filter(eIrm=>eIrm.value===limit).length){
          this.selectedLimit = limit
        }
        else{
          this.urlManager.delFilter('limit')
          this.urlManager.fixedQuery({limit:true})
        }
      }
      if(!initSelected){
        initSelected = items[0].value
      }
      if(limit){
        if(this.selectedLimit !== limit){
          if(initSelected < limit){
            this.selectedLimit = initSelected
          }
          else{
            if(!this.$zpl.arrFind(items,(eItm)=>{
              if(eItm.value < limit){
                this.selectedLimit = eItm.value
                return true
              }
            })){
              this.selectedLimit = initSelected
            }
          }
        }
      }
      else{
        this.selectedLimit = initSelected
      }
    },
    chgItemsLimit({addi=[],max=0}){
      let items = [{title:25,value:25},{title:50,value:50},{title:75,value:75},{title:100,value:100}]
      if(max){
        items = items.filter((eItem)=>{
          return eItem.value <= max
        })
      }

      if(addi.length){
        addi.forEach((num)=>{
          this.$zpl.arrFind(items,(eItm,indx)=>{
            if(eItm.value > num){
              items.splice(indx,0,{title:num,value:num})
              return true
            }
          })
        })
      }
      this.listItems = items
    },
    chkLastPage(arrData,lastPage,reqPage, {scrollToE = null}={}){
      /*if((!arrData||!arrData.length)&&reqPage>1){
        reqPage--
        this.onChgPage(reqPage)
      }
      else{

      }*/
      if(arrData && arrData.length){
        if(lastPage === reqPage){
          this.selectedLastPage = reqPage
        }
        else{
          this.selectedLastPage = 0
        }
        if(scrollToE){
          const vm = this
          vm.$nextTick(()=>{
            /*$zpl.setScrollTop(document.body.scrollHeight)
            return*/
            window.setTimeout(()=>{
              const posInf = scrollToE.getClientRects()[0]
              if(posInf){
                const untilNum = Math.max(posInf.top>0?posInf.top:posInf.bottom , this.latestPosDest)

                if(vm.$zplUi.getViewport({justTop:true}) < untilNum){
                  return
                }

                this.latestPosDest = untilNum
                const token = vm.readyListenWheel({});
                vm.$zplUi.animateMove({deadTime:1000,untilNum:untilNum-50,token:token},({elapsed, untilNum, count})=>{
                  count = Math.max(vm.$zplUi.getViewport({justTop:true}) - elapsed, untilNum);
                  vm.$zplUi.setScrollTop(count)
                  if(count === untilNum){
                    // this.$refs.paginationRef.updateOnScroll()
                  }
                  return count
                })
              }
            },300)
          })
        }
      }
      else if(this.selectedLastPage){
        this.onChgPage(lastPage)
      }
      else{
        this.onChgPage(1)
      }
    },
    async changeLimitPage(limitPage){
      this.selectedLimit = limitPage.value
      this.urlManager.setFilter({limit:this.selectedLimit})
      this.urlManager.goNewQuery()
    },
    onOpenSel(){
      /*this.$nextTick(()=>{
        $zpl.setDelay(()=>{
          this.$zplUi.setScrollTop(0, document.body.scrollHeight)
        })
      })*/
    },
  },
}
export default PaginateMixin;
