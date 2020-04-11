const BASE_URL = 'http://localhost:3000/api/'

const fetch = ({ url = "", data = {}, method = "GET", header = {}, tipName = "正在加载中..." }) => {
    return new Promise((resolve, reject) => {
        // 显示加载动画
        uni.showLoading({
            title: tipName
        });

        // 从本地获取token并添加到请求头
        const header = {
            Authorization: ''
        }

        const my_token = uni.getStorageSync("my_token")
        if (my_token) {

            header.Authorization = my_token
        }
        // 调用uni.request发送请求d
        uni.request({
            url: `${BASE_URL}${url}`,
            data,
            method,
            header,
            success: (res) => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            },
            complete: () => {
                uni.hideLoading()
            }
        })
    })
}

export default fetch