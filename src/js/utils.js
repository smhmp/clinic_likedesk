export const chkKeyVal=(repo,key, {spcKey,isVal, byIncl = false}={})=>{
  if(key){
    if(repo[key] && (isVal||spcKey)){
      if(repo[key] instanceof Array)
        return repo[key].indexOf(isVal) > -1
      if(byIncl)
        return repo[key].includes(isVal)
      if(spcKey){
          return repo[key][spcKey]
      }
      return repo[key] == isVal
    }
    return repo[key]
  }
  return repo
}
