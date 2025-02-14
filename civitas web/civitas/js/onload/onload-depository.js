/*
个人仓库页面使用的加载
load_updata：读取页面
*/

function load_updata()
{
    //获得是否登录接口返回值
    var json_str_login = is_login();
    //重定向
    redirection(json_str_login["status"]);
    //加载Vue
    load_main_vm(json_str_login["data"]["uid"]);
    //获取导航栏
    navigator(json_str_login["status"],json_str_login["data"]["uid"]);
    //找不到参数，重定向至主页
    if (isNaN(get_parameter_value("uid")))
    {
        window.location.assign("index.html");
    }
}

window.onload = load_updata;