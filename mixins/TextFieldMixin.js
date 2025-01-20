import {lg} from "@/src/js/dbg";
import {langTools} from "@/src/js/langMan";

export const TextFieldMixin = {
    props:{
        iLabel:{
            type:String,
            default:'',
        },
        moreGui:{
            type:Object,
            default:null,
        },
        iName:{
            type:String,
            default:'',
        },
        inpId:{
            type:String,
            default:'',
        },
        value:{
            type:String|null,
            default:null,
        },
        caption:{
            type:String,
            default:'',
        },
        dataRules:{
            type:String,
            default:'', //required,justLetter:fa,min:2,max:255,ssn,justNumber,passport,cardPan,currency,email
        },
        converterFormat:{
            type:Function,
            default:null
        },
        dataRole:{
            type:String,
            default:'input',
        },
        dataTab:{
            type:Number|String,
            default:1
        },
        maxlength:{
            type:Number|String,
            default:'',
        },
        tagNumber:{
            type:Boolean,
            default:false,
        },
        autocomplete:{
            type:String,
            default:'on',
        },
        ltr:{
            type:Boolean,
            default:false,
        },
        toEnNum:{
            type:Boolean,
            default:false,
        },
        backendErrors:{
            type:Array|String,
            default:'',
        },
      listenKeyUp:{
        type:Function,
        default:null
      },
    },
    data() {
        return {
            valName: '',
            isInputFocused:false,
            isInputFilled:false,
        };
    },
    computed: {
        isJustNumber(){
            return this.dataRules.indexOf('justNumber') > -1
        },
        addiAttr(){
            let attrs = {};
            if(this.inpId){
                attrs['id']=this.inpId;
            }
            return attrs
        },
        modValName:{
            get(){
                if(!this.valName){
                    const defVal = this.value;
                    this.valName = defVal !== null ? defVal : this.valName;
                }
                this.isInputFilled = !!this.valName;
                const res = this.valName;
                return res;
            },
            set(val){
                this.valName = val
            },
        }
    },
    methods: {
        doFocusIn(){
            this.$refs.inpRef.focus();
        },
        onFocusIn(){
            this.isInputFocused = true;
        },
        onFocusOut(e){
            window.setTimeout(()=>{
                this.isInputFocused = false;
                this.isInputFilled = !!this.valName;
            },120)
            this.$emit("blur", e);
        },
        onKeyUp(e){
            let chged = false;
            if(this.isJustNumber || this.toEnNum){
                e.target.value = langTools.convertToEnNum(e.target.value)
                chged = true;
            }
            if(this.converterFormat){
                e.target.value = this.converterFormat(e);
                chged = true;
            }
            if(chged){
                this.modValName = e.target.value;
            }
            if(this.listenKeyUp)this.listenKeyUp(this.modValName)
        },
        onPaste(e){
            if(this.isJustNumber || this.toEnNum){
                e.target.value = langTools.convertToEnNum(e.target.value)
            }
            if(this.converterFormat){
                e.target.value = this.converterFormat(e);
            }
        },

    },
}
