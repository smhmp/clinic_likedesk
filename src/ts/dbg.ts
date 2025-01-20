import zpl from "./zpl";

interface condsResult {
    [index: number]: boolean;
}

type condDbg<T> = (dis: any | T, resultConds: condsResult, i: number, args: { [index: string]: any }) => void | boolean;

type chkerDbg = (args: { [index: string]: any }) => void;

type condFns<T> = condDbg<T>[];

export class DbgTool {
    dbgHanlder: {
        resultConds: condsResult;
        conds: any;
        chker: chkerDbg;
    }[];

    constructor() {
        this.dbgHanlder = [];
    }

    addDbg<T>(condsFn: condFns<T>, chkerFn: chkerDbg) {
        this.dbgHanlder.push({
            conds: condsFn,
            chker: chkerFn,
            resultConds: {},
        });
    }

    dbgRun(args: { [index: string]: any }) {
        let i;
        this.dbgHanlder.forEach((eDbg) => {
            i = 0;
            while (i < eDbg.conds.length) {
                if (!eDbg.resultConds[i]) {
                    return;
                }
                i += 1;
            }
            eDbg.chker(args);
        });
    }

    dbgChk(dis: any, args: { [index: string]: any }) {
        this.dbgHanlder.forEach((eDbg) => {
            for (let i = 0; i < eDbg.conds.length; i += 1) {
                if (typeof eDbg.conds[i](dis, eDbg.resultConds, i, args) === 'boolean') {
                    return;
                }
            }
        });
    }
}


export const lgConf = {
    priority: 0,
    uniqNum: 0,
    delayTime:200,
    compT(){
        const latestT=this.lastSaved;
        const curT =(new Date()).getTime();
        const compT = curT - latestT;
        this.lastSaved = curT;
        return compT;
    },
    lastSaved:(new Date()).getTime()
};

export const lg = (val, str = '', prio = 0,opts={off:false}) => {
    if(!zpl.isLocal()){
        return;
    }
    if (prio < lgConf.priority) {
        return;
    }
    let resStr = '';
    let frst = false;
    if(lgConf.compT()>lgConf.delayTime){
        frst = true;
        lgConf.uniqNum = 0 ;
    }
    else{
        lgConf.uniqNum += 1;
    }
    resStr += ` ${lgConf.uniqNum} -- ${str}`;
    if(frst){
        console.log(`%c ------------------------------------------ `,'background: #a7b0bf; color: #bada55');
        console.log(`%c ------------------------------------------ `,'background: #a7b0bf; color: #bada55');
    }
    if(opts?.off){
        console.log(`%c ${resStr}: %c`,'background: #e3e3e3; color: #ffffff','', val);
    }
    else{
        console.log(`%c ${resStr}: %c`,'background: #0d832a; color: #ffffff','', val);
    }
};


export const dolog = function(msg,ttl=''){
    if(zpl.isAnz('asDbg')){
        const div = zpl.crtElm('div');
        const pre = zpl.crtElm('pre');
        const h3 = zpl.crtElm('h3');
        div.appendChild(h3)
        div.appendChild(pre)
        div.style.cssText = 'display:block;max-width:200px;max-height:200px;overflow:auto;'
        h3.style.cssText = 'display:block;max-width:200px;white-spave:no-wrap'
        h3.textContent = ttl
        pre.textContent = msg
        document.getElementById('logg').appendChild(div);
    }
}

export const ilg = (val, str = '', prio = 0,opts={off:false})=>{
    dolog(val, str);
    lg(val,`ilg...${str}`,prio,opts)
}
