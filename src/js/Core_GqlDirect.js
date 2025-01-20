import {Core_GqlPrj} from "@/src/js/Core_GqlPrj";

export class Core_GqlDirect extends Core_GqlPrj{
  constructor(realName,args, body,{type=''}={}){
    super({realName,type});
    this.args = args
    this.body = body
  }
}
