import {lg} from "@/src/js/dbg";

export const scopeMarks = {
  mdBlock:['**','* ','*','```','`'],
  mdInline:{
    numberedList:/\d+\.\s.*?\n/gi,
    genericList:/\*\s.*?\n/gi,
  }
}

export let lgConf = {
  mdBlock:{grp:1,prio:101},
  mdInline:{grp:2,prio:101},
  mdScop:{prio:10},
}

lgConf = {
  ...lgConf,
  init:{backCol:'black',col:'white',...lgConf.mdBlock},
  flow:{backCol:'green',col:'yellow',...lgConf.mdBlock},
  marks:{backCol:'yellow',col:'black',...lgConf.mdBlock},
  details:{backCol:'rgba(248, 248, 248,.5)',col:'black',...lgConf.mdBlock},
  mdInline:{backCol:'rgba(196,255,182,0.5)',col:'rgba(51,46,136,0.5)',...lgConf.mdInline},
}

class MarkInfo{
  relateChar;
  txtIndxs;

  constructor(markChar,frmIndx,toIndx) {
    this.myChar = markChar
    this.txtIndxs = [frmIndx,toIndx]
    this.openPos = false
    this.closePos = false
    this.unknownPos = true
  }

  isSame(char){
    return this.myChar === char
  }

  isContain(chars){
    return chars.indexOf(this.myChar) > -1
  }

  setOpen(newChar){
    this.openPos = true
    this.unknownPos = false
    if(newChar){
      this.setRelate(newChar)
    }
  }

  setRelate(mark){
    this.relateChar = mark
  }

  setClose(befChar){
    this.closePos = true
    this.unknownPos = false
    this.setRelate(befChar)
  }

  isClosed(){
    return this.closePos
  }

  isOpened(){
    return this.openPos
  }

  isUnknown(){
    return this.unknownPos
  }
}




const isScopMod=({char='',chars=[]},typeLang)=>{
  if(typeLang === 'md'){
    if(char){
      switch (char){
        case '`':case '*':case '**':
          return true
      }
    }
    else{
      return chars === scopeMarks.mdBlock
    }
  }
  return false
}

const findMark=(tokenSrch,typeLang)=>{
  let indx = -1,defMarks
  tokenSrch.chked = true
  if(typeLang){
    defMarks = scopeMarks[typeLang]
    while (true){
      const defMark = tokenSrch.getDefMark(defMarks)
      if(!defMark){
        tokenSrch.setUnSuccess()
        break
      }

      const nextChar = tokenSrch.tokenMan.getChar()
      if(!nextChar){
        tokenSrch.setUnSuccess()
        break
      }

      // lg('nextChar',nextChar,lgConf.details)

      tokenSrch.charMark += nextChar
      indx = defMark.indexOf(tokenSrch.charMark)
      if(indx === 0){
        tokenSrch.isMaybeValid = true;
        // lg('tokenSrch.isMaybeValid/charMark',tokenSrch.charMark,lgConf.details)
        if(tokenSrch.charMark.length === defMark.length){
          /*lg('tokenSrch/success/charMark',tokenSrch.charMark,{addi:{
              tokenSrch:tokenSrch
            },...lgConf.details})*/
          tokenSrch.setSuccess()
          break
        }
      }
      else{
        tokenSrch.setUnSuccess()
      }
    }
  }
}

class TokenSrch{
  constructor(tokenMan) {
    this.tokenMan = tokenMan
    this.charMark = ''
    this.frsCursor = -1;
    this.isMaybeValid = false;
    this.chked = false;
  }

  setUnSuccess(){
    this.isMaybeValid = false;
    this.tokenMan.addiChars = this.charMark.split('').concat(this.tokenMan.addiChars)
    this.charMark = '';
  }

  setSuccess(){
    this.frsCursor = this.tokenMan.frmCursor
    this.tokenMan.frmCursor = this.getToCursor()
  }

  getMark(){
    return this.charMark
  }

  getFrmCursor(){
    return this.frsCursor
  }

  getToCursor(){
    return this.frsCursor+this.charMark.length
  }

  getDefMark(defMarks){
    if(!this.isMaybeValid){
      this.tokenMan.indxSrched++
    }
    const res = defMarks[this.tokenMan.indxSrched]
    if(!res){
      this.tokenMan.indxSrched = 0
    }
    return res
  }
}

class TokensMan{
  constructor(blockParser) {
    this.blockParser = blockParser
    this.tokensMark = []
    this.addiChars = []
    this.indxSrched = -1;
    this.frmCursor = -1;
  }

  isAddiChar(){
    return this.addiChars.length
  }

  getChar(){
    let res = this.addiChars.shift();
    if(!res){
      res = this.blockParser.getNextChar();
      if(this.frmCursor<0){
        this.frmCursor = this.blockParser.getCurCursor();
      }
    }
    return res;
  }

  getAddiChars(){
    return this.addiChars
  }

  getTokenSrch(){
    const res = this.tokensMark.shift()
    return res
  }

  lookingForMark(typeLang){
    let tokenSrch = new TokenSrch(this)
    this.tokensMark.push(tokenSrch)
    while (true){
      if(this.isAddiChar()&&tokenSrch.isMaybeValid){
        tokenSrch = new TokenSrch(this)
        this.tokensMark.push(tokenSrch)
      }
      if(tokenSrch.chked){
        break
      }
      findMark(tokenSrch,typeLang)
    }
  }
}



export class BlockParser{

  static isContainMdBlock(text){
    const md = scopeMarks.mdBlock
    for(let i=0;i<md.length;i++){
      if(text.indexOf(md[i])>-1){
        return true
      }
    }
    return false
  }

  constructor(text,{mdLang=true}) {
    this.text = text;
    this.typeLang = mdLang?'mdBlock':'';
    this.curCursor = -1;
    this.repoChars = []
  }

  readyCursor(indx,frmIndx){
    if(frmIndx>-1){
      this.repoChars.splice(indx)
      this.curCursor = frmIndx-1;
    }
    else{
      this.repoChars = [] //felan code ro ta hadi zadam ke baraye static text hast va faghat parseri hast ke baraye eslahe khorooji be kar mire pas hamishe az aval shoroo mikone
    }
    // lg('readyCursor/',{repoChars:this.repoChars,curCursor:this.curCursor},lgConf.init)
  }

  isNextChar(){
    return this.text[this.curCursor+1]
  }

  getNextChar(){
    const res = this.text[this.curCursor+1]
    if(res){
      this.curCursor++;
      // lg('getNextChar/res',[this.curCursor,res],lgConf.details)
    }
    return res
  }

  getCurCursor(){
    return this.curCursor
  }

  getBefMark({isPosOpen = false,isPosClose = false,char=''}){
    if(this.repoChars.length){
      let i=0,latestChar
      while((latestChar = this.repoChars[this.repoChars.length-++i])){
        if(latestChar instanceof MarkInfo){
          if(isPosOpen){
            if(char&&!latestChar.isSame(char)){
              continue
            }
            if(latestChar.isOpened()){
              break
            }
            else if(latestChar.isClosed()){
              return
            }
          }
          else if(isPosClose){
            if(char&&!latestChar.isSame(char)){
              continue
            }
            if(latestChar.isClosed()){
              break
            }
            else if(latestChar.isOpened()){
              return
            }
          }
          else if(char){
            if(latestChar.isSame(char)){
              break
            }
          }
          else{
            break
          }
        }

      }
      return latestChar
    }
  }

  determinize(indxMarkInfo=-1,frmIndx=-1){
    this.readyCursor(indxMarkInfo,frmIndx)
    let tokensMan;
    while (this.isNextChar()){
      tokensMan = new TokensMan(this);
      /*if(this.text.indexOf('spctst2')>-1){

      }*/
      tokensMan.lookingForMark(this.typeLang)

      let token,charMark;
      while((token = tokensMan.getTokenSrch())){
        charMark = token.getMark()
        if(charMark){
          /*lg('tokenSrch/charMark',charMark,{addi:{
              token:token
            },...lgConf.flow})*/
          if(charMark === '* '||charMark === '```'){
            continue
          }
          // lg(`token / charMark: ${charMark}`,token, lgConf.marks)
          const newChar = new MarkInfo(charMark,token.getFrmCursor(),token.getToCursor())
          // lg('newChar',newChar, lgConf.marks)
          const befMark = this.getBefMark({char:charMark})
          if(befMark&&befMark.isOpened()){
            newChar.setClose(befMark)
            befMark.setRelate(newChar)
          }
          else{
            newChar.setOpen(befMark)
          }
          this.repoChars.push(newChar)
        }
      }

      /*const addiChars=tokensMan.getAddiChars(); // ba inke dorost hast vali felan niazi behesh nadaram
      if(addiChars.length){
        let j=0;
        while (addiChars[j]){
          this.repoChars.push(tokensMan.addiChars[j])
          j++;
        }
      }*/
    }
  }

  walker(startIndxMark,calb){
    let i=startIndxMark+1;
    while (this.repoChars[i]){
      if(this.repoChars[i] instanceof MarkInfo){
        if(calb(this.repoChars[i],i)===true){
          break
        }
      }
      i++;
    }
  }

  __isFounded(eMark,calbFounded,txtIndxs,indxEMark,{char='',chars=[]}){
    if(char){
      if(eMark.isSame(char)){
        calbFounded(eMark.myChar,txtIndxs,indxEMark)
        return true
      }
    }
    else if(chars.length){
      if(eMark.isContain(chars)){
        calbFounded(eMark.myChar,txtIndxs,indxEMark)
        return true
      }
    }
    return false
  }

  find({char='',chars=[]}, {posOpen=false,posClose=false,startIndxMark=-1},calbFounded){
    this.walker(startIndxMark,(eMark,indxEMark)=>{
      const txtIndxs = eMark.txtIndxs
      if(isScopMod({char:char,chars:chars},this.typeLang)){
        if(posOpen){
          if(eMark.isOpened()){
            if(this.__isFounded(eMark,calbFounded,txtIndxs,indxEMark,{char:char,chars:chars})){
              return true
            }
          }
        }
        else if(posClose){
          if(eMark.isClosed()){
            if(this.__isFounded(eMark,calbFounded,txtIndxs,indxEMark,{char:char,chars:chars})){
              return true
            }
          }
        }
        else{
          throw 'You must define position stat for find char'
        }
      }
      else{
        if(this.__isFounded(eMark,calbFounded,txtIndxs,indxEMark,{char:char,chars:chars})){
          return true
        }
      }
    })
  }
}



export class InlineParser{

  static isContains(text){
    const mds = scopeMarks.mdInline
    for(const [name,md] of Object.entries(mds)){
      if(md instanceof RegExp){
        if(md.test(text)){
          return true
        }
      }
      else if(text.indexOf(md)>-1){
        return true
      }
    }
    return false
  }

  constructor(text) {
    this.text = text
    this.numberedList = []
    this.genericList = []
    this.lines = []
  }

  readySplit(){
    this.lines = []
    const spliter = '\n'
    return this.text.split(spliter)
  }

  parserSimple(){
    const contLns = this.readySplit()
    contLns.forEach((eCont,lineNum)=>{
      this.lines.push({cont:eCont})
    })
  }

  parserMd(){
    const contLns = this.readySplit()
    const mds = scopeMarks.mdInline
    let regx;
    let founded = ''
    let newList = true
    contLns.forEach((eCont,lineNum)=>{
      for(const [name,md] of Object.entries(mds)){
        founded = ''
        switch (name){
          case 'numberedList':
            if(/^\d+\.\s/i.test(eCont)){
              founded = name
            }
            break
          case 'genericList':
            if(/^\*\s/i.test(eCont)){
              founded = name
            }
            break
          default:
            if(md instanceof RegExp){
              regx = md
            }
            else{
              regx = new RegExp(md,'g')
            }
            if(regx.test(eCont)){
              founded = name
            }
        }
        if(founded){
          break
        }
      }
      if(founded){
        this.lines.push({mdName:founded,cont:eCont,newList:newList?1:0})

        /*lg('eCont',eCont,{addi:{
            mdName:founded,newList:newList?1:0
          },...lgConf.mdInline})*/

        newList = false
      }
      else{
        this.lines.push({cont:eCont})
        newList = true
      }
    })
  }

  getScop(mdName){
    const scopIndx = []
    this.lines.forEach((eNLst)=>{
      if(mdName === eNLst.mdName){
        scopIndx.push({frmIndx: eNLst.index,toIndx:eNLst[0].length+eNLst.index,cont:eNLst[0]})
      }
    })
    return scopIndx
  }

  getScops(mdNames){
    const scopList = {}
    mdNames.forEach((eName)=>{
      scopList[eName] = this.getScop(eName)
    })
    return scopList
  }
}
