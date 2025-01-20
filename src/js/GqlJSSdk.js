import {Core_GqlDirect} from "@/src/js/Core_GqlDirect";

export class GqlJSSdk extends Core_GqlDirect{
  constructor(realName,{args=null, body='',type='query'}={}){
    super(realName,args, body,{type})
  }

  generateArgs(args) {
    let str =  ``,val=''
    for (let arg in args) {
      val = args[arg]
      if(typeof val == 'string'){
        val = `"${val}"`
      }
      str += `${arg}:${val},`
    }
    return str
  }

  generateBody(body) {
    let str = ''
    for(let item of body) {
      if(typeof(item) === 'object') {
        for (let key in item){
          str += `${key} { ${this.generateBody(item[key])} }`
        }
      } else {
        str += ` ${item} `
      }

    }
    return str
  }

  getGqlBody(){
    const {realName,args,body,type} = this
    return `${type} {
                  ${realName} ${args && Object.keys(args).length ? `(${this.generateArgs(args)})` : ''}
                  ${body.length ? `{ ${this.generateBody(body)} }` : this.generateBody(body)}
                  
              }`
  }

  getArgs(){
    return {}
  }
}
