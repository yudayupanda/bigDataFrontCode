import axios from 'axios'
import qs from 'qs'
import {Notification} from 'element-ui'
let base = 'http://localhost:8000/BigDataHomework'


//注：qs将axios发送的数据格式转换为form-data格式，否则单传params会传option请求，
//后台接收不到或发送成功后台接收参数为null

//请求登录
export const requestLogin = params => {
	return axios.post(`${base}/userAction/login`,qs.stringify(params)).then(res => res.data).catch(function (error) {
		//异常处理
　　		showError(error)
	})
}


//上传web日志,记：参数params不需要转换成json
export const uploadWebLog = params => {
    return axios.post(`${base}/upload`,params).then(res=>res.data).catch(function (error) {
        showError(error)
    })
}

export const getLog = params => {
    return axios.get(`${base}/getLog`,params).then(res=>res.data).catch(function (error) {
        showError(error)
    })
}

export const getCleanedLog = params => {
    return axios.get(`${base}/getCleanedLog`,params).then(res=>res.data).catch(function (error) {
        showError(error)
    })
}
export const getUserLog = params => {
    return axios.get(`${base}/getUserLog`,params).then(res=>res.data).catch(function (error) {
        showError(error)
    })
}
export const getSession = params => {
    return axios.get(`${base}/getSession`,params).then(res=>res.data).catch(function (error) {
        showError(error)
    })
}

export const getClusterUserAffair = params => {
    return axios.get(`${base}/getClusterUserAffair`,params).then(res=>res.data).catch(function (error) {
        showError(error)
    })
}
export const getUserCluserResult = params => {
    return axios.post(`${base}/getUserCluserResult`,params).then(res=>res.data).catch(function (error) {
        showError(error)
    })
}
export const getFrequentItemSet = params => {
    return axios.post(`${base}/getFrequentItemSet`,params).then(res=>res.data).catch(function (error) {
        showError(error)
    })
}
export const deleteLog = params => {
    return axios.get(`${base}/deleteLog`,params).then(res=>res.data).catch(function (error) {
        showError(error)
    })
}

export const uploadProgress = params => {
    return axios.get(`${base}/progressServlet`,params).then(res=>res.data).catch(function (error) {
        showError(error)
    })
}

export const getKpi = params => {
    return axios.get(`${base}/getKpi`,params).then(res=>res.data).catch(function (error) {
        showError(error)
    })
}

export const getPieChart = params => {
    return axios.get(`../../static/pieChart.json`,params).then(res=>res.data).catch(function (error) {
        showError(error)
    })
}



//显示错误
function showError(error){
	statusError(error)
	Notification.error({
          title: '错误',
          message: error.message,
          showClose: true
    })
    return
}
//错误状态中文表示
function statusError(err){
	//请求已发出，但服务器响应的状态码不在 2xx 范围内
	if (err && err.response) {
		switch (err.response.status) {
            case 400: err.message = '请求错误(400)' 
            break
            case 401: err.message = '未授权，请重新登录(401)'
            break
            case 403: err.message = '拒绝访问(403)' 
            break
            case 404: err.message = '请求出错(404)'
            break
            case 408: err.message = '请求超时(408)'
            break
            case 500: err.message = '服务器错误(500)' 
            break
            case 501: err.message = '服务未实现(501)' 
            break
            case 502: err.message = '网络错误(502)' 
            break
            case 503: err.message = '服务不可用(503)' 
            break
            case 504: err.message = '网络超时(504)' 
            break
            case 505: err.message = 'HTTP版本不受支持(505)' 
            break
            default: err.message = `连接出错(${err.response.status})`
    	}
	}else{
		 err.message = '连接服务器失败'
	}
	return err
    
    
}
 


