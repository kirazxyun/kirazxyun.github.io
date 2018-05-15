# get参数问题
axio发送get请求，参数传递方式有两种
1.直接拼接在url上
    const id = '123'
    axios.get(`/userInfo/${id}`)
    相对应的后端要解析url，从url中获取参数信息
2.放在body中
    const id = '123'
    axios.get('/userInfo/', {
        params: {
            id
        }
    })
    想对应的后端要解析requestparams，从中获取参数信息