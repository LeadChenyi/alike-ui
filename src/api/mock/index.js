import Mock from 'mockjs'
import BaseURL from '../baseURL'

Mock.setup({
    timeout:'1000-1500'
})

Mock.mock(`${BaseURL.v1}/articles`,{
    "statusCode":200,
    "statusText":"request:ok",
    "data|8-10":[
        {
            "id":()=> Mock.Random.id(),
            "text":()=>Mock.Random.cparagraph(4,6),
            "createdAt":()=>Mock.Random.datetime("MM-dd HH:mm")
        }
    ]
});
