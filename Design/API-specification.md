# todoitem
### 发起请求的JSON结构 （CreateItem）
Api: https://todo.aozi.co/api/todoitem    
RequestType: post    

    var RequestPostJson = {
        Time: 1483234168570,
        
        Data: {
            RequestTime: 1483234168270,    
            Data: [
                {
                    Title":     "我是第一条TODO",
                    Content:    "",
                    State:      0,
                    Type:       "0-Normal",
                    Guid":      null,
                    CreateTime: 1483234168570,
                    AlertTime:  1483234268570,
                    StartTime:  1483250000000,    
                    EndTime:    1483260000000,    
                }
            ]
        },
    }

### 服务端返回的JSON结构 (ResponseToCreateItem)
    var ResponsePostJson = {
        Msg: "成功",
        Status: 200,
        Time: 1483234168570,
        Data: {
            RequestTime: 1483234168570,
            Data: [
                {
                    Guid: "服务器端生成一个guid，赋给'我是第一条TODO'",
                    Title: "我是第一条TODO",
                    "CreateTime": 1483234168570,
                }
            ],
        }
    }

# todolist

### 请求服务器端的todolist数据
Api: https://todo.aozi.co/api/todolist    
Request Type: post    

    var RequestPostJson = {
        Time: 1483260000000,
        
        Data: {
            RequestTime: 1483260000000,    
            ActionType:  "GET_USER_DATA_ALL", // 返回所有用户的数据            
        }
    };

### 返回的todolist数据
    var ResponseJson = {
        Msg: "成功",
        Status: 200,
        Time: 1483260000000,

        Data: {
            RequestTime: 1483260000000,

            Data: [
                {
                    Title":     "我是第一条TODO",
                    Content:    "",
                    State:      0,
                    Type:       "Normal",
                    Guid":      "streesdjfvmlknelknsdklnlkwne",
                    CreateTime: 1483234168570,
                    AlertTime:  1483234268570,
                    StartTime:  1483250000000,    
                    EndTime:    1483260000000,
                },
                {
                    Title":     "我是第二条TODO",
                    Content:    "",
                    State:      0,
                    Type:       "Normal",
                    Guid":      "streesdjfvmlknelknsdklnlkwne",
                    CreateTime: 1483234168570,
                    AlertTime:  1483234268570,
                    StartTime:  1483250000000,    
                    EndTime:    1483260000000,
                },
                {
                    Title":     "我是第3条TODO",
                    Content:    "",
                    State:      1, // >> 0: Unchecked 1: Checked
                    Type:       "Normal",
                    Guid":      "streesdjfvmlknelknsdklnlkwne",
                    CreateTime: 1483234168570,
                    AlertTime:  1483234268570,
                    StartTime:  1483250000000,    
                    EndTime:    1483260000000,
                }
            ],
        }
    }

# login
###请求服务器端的login数据
Api: https://todo.aozi.co/api/login        
Request Type: post    

    var RequestPostJson = {
        Time: 1483260000000,
        
        Data: {
            RequestTime: 1483260000000,    
            Code:  "CodeString-from-wx.login()",             
        }
    };

### 返回的login数据

    var ResponsePostJson = {
        Msg:'成功',
        Status:200,
        Time: 1483234168570,
        Data:{
            RequestTime: "1483234168570",   //请求时发送的 Data.RequestTime
            Code: "CodeString" //请求时发送的Code
        }
    }

    
    
### 各个字段的详细说明
+ Time: 1483260000000    
    每个req和res都有一个Time字段，表示该请求的生成的事情，或者发出的时间

+ Msg: "成功" (res才有)    
    表示当前请求的信息。可选值有`["成功", "失败", "数据错误", "参数错误"]`

+ Status: 200 (res才有)    
    表示请求的状态。可选值有`[200, 401, 403, 404, 405, 500]`    
        200 成功    
        400 参数错误    
        401 未登录或session过期，需要重新登录    
        403 被禁止的请求    
        404 API不存在；    
        405 拒绝非post请求    
        
+ Data: {}    
    提交或获取到的数据
            
    + RequestTime: 1483260000000    
    请求的时间。用来对对应的请求应答进行分辨，方便create数据时，给客户端的todoitem加上guid

    + Data: []    
    存放todoitem的数组    
        + Title: "我是第一条TODO"    
        Todoitem的标题
        + Content:    "",    
        Todoitem的内容
        + State: 0,     
        表示Todoitem是否完成    
            + 0 未完成 Unchecked    
            + 1 完成   Checked
        + Type:       "0-Normal"    
        表示Todoitem的类型
            + "0-Normal" (默认) 正常
            + "1-Urgent"  紧急
            + "2-Important" 重要
        + Guid: null    
        Todolist的Guid，创建时没有，提交给后端后，由后端生成并返回给前端。    
        每次的操作更新，都依赖于这个Guid。
        + CreateTime: 1483260000000    
        Todoitem的创建时间
        + (可选) AlertTime:  1483260000000    
        Todoitem的提醒时间。如果没有这个字段，或者字段为false，就为正常的记事。
        + (可选) StartTime： 1483260000000
        Todoitem开始时间。
        + (可选) Endtme： 1483260000000
        Todoitem 结束时间。
