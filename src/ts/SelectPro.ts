/**
 * Custom SELECT component
 * -----------------------------------------
 */
import zpl from "./zpl";
import {ValidationRules} from "./validation/ValidationRules";
import FieldObj from "./FieldObj";
import SmartObj from "./SmartObj";
import {lg} from "./dbg";
import FeatureKey from "./keyboard/FeatureKey";
import {configs} from "./types";
import {$zplUi} from "~/plugins/zplUi";

export default class SelectPro extends SmartObj{
  static iThem = `
<div class="select-wrapper">
    <div class="select-input w-full">
        <div class="input-wrapper">
            <input placeholder=" " autocomplete="x" class="inpEnter">            
            <label for=""></label>
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 10L12 14L16 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
    <div class="options hidden">
        <input class="search" placeholder="">
        <div class="list w-full"></div>
    </div>
</div>
`

  selInputText:FieldObj
  selInput:FieldObj
  options:HTMLElement
  selectWrapper:HTMLElement
  optionsWrapper:HTMLElement
  label:HTMLElement
  searched = []
  searchInput: HTMLInputElement
  /*changeCalbs=[]
  focusCalbs=[]
  blurCalbs=[]*/
  curIndxOptSeled=-1
  focused=false
  fieldObj:FieldObj
  configs:configs

  constructor(divList,fieldObj:FieldObj,ttlLbl,configs:configs) {
    super();
    this.fieldObj = fieldObj
    this.configs = configs
    const selectWrapper = zpl.crtElm(SelectPro.iThem)
    this.optionsWrapper = selectWrapper.querySelector('.options');
    this.options = selectWrapper.querySelector('.options .list') as HTMLElement;
    const selectInput = selectWrapper.querySelector('.select-input');
    this.label = selectInput.querySelector('label');
    this.label.textContent = ttlLbl
    this.searchInput = selectWrapper.querySelector('.search');
    if(!configs.offSearch){
        this.searchInput.placeholder = `جستجوی ${ttlLbl}`
    }

    this.selInput = FieldObj.newField(fieldObj.fieldElm);
    const selInputText = selectWrapper.querySelector('.inpEnter') as HTMLInputElement
    this.selInputText = FieldObj.newField(selInputText);

    let dataOptions;
    if(configs.listOpts){
      dataOptions = configs.listOpts;
    }
    else{
      dataOptions = JSON.parse(divList.dataset.list)
    }
    this.searched = [...dataOptions]

    this.searchDataGenerator(dataOptions)

      if(!configs.offSearch){
          $zplUi.adev(this.searchInput,['keyup','keydown'], (e,evTyp) => {
              if(evTyp === 'keyup'){
                  this.onSearch(e.target as HTMLInputElement);
              }
              else{
                  const kstr = zpl.getEvStrKey({evTyp, e})
                  if(kstr === 'arrowdown'||kstr === 'arrowup'){
                      zpl.prevUp(e)
                      this.doNexBefOption(e,kstr)
                  }
              }
          })

          this.searchInput.addEventListener('focus', (e) => {
              this.doFocus(e)
          })
      }

    /*this.searchInput.addEventListener('blur', (e) => {
      this.doblur(e)
    })*/

    let elmClk = selectInput;
    if(configs){
      if(configs.onClick){
        elmClk = selectWrapper.querySelector(configs.onClick);
      }
    }

    elmClk.addEventListener('click', (e) => {
      this.doFocus(e)
    })

    document.addEventListener('click', (e: Event) => {
      this.doblur(e)
    });

    divList.parentNode.replaceChild(selectWrapper,divList)
    this.selectWrapper = selectWrapper;

    fieldObj.setSmartObj(this);

    this.doblur();
  }

  unDoClickMe(e,doWat=''){
    this.onClickOut(e,doWat)
  }

  doClickMe(e){
    this.clickField()
  }

  clickField(){
    this.optionsWrapper.classList.remove('hidden')
    this.label.classList.add('hidden');
    if(!this.configs.offSearch){
        this.searchInput.focus()
    }
  }

  selectOpt(code){
    const searched = this.searched.filter((opt) => opt.code === code)[0];
    this.onSelectOpt(null,searched.code,searched.text)
  }

  onSelectOpt(e,code='', text=''){
    this.selInputText.setValue(text)
    this.selInput.setValue(code)
    if(code){
      if(this.configs){
        if(this.configs.onSelect){
          this.configs.onSelect(code);
        }
      }
    }
    this.searchDataGenerator(this.searched)
    if(e){
      this.doChangeCalbs(e);
    }
  }

  searchDataGenerator(searched){
    this.options.innerHTML = '';
    searched.forEach(o =>{
      const eOpt = zpl.crtElm(`<button type="button" class="${this.selInput.isValue(o.code) ? 'selected' : null}" data-value="${o.code}">
        ${o.text}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 10L11 15L8 12" stroke="#0A33FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>`);

      eOpt.addEventListener('click',(e)=>{
        this.onSelectOpt(e,`${o.code}`, `${o.text}`)
      })

      this.options.appendChild(eOpt);
    })

    if(this.configs.otherOpt){
        const otherOpt = this.configs.otherOpt;
        const eOpt = zpl.crtElm(`<button type="button" class="${this.selInput.isValue('') ? 'selected' : null}" data-value="${''}">
        ${otherOpt.optTitle}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 10L11 15L8 12" stroke="#0A33FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>`);

        eOpt.addEventListener('click',(e)=>{
          this.onSelectOpt(e,otherOpt.optCode,otherOpt.optTitle);
          if(otherOpt.onSelected){
            otherOpt.onSelected();
          }
        })

        this.options.appendChild(eOpt);
    }
  }

  onClickOut(e,doWat=''){
    const componentInputElement =  e?this.selectWrapper.contains(e.target as HTMLElement):null
    /*if(e){
      lg(this.selectWrapper,'SelectPro/onClickOut/ this.selectWrapper')
      lg(e.target,'SelectPro/onClickOut/ e.target')
      lg(componentInputElement,'SelectPro/onClickOut/ componentInputElement')
    }*/
    if (!componentInputElement||(doWat==='doblur'&&(!e || e.target===this.searchInput))) {
      this.optionsWrapper.classList.add('hidden')
      this.label.classList.remove('hidden');
      this.curIndxOptSeled = -1
    }
  }

  onSearch(inp) {
    const value = FieldObj.newField(inp).getValue()

    const searched = [...this.searched].filter((opt: HTMLOptionElement) => opt.text.includes(value));
    this.searchDataGenerator(searched)
  }

  chkRules(validateRules:ValidationRules,eRuleName){
    switch (eRuleName){
      case 'required':
        validateRules.chkRequired(this.selInputText.getValue());
    }
  }

  doFocus(e){
    if(!this.focused){
      // lg(this,'SelectPro doFocus')
      this.doClickMe(e)
      this.focused = true
    }
  }

  doblur(e=null){
    // lg(this,'SelectPro doblur')
    this.unDoClickMe(e,'doblur')
    this.focused = false
  }

  doNexBefOption(e,kstr){
    if(kstr === 'arrowdown'){
      this.curIndxOptSeled = Math.min(this.searched.length-1,this.curIndxOptSeled+1);
    }
    else if(kstr === 'arrowup'){
      this.curIndxOptSeled = Math.max(0,this.curIndxOptSeled-1);
    }
    const optSeled = this.searched[this.curIndxOptSeled];
    this.onSelectOpt(null,optSeled.code,optSeled.text)
    return true;
  }

  doEnterOption(e){
    if(this.curIndxOptSeled>-1){
      const optSeled = this.searched[this.curIndxOptSeled];
      this.onSelectOpt(e,optSeled.code,optSeled.text)
      this.doblur(e)
      return true;
    }
    return false;
  }

}
