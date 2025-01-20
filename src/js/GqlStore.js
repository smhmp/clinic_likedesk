import {Core_GqlPrj} from "@/src/js/Core_GqlPrj";

export class GqlStore extends Core_GqlPrj{

  constructor(moduleName,{mutationSchema=null,querySchema=null}){
    super({mutationSchema,querySchema});

    this.moduleName = moduleName;
  }

  activeLoad(){
    const moduleName = this.moduleName
    // $zpl.storeMan.commit(moduleName?`${moduleName}/${'activeLoading'}`:'activeLoading');
  }

  deActiveLoad(){
    const moduleName = this.moduleName
    // $zpl.storeMan.commit(moduleName?`${moduleName}/${'deActiveLoading'}`:'deActiveLoading');
  }
}
