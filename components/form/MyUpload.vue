<template>
  <div :class="['MyUpload','upload',{bottomRule:bottomRule||alignBottomRule}]">
    <div v-if="topRule" class="upload-restrictions">
      <div class="file-format fileRules">فرمت‌های مجاز: jpg, png, jpeg</div>
      <div class="file-size fileRules">حداکثر سایز فایل: ۲ مگابایت</div>
    </div>
    <div v-if="!!title" class="upload-label">
      <div class="label2">{{title}}</div>
    </div>
    <div class="drop-zone asParentBtn" :class="{'success-upload':uploading.curState==='success','uploading':uploading.curState==='uploading','uploading-false':uploading.errorMsg}">
      <div class="outlined-button asBtn">
        <div class="cloud">
          <img class="group" src="@/assets/imgs/formLegal/group0.svg" />
        </div>
        <div class="label">انتخاب فایل...</div>
      </div>
      <div v-if="!uploading.curState" class="text">یا فایل‌ را در این قسمت رها کنید</div>
      <div class="select-box" v-if="uploading.curState==='success'">
        <span class="title-uploading"> {{ `${"نام فایل:"} ${uploading.name}` }} </span>
      </div>
      <div class="select-box" v-if="uploading.curState==='uploading'">
        <span class="upload-notify"> {{ `${"درحال بارگذاری ... "} ${uploading.name}` }} </span>
      </div>
      <div class="select-box" v-if="uploading.errorMsg">
        <span class="upload-notify"> {{ uploading.errorMsg }} </span>
      </div>
      <input ref="inpRef" type="file" accept="image/png, image/jpeg, image/jpg" class="inpUpload" @change="uploadLegalFile">
    </div>
    <p class="upload_required" :class="{'inviz':!uploading.showRequire }">{{reqMsg}}</p>
    <div v-if="bottomRule" class="upload-restrictions">
      <div class="file-format fileRules">فرمت‌های مجاز: jpg, png, jpeg</div>
      <div class="file-size fileRules">حداکثر سایز فایل: ۲ مگابایت</div>
    </div>
  </div>
</template>
<script>
import {$zpl} from "@/plugins/zpl";

export default {
  name: "MyUpload",
  props:{
    onSetFileId:{
      type:Function,
      default(){},
    },
    reqMsg:'',
    title:'',
    topRule:{
      type:Boolean,
      default:false
    },
    bottomRule:{
      type:Boolean,
      default:false
    },
    alignBottomRule:{
      type:Boolean,
      default:false
    },
  },
  data() {
    return {
      uploading:{
        file_id:'',
        curState:'',
        errorMsg:'',
        isUploading:false,
        showRequire:false,
      },
    };
  },
  async created() {

  },
  mounted() {

  },
  beforeDestroy() {

  },
  computed: {

  },
  methods: {
    resetUploading(){
      $zpl.mergeObj.call(this.uploading,{
        file_id:'',
        curState:'',
        errorMsg:'',
        isUploading:false,
        showRequire:false,
      })
    },
    onLoadFile(file,{calbLoad}){
      let reader = new FileReader();
      reader.onload = (e) => {
        calbLoad && calbLoad(e)
      };
      reader.readAsDataURL(file);
    },
    uploadLegalFile() {
      const files = this.$refs.inpRef.files,vm=this;
      if(files.length===0){
        return
      }

      this.resetUploading();

      const uploading = this.uploading;

      uploading.name = files[0].name;

      let type = files[0].type;
      if(files[0].size/1024 >2048){
        uploading.curState = 'error';
        uploading.errorMsg = ' حجم فایل انتخاب شده باید کمتر از ۲۰۴۸ کیلوبایت باشد.';
      }
      else if (files.length > 0 && (type==='image/png'||type==='image/jpg'||type==='image/jpeg')) {
        uploading.isUploading = true;
        uploading.curState = 'uploading';


        let formData = new FormData();
        formData.append('type', 'document');
        formData.append('file', files[0]);

        $zpl.zplConnectPrj_v2.reqDirect({
          baseUrl:'https://uploads.insight-clinic.com/',
          args:formData,
          configs:{
            emulateHTTP: true,
            onUploadProgress: function(progressEvent) {
              const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            }
          }
          /**
           * @var respObj
           * @type RespObj
           */
        }).then((respObj) => {
          const resp = respObj.getResp()
          uploading.file_id = resp.data.meta.file_id;
          uploading.curState = 'success';
          uploading.name = files[0].name;
          uploading.isUploading = false;
          vm.onSetFileId(uploading.file_id);
        }).catch((respObj) => {
          const msgError = respObj.getErrMsg();
          uploading.file_id = '';
          uploading.curState = 'error';
          uploading.errorMsg= msgError;
          uploading.isUploading = false;
          vm.onSetFileId('');
        });
      }
      else {
        uploading.curState = 'error';
        uploading.errorMsg = 'فرمت فایل می بایست png یا jpg یا jpeg باشد.';
      }
    },
    showRequire(){
      this.uploading.showRequire = true;
    }
  },
  watch:{},
  mixins:[],
  components: {},
};
</script>
