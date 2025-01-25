const isProduct = process.env.NODE_ENV === 'production';
const isDevelop = process.env.NODE_ENV === 'development';

const prdUrl = 'https://connect-stg.zarinpal.name';
const demoUrl = 'http://event-clinic.wobo';
const stageUrl = 'https://connect-stg.zarinpal.name';
let configInf;
if(isProduct){
  configInf = {
    reqApi:{prdUrl,demoUrl,stageUrl},
    directRoot(adr){
      let rootUrl = ''
      if(adr.indexOf('.insight-clinic.name')>-1){
        rootUrl = stageUrl
      }
      else if(adr.indexOf('localhost')>-1){
        rootUrl = demoUrl
      }
      else if(adr.indexOf('.wobo')>-1){
        rootUrl = demoUrl
      }
      else{
        rootUrl = prdUrl
      }
      return rootUrl;
    },
    proxy:{
      "/api": prdUrl
    },
    server:{
      port:3000 ,
      host:'localhost',
    },
  }
}
else{
  configInf = {
    apiTarget:'',// '/demo' | '/product' | '/stage' , if empty ==> '/demo'
    reqApi:{prdUrl,demoUrl,stageUrl},
    directRoot(adrs){
      return '';
    },
    proxy:{
      "/api": isDevelop?demoUrl:prdUrl
    },
    server:{
      port:isDevelop? 4007:3007,
      host:'localhost',
    },
  }
}

// configInf = {
//   directRoot:'http://connect.local',
//   proxy:{
//     "/api": "http://connect.local/"
//   },
//   server:{
//     port: 4007,
//     host:'connect.local',
//   },
// }

if(isDevelop){
  configInf.proxy['/demo/api']={
    target: demoUrl,
    pathRewrite: {"^/demo/api": "/api"}
  }
  configInf.proxy['/stage/api']={
    target: stageUrl,
    pathRewrite: {"^/stage/api": "/api"}
  }
  configInf.proxy['/product/api']={
    target: stageUrl,
    pathRewrite: {"^/product/api": "/api"}
  }
}


export default configInf;
