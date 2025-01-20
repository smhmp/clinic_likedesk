import {ISelectBirth} from "../types";

export class dateFaConf {

    birth_year_range = [1310,1390]
    birth_month_range = [1,12]
    birth_day_range = [1,31]
    kabiseResults = [1,5,9,13,17,22,26,30]
    isGeorgian = false

  constructor({yearRange=null,isGeorgian=false}={}) {
    if(yearRange){
      this.birth_year_range = yearRange
    }
    this.isGeorgian = isGeorgian;
  }


  yearSpc(num){
    if(this.isGeorgian){
      if(num%4 === 0)
        return 366
      return 365
    }
    else{
      if(this.kabiseResults.indexOf(num%33)>-1)
        return 366
      return 365
    }
  }

  monthSpc(num){
    return num
  }

  daySpc(num,optMonth:ISelectBirth=null,optYear:ISelectBirth=null){
    if(optMonth){
      if(this.isGeorgian){
        if(optMonth.spc == 2){
          return optYear && optYear.spc === 365 ? num <= 28 : num <= 29
        }
        else if([1,3,5,7,8,10,12].indexOf(optMonth.spc)>-1){
          return num <= 31
        }
        else{
          return num <= 30
        }
      }
      else{
        if(optMonth.spc == 12){
          return optYear && optYear.spc === 365 ? num <= 29 : num <= 30
        }
        else if(optMonth.spc > 6){
          return num <= 30
        }
      }
    }
    return 31;
  }

  getOpts(markDate,getSpc,{optMonth,optYear}:ISelectBirth|any={}){
    let frs = this[markDate+'_range'][0],opts:ISelectBirth[]=[],spc;
    while (frs <= this[markDate+'_range'][1]){
      spc = getSpc.call(this,frs,optMonth,optYear)
      if(!spc){
        break
      }
      opts.push({text:frs,value:frs,spc:spc})
      frs++;
    }
    return opts;
  }
}
