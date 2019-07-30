import axios from "axios"; // 注意先安装哦
import config from "./config.js"; // 倒入默认配置
import qs from "qs"; // 序列化请求数据，视服务端的要求

export default function request(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {},
      transformResponse: [function(data) {}]
    });

    // request 拦截器
    instance.interceptors.request.use(
      config => {
        // Tip: 1
        // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画

        // Tip: 2
        // 带上 token , 可以结合 vuex 或者重 localStorage
        // if (store.getters.token) {
        //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
        // } else {
        //     // 重定向到登录页面
        // }

        // Tip: 3
        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (
          config.method.toLocaleLowerCase() === "post" ||
          config.method.toLocaleLowerCase() === "put" ||
          config.method.toLocaleLowerCase() === "delete"
        ) {
          config.data = qs.stringify(config.data);
        }
        return config;
      },
      error => {
        // 请求错误时做些事(接口错误、超时等)
        // Tip: 4
        // 关闭loadding
        console.log("request:", error);

        //  1.判断请求超时
        if (
          error.code === "ECONNABORTED" &&
          error.message.indexOf("timeout") !== -1
        ) {
          console.log(
            "根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案"
          );
          // return service.request(originalRequest);//例如再重复请求一次
        }
        //  2.需要重定向到错误页面
        // const errorInfo = error.response;
        // console.log(errorInfo);
        // if (errorInfo) {
        //   // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
        //   const errorStatus = errorInfo.status; // 404 403 500 ... 等
        //   router.push({
        //     path: `/error/${errorStatus}`
        //   });
        // }
        return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    );

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = response.request.responseText;
        } else {
          data = response.data;
        }
        // 根据返回的code值来做不同的处理（和后端约定）
        switch (data.code) {
          case "":
            break;
          default:
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.description)

        // err.data = data
        // err.response = response

        // throw err
        return data;
      },
      err => {
        if (err && err.response) {
          const codeMessage = {
            200: "服务器成功返回请求的数据。",
            201: "新建或修改数据成功。",
            202: "一个请求已经进入后台排队（异步任务）。",
            204: "删除数据成功。",
            400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
            401: "用户没有权限（令牌、用户名、密码错误）。",
            403: "用户得到授权，但是访问是被禁止的。",
            404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
            406: "请求的格式不可得。",
            410: "请求的资源被永久删除，且不会再得到的。",
            422: "当创建一个对象时，发生一个验证错误。",
            500: "服务器发生错误，请检查服务器。",
            502: "网关错误。",
            503: "服务不可用，服务器暂时过载或维护。",
            504: "网关超时。"
          };
        }
        console.error(err);
        // 此处我使用的是 element UI 的提示组件
        // Message.error(`ERROR: ${err}`);
        return Promise.reject(err); // 返回接口返回的错误信息
      }
    );

    //请求处理
    // instance(options)
    //   .then(res => {
    //     resolve(res);
    //     return false;
    //   })
    //   .catch(error => {
    //     reject(error);
    //   });
  });
}
