### 发起请求的JSON结构 （CreateItem）
    var RequestPostJson = {
        Time: "2016-12-31T16:30:00.050Z",
        UserId:"UserOpenId",
        
        Data: {
            RequestTime: "2016-12-31T16:30:00.050Z",    
            Data: [
                {
                    Title":     "我是第一条TODO",
                    Content:    "",
                    State:      0,
                    Type:       "0-Normal",
                    Guid":      null,
                    CreateTime: "2016-12-31T16:29:00.000Z",
                    AlertTime:  "2017-01-01T12:00:00.000Z",
                }
            ]
        },
    }

### 服务端返回的JSON结构 (ResponseToCreateItem)
    var ResponsePostJson = {
        Msg: "成功",
        Status: 200,
        Time: "2016-12-31T16:30:00.250Z",
        Data: {
            RequestTime: "2016-12-31T16:30:00.050Z",
            Data: [
                {
                    Guid: "服务器端生成一个guid，赋给'我是第一条TODO'",
                    Title: "我是第一条TODO",
                    "CreateTime": "2016-12-31T16:29:00.000Z",
                }
            ],
        }
    }

### 请求服务器端的todolist数据
    var RequestPostJson = {
        Time: "2016-12-31T16:30:00.050Z",
        UserId:"UserOpenId",
        
        Data: {
            RequestTime: "2016-12-31T16:30:00.050Z",    
            ActionType:  "GET_USER_DATA_ALL", // 返回所有用户的数据            
        }
    };

### 返回的todolist数据
    var ResponseJson = {
        Msg: "成功",
        Status: 200,
        Time: "2016-12-31T16:30:00.250Z",

        Data: {
            RequestTime: "2016-12-31T16:30:00.050Z",

            Data: [
                {
                    Title":     "我是第一条TODO",
                    Content:    "",
                    State:      0,
                    Type:       "Normal",
                    Guid":      "streesdjfvmlknelknsdklnlkwne",
                    CreateTime: "2016-12-31T16:29:00.000Z",
                    AlertTime:  "2017-01-01T12:00:00.000Z",
                },
                {
                    Title":     "我是第二条TODO",
                    Content:    "",
                    State:      0,
                    Type:       "Normal",
                    Guid":      "streesdjfvmlknelknsdklnlkwne",
                    CreateTime: "2016-12-31T16:29:00.000Z",
                    AlertTime:  "2017-01-01T12:00:00.000Z",
                },
                {
                    Title":     "我是第3条TODO",
                    Content:    "",
                    State:      1, // >> 0: Unchecked 1: Checked
                    Type:       "Normal",
                    Guid":      "streesdjfvmlknelknsdklnlkwne",
                    CreateTime: "2016-12-31T16:29:00.000Z",
                    AlertTime:  "2017-01-01T12:00:00.000Z",
                }
            ],
        }
    }

### 各个字段的详细说明
+ Time: "2016-12-31T16:30:00.050Z"    
    每个req和res都有一个Time字段，表示该请求的生成的事情，或者发出的时间

+ UserId: "UserOpenId"    
    用户的OpenId或者后端生成的用户的id

+ Msg: "成功" (res才有)    
    表示当前请求的信息。可选值有`["成功", "失败", "数据错误", "参数错误"]`

+ Status: 200 (res才有)    
    表示请求的状态。可选值有`[200, 400, 500]`    
        200 成功

+ Data: {}    
    提交或获取到的数据
            
    + RequestTime: "2016-12-31T16:30:00.050Z"    
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
        + CreateTime: "2016-12-31T16:29:00.000Z"    
        Todoitem的创建时间
        + (可选) AlertTime:  "2017-01-01T12:00:00.000Z"    
        Todoitem的提醒时间。如果没有这个字段，或者字段为false，就为正常的记事。