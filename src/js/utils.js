export const chkKeyVal=(repo,key,isVal,byIncl=false)=>{
  if(key){
    if(repo[key] && isVal){
      if(repo[key] instanceof Array)
        return repo[key].indexOf(isVal) > -1
      if(byIncl)
        return repo[key].includes(isVal)
      return repo[key] == isVal
    }
    return repo[key]
  }
  return repo
}
