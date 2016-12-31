###  SERVER API
API：https://todo.aozi.co/api/


1. 登录API
uri: https://todo.aozi.co/api/login
请求类型：post
请求数据格式：
{
    Code:'CODE'
}
输出数据格式：
{
    Msg:'成功',
    Status:200,
    Time: "",
    Data:{
        RequestTime: "2016-12-31T16:30:00.050Z",
        RequestCode:'CODE'
    }
}
失败时输出： 
{
    Msg:'失败',   //错误提示
    Status:40X,  
    //400：参数错误
    //401：未登录或session过期，需要重新登录；
    //403：被禁止的请求
    //404:API不存在；
    //405：拒绝非post请求
    //其他待定义
    RequestTime: "2016-12-31T16:30:00.050Z",
    Data:{
        RequestTime: "2016-12-31T16:30:00.050Z",
        RequestCode:'CODE'
    }
}




2. 新建TodoItem
uri: https://todo.aozi.co/api/create
请求类型：post
请求数据格式(*为必须)：
{
   *Title":     "我是第一条TODO",
    Content:    "",
    State:      0,//新建必须是0,完成为1
    Type:       "Normal", //Normal,Urgent,Important,默认Normal
   *StartTime:  "YYYY-MM-DD HH:mm:ss",
    EndTime:    "YYYY-MM-DD HH:mm:ss",
    AlertTime:  "YYYY-MM-DD HH:mm:ss", //可是我们可能没办法提示用户 
}
 输出数据格式：
{
    Msg:'成功',
    Status:200,
    Time: "",
    Data:{
        RequestTime: "2016-12-31T16:30:00.050Z",
        Guid:        "cd5f4221vw39558sdf41238",
    }
}


3. 修改TodoItem
uri: https://todo.aozi.co/edit
说明:  除Guid外至少有一条数据未提交的数据；
      未提交数据的项不更新原数据，提交空数据时，原数据更新为空数据 
请求类型：post
请求数据格式(*为必须)：
{
   *Guid:       "cdv5465",
    Title":     "我是第一条TODO",
    Content:    "",
    State:      0,//新建必须是0,完成为1
    Type:       "Normal", //Normal,Urgent,Important,默认Normal
    StartTime:  "YYYY-MM-DD HH:mm:ss",
    EndTime:    "YYYY-MM-DD HH:mm:ss",
    AlertTime:  "YYYY-MM-DD HH:mm:ss", //可是我们可能没办法提示用户 
}

 输出数据格式：
{
    Msg:'成功',
    Status:200,
    Time: "",
    Data:{
        RequestTime: "2016-12-31T16:30:00.050Z",
        Guid:        "cd5f4221vw39558sdf41238",
    }
}



4. 把任务设置为完成状态
uri: https://todo.aozi.co/complete
说明：如果任务原状态是完成状态，同样返回成功
请求类型：post
请求数据格式：
{
    Guid:'cdf45455e8113v313z258'
}
输出数据格式：
{
    Msg:'成功',
    Status:200,
    Time: "",
    Data:{
        RequestTime: "2016-12-31T16:30:00.050Z",
        RequestGuid:'cdf45455e8113v313z258'
    }
}



5. 删除任务
uri: https://todo.aozi.co/delete
说明：如果任务不存在，同样返回成功
     后端并不删除任务数据，以供未来开发垃圾箱功能
请求类型：post
请求数据格式：
{
    Guid:'cdf45455e8113v313z258'
}
输出数据格式：
{
    Msg:'成功',
    Status:200,
    Time: "",
    Data:{
        RequestTime: "2016-12-31T16:30:00.050Z",
        RequestGuid:'cdf45455e8113v313z258'
    }
}



6.获取任务列表
uri: https://todo.aozi.co/list
说明：如果任务原状态是完成状态，同样返回成功
请求类型：post
请求数据格式(*为必须)：
{
    Count：      10,//要获取的记录数，默认：20；最大100；
    Order:      [StartTime,EndTime,AlertTime,Type],//默认StartTime
    Marker:     "Guid132a1sdf546as8d",//用于获取下一页记录
}
输出数据格式：
{
    Msg:'成功',
    Status:200,
    Time: "",
    Data:{
        Count: 5,//获取到的记录数
        NextMarker："Guid", //用于获取下一页记录，如果没有下一页，NextMarker 为空
        Result: [Todoitem,Todoitem,Todoitem...],//Todoitem
        RequestData：{   //原始请求数据 
            Count：      10,
            Order:      "StartTime",//["StartTime","EndTime","AlertTime","Type"]中的一个
            Marker:     "Guid31asd5f648a9s8df",
        }
    }
}


7. 查询任务
uri: https://todo.aozi.co/qurey
    说明 ：用户量少时支持汉字全文搜索，用户量大仅支持Title，可不支持搜索
请求类型：post
请求数据格式：
{
    Word:'全文关键字',
    Count：      10,//要获取的记录数，默认：20；最大100；
    Marker:     "Guid132a1sdf546as8d",//用于获取下一页记录
}
输出数据格式：
{
    Msg:'成功',
    Status:200,
    Time: "",
    Data:{
        Count: 5,//获取到的记录数
        NextMarker："Guid", //用于获取下一页记录，如果没有下一页，NextMarker 为空
        Result: [Todoitem,Todoitem,Todoitem...],//Todoitem
        RequestData：{   //原始请求数据 
            Word:       "全文关键字",
            Count：      10,
            Order:      "StartTime",//["StartTime","EndTime","AlertTime","Type"]中的一个
            Marker:     "Guid31asd5f648a9s8df",
        }
    }
}





