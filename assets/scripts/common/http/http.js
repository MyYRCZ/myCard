let Utils = require("../utils/utils");
/**
 * 
 */
let http = {
    /**
     * 
     * @param {*} protocol 
     * @param {*} url 
     * @param {*} params 
     * @param {*} handler 
     * @param {*} timeOut 
     * @param {*} timeOutNum 
     */
    requestByGet(protocol,url,query,timeOut,timeOutNum,handler){
        if(Utils.isEmptyObject(query)){
            return;
        }
        url = url + "?";
        for (let key in query) {
            url = url + key + "=" + JSON.stringify(query[key]);
        }
        url = "http://" + url;
        _request("GET",protocol,url,timeOut,timeOutNum,handler);
    },

    /**
     * 
     * @param {*} protocol 
     * @param {*} url 
     * @param {*} params 
     * @param {*} handler 
     * @param {*} timeOut 
     * @param {*} timeOutNum 
     */
    requsetByPost(protocol,url,params,timeOut,timeOutNum,handler){
        _request("POST",protocol,url,params,timeOut,timeOutNum,handler);
    }
};

/**
 * http请求
 */
module.exports = http;

function _request(requestType,protocol,url,timeOut,timeOutNum,handler){
    if(requestType == "GET"){
        _goRequest("GET",url,timeOut,timeOutNum,handler);
    }else if(requestType == "POST"){
        _goRequest("POST",url,timeOut,timeOutNum,handler);
    }
}

function _goRequest(protocol,url,timeOut,timeOutNum,handler){
    //
    _httpRequest(protocol,url,(data)=>{
        //请求成功 
        console.log("请求成功! url:", url);
        if("onSuccess" in handler){
            if(handler.onSuccess){
                handler.onSuccess(data);
            }
        }
    },()=>{
        //请求超时
        console.log("请求超时!",url);
        let timeOutCount = timeOutNum - 1;
        if(timeOutCount > 0){
            _goRequest(protocol,url,timeOut,timeOutCount,handler);
        }else{
            console.log("超时请求次数已经全部用完");
            //判断是存在 并且是否是对象
            if(handler){
                if("onTimeOut" in handler){
                    if(handler.onTimeOut){
                        handler.onTimeOut();
                    }
                }
            }
        }
    },()=>{
        //请求错误
        console.log("请求错误!");
        if(handler){
            if("onError" in handler){
                if(handler.onError){
                    handler.onError();
                }
            }
        }
    },timeOut); 
}

function _httpRequest(protocol,url,onSuccess,onTimeOut,onError,timeOut){
    //
    var xhr = cc.loader.getXMLHttpRequest();

    //
    xhr.timeout = timeOut || 5000;

    //
    let _protocol = "GET";
    if(_protocol !== protocol){
        _protocol = "POST";
    }
    
    //
    xhr.open(_protocol,url, true);

    // setRequestHeader必须在open之后,send之前
    if (cc.sys.isNative) {
        xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
    }
    xhr.setRequestHeader('content-type','application/json');

    //
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState !== 4){
            return;
        }
        if(xhr.status >= 200 && xhr.status < 300){
            if(onSuccess){
                onSuccess(xhr.response);
            }
        }else if(xhr.status >= 400 && xhr.status < 500){
            console.log("status3 = ",status);
        }else if(xhr.status >= 500 && xhr.status < 600){
            console.log("status4 = ",status);
        }
    };

    //
    xhr.ontimeout = ()=>{
        xhr.abort();
        if(onTimeOut)onTimeOut();
    };

    //
    xhr.onerror = (error)=>{
        xhr.abort();
        if(onError)onError();
    };

    xhr.send();
};
