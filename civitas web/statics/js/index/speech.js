/*
演讲相关
now_page：当前页面，全局变量
now_uid：当前uid，全局变量
load_speech：加载全部演讲
speech_swap：演讲翻页
give_speech：发表演讲
speech_attitude：发表态度
popular_speech：显示热门演讲
speech_tips：提示字数限制
*/

var now_page = 1;
var now_uid = null;

function load_speech(page,uid=now_uid)
{
    /*参数说明：
    page：需要加载的页数
    uid：需要读取技能的用户uid
    额外说明：这个函数是主页/个人主页通用的，所以需要一个判别的uid，在主页使用时，不需要加uid，api会返回当前登录cookie对应用户的技能
    */
    var xmlhttp=new XMLHttpRequest();
    now_page = page
    now_uid = uid
    xmlhttp.onreadystatechange= function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            var i;
            var str = xmlhttp.responseText;
            var json_str = JSON.parse(str);
            var total_page = json_str["data"]["total_page"];
            var speech = "";
            var speech_paginator = "";
            //显示演讲
            for (i = 0; i <= json_str["data"]["num"]-1; i++)
            { 
                var attitude1 = " ";
                var attitude2 = " ";
                var attitude3 = " ";
                if (json_str["data"]["datalist"][i]["my_attitude"] == 1)
                {
                    attitude1 = " class=\"speech-attitude\" ";
                }
                else if (json_str["data"]["datalist"][i]["my_attitude"] == 2)
                {
                    attitude2 = " class=\"speech-attitude\" ";
                }
                else if (json_str["data"]["datalist"][i]["my_attitude"] == 3)
                {
                    attitude3 = " class=\"speech-attitude\" ";
                }
                speech += "<div class=\"speech bottomline-dashed\"><a href=\"people.html?uid="
                    +json_str["data"]["datalist"][i]["uid"]+"\" class=\"speech-avatar\"><img src=\"https://api.trickydeath.xyz/getavatar/?uid="
                    +json_str["data"]["datalist"][i]["uid"]+"\" class=\"img-thumbnail\" width=\"50px\" height=\"50px\"/></a><span class=\"speech-content\"><a href=\"people.html?uid="
                    +json_str["data"]["datalist"][i]["uid"]+"\" class=\"speech-name\">"
                    +json_str["data"]["datalist"][i]["username"]+"</a><p>："
                    +json_str["data"]["datalist"][i]["text"]+"</p></span><div class=\"speech-bottom\"><p>本地演讲，第"
                    +json_str["data"]["datalist"][i]["day"]+"天，"
                    +json_str["data"]["datalist"][i]["time"]+"</p></div><div class=\"speech-bottom\"><a"
                    +attitude1+"href=\"javascript:void(0)\" onclick=\"speech_attitude(1,"
                    +json_str["data"]["datalist"][i]["textid"]+")\">欢呼("
                    +json_str["data"]["datalist"][i]["cheer"]+") </a><a"
                    +attitude2+"href=\"javascript:void(0)\" onclick=\"speech_attitude(2,"
                    +json_str["data"]["datalist"][i]["textid"]+")\">关注("
                    +json_str["data"]["datalist"][i]["onlooker"]+") </a><a"
                    +attitude3+"href=\"javascript:void(0)\" onclick=\"speech_attitude(3,"
                    +json_str["data"]["datalist"][i]["textid"]+")\">倒彩("
                    +json_str["data"]["datalist"][i]["catcall"]+")</a></div></div>";
            }
            //小于等于7页演讲，直接显示所有页数
            if (total_page <= 7)
            {
                for (i = 1; i <= total_page; i++)
                {
                    if (i == page)
                    {
                        speech_paginator += "<span class=\"thispage\">" + i + "</span>";
                    }
                    else
                    {
                        speech_paginator += "<a href=\"javascript:void(0)\" onclick=\"load_speech(" + i + ")\">" + i + "</a>";
                    }
                }
            }
            //大于7页，显示省略符
            else if (total_page > 7)
            {
                if (page <= 4)
                {
                    for (i = 1; i <= 5; i++)
                    {
                        if (i == page)
                        {
                            speech_paginator += "<span class=\"thispage\">" + i + "</span>";
                        }
                        else
                        {
                            speech_paginator += "<a href=\"javascript:void(0)\" onclick=\"load_speech(" + i + ")\">" + i + "</a>";
                        }
                    }
                    speech_paginator += "<span class=\"ellipsis\">······</span>";
                    speech_paginator += "<a href=\"javascript:void(0)\" onclick=\"load_speech(" + (total_page - 1) + ")\">" + (total_page - 1) + "</a>";
                    speech_paginator += "<a href=\"javascript:void(0)\" onclick=\"load_speech(" + total_page + ")\">" + total_page + "</a>";
                }
                else if (page >= total_page - 3)
                {
                    speech_paginator += "<a href=\"javascript:void(0)\" onclick=\"load_speech(" + 1 + ")\">" + 1 + "</a>";
                    speech_paginator += "<a href=\"javascript:void(0)\" onclick=\"load_speech(" + 2 + ")\">" + 2 + "</a>";
                    speech_paginator += "<span class=\"ellipsis\">······</span>";
                    for (i = total_page - 4; i <= total_page; i++)
                    {
                        if (i == page)
                        {
                            speech_paginator += "<span class=\"thispage\">" + i + "</span>";
                        }
                        else
                        {
                            speech_paginator += "<a href=\"javascript:void(0)\" onclick=\"load_speech(" + i + ")\">" + i + "</a>";
                        }
                    }
                }
                else
                {
                    speech_paginator += "<a href=\"javascript:void(0)\" onclick=\"load_speech(" + 1 + ")\">" + 1 + "</a>";
                    speech_paginator += "<a href=\"javascript:void(0)\" onclick=\"load_speech(" + 2 + ")\">" + 2 + "</a>";
                    speech_paginator += "<span class=\"ellipsis\">······</span>";
                    for (i = page - 2; i <= page + 2; i++)
                    {
                        if (i == page)
                        {
                            speech_paginator += "<span class=\"thispage\">" + i + "</span>";
                        }
                        else
                        {
                            speech_paginator += "<a href=\"javascript:void(0)\" onclick=\"load_speech(" + i + ")\">" + i + "</a>";
                        }
                    }
                    speech_paginator += "<span class=\"ellipsis\">······</span>";
                    speech_paginator += "<a href=\"javascript:void(0)\" onclick=\"load_speech(" + (total_page - 1) + ")\">" + (total_page - 1) + "</a>";
                    speech_paginator += "<a href=\"javascript:void(0)\" onclick=\"load_speech(" + total_page + ")\">" + total_page + "</a>";
                }
            }
            //跳转
            speech_paginator += "<div class=\"input-group input-group-sm\"><input type=\"text\" class=\"form-control speech-page-swap-input\" \
                id=\"speech-page-swap-input\" placeholder=\"跳转到某页\"><button type=\"submit\" class=\"btn btn-primary speech-page-swap-button\" \
                onclick=\"speech_swap()\">跳转</button></div>"
            document.getElementById("speech-page-paginator").innerHTML = speech_paginator;
            document.getElementById("speech").innerHTML = speech;
		}
	}
    if (uid == null)
    {
        xmlhttp.open("GET","https://api.trickydeath.xyz/getspeech/?page=" + page,true);
    }
    else
    {
        xmlhttp.open("GET","https://api.trickydeath.xyz/getspeech/?page=" + page +"&uid="+ uid,true);
    }
    xmlhttp.withCredentials = true;
    xmlhttp.send();
}

function speech_swap()
{
    now_page = document.getElementById("speech-page-swap-input").value;
    load_speech(now_page,now_uid)
}

function give_speech()
{
    var content = document.getElementById("speech-input").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            var str = xmlhttp.responseText;
            var json_str = JSON.parse(str);
            if (json_str["status"] == 1)
            {
                document.getElementById("speech-input").value = "";
                now_page = 1;
                load_speech(now_page,now_uid);
                speech_length_tips("");
                sstatus_update();
                load_skill();
            }
            else{}
            document.getElementById("speech-tips").innerHTML = json_str["message"];
		}
	}
    xmlhttp.open("POST","https://api.trickydeath.xyz/speech/",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.withCredentials = true;
    xmlhttp.send("text="+content);
}

function speech_attitude(attitude,textid)
{
    /*参数说明：
    attitude：态度，1欢呼，2关注，3倒彩
    textid：演讲id
    */
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            //可能点的是热门的欢呼/其他演讲的欢呼，所以都刷新
            load_speech(now_page,now_uid);
            popular_speech();
		}
	}
    xmlhttp.open("POST","https://api.trickydeath.xyz/assess/",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.withCredentials = true;
    xmlhttp.send("attitude="+attitude+"&textid="+textid);
}

function popular_speech()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            var i = 0;
            var str = xmlhttp.responseText;
            var json_str = JSON.parse(str);
            var attitude1 = " ";
            var attitude2 = " ";
            var attitude3 = " ";
            if (json_str["data"]["datalist"][i]["my_attitude"] == 1)
            {
                attitude1 = " class=\"speech-attitude\" ";
            }
            else if (json_str["data"]["datalist"][i]["my_attitude"] == 2)
            {
                attitude2 = " class=\"speech-attitude\" ";
            }
            else if (json_str["data"]["datalist"][i]["my_attitude"] == 3)
            {
                attitude3 = " class=\"speech-attitude\" ";
            }
            document.getElementById("popular-speech").innerHTML = "<div class=\"speech\"><a href=\"people.html?uid="
                +json_str["data"]["datalist"][i]["uid"]+"\" class=\"speech-avatar\"><img src=\"https://api.trickydeath.xyz/getavatar/?uid="
                +json_str["data"]["datalist"][i]["uid"]+"\" class=\"img-thumbnail\" width=\"50px\" height=\"50px\"/></a><span class=\"speech-content\"><a href=\"people.html?uid="
                +json_str["data"]["datalist"][i]["uid"]+"\" class=\"speech-name\">"
                +json_str["data"]["datalist"][i]["username"]+"</a><p>："
                +json_str["data"]["datalist"][i]["text"]+"</p></span><div class=\"speech-bottom\"><p>本地演讲，第"
                +json_str["data"]["datalist"][i]["day"]+"天，"
                +json_str["data"]["datalist"][i]["time"]+"</p></div><div class=\"speech-bottom\"><a"
                +attitude1+"href=\"javascript:void(0)\" onclick=\"speech_attitude(1,"
                +json_str["data"]["datalist"][i]["textid"]+")\">欢呼("
                +json_str["data"]["datalist"][i]["cheer"]+") </a><a"
                +attitude2+"href=\"javascript:void(0)\" onclick=\"speech_attitude(2,"
                +json_str["data"]["datalist"][i]["textid"]+")\">关注("
                +json_str["data"]["datalist"][i]["onlooker"]+") </a><a"
                +attitude3+"href=\"javascript:void(0)\" onclick=\"speech_attitude(3,"
                +json_str["data"]["datalist"][i]["textid"]+")\">倒彩("
                +json_str["data"]["datalist"][i]["catcall"]+")</a></div></div>";
		}
	}
    xmlhttp.open("GET","https://api.trickydeath.xyz/hotspeech/",true);
    xmlhttp.withCredentials = true;
    xmlhttp.send();
}

function speech_length_tips(input)
{
    /*参数说明：
    input：输入框内容
    */
    var len = input.length;
    var str_len = String(len);
    var tips = document.getElementById("speech-length-tips");
    if (len <= 300)
    {
        tips.innerHTML = str_len + "/300";
        tips.setAttribute("class","speech-length-tips")
    }
    else
    {
        tips.innerHTML = str_len + "/300";
        tips.setAttribute("class","speech-length-tips-over")
    }
}

/*下列为原文
"<div class=\"speech\">
    <img src=\"civitas/img/1.png\" class=\"img-thumbnail speech-avatar\" width=\"50px\" height=\"50px\"/>
    <span class=\"speech-content\">
        <a href=\"#\" class=\"speech-name\">CIVITAS2团队</a>
        <p>："+json_str["data"]["datalist"][i]["text"]+"</p>
    </span>
    <div class=\"speech-bottom\">
        <p>本地演讲，第"+json_str["data"]["datalist"][i]["day"]+"天，"+json_str["data"]["datalist"][i]["time"]+"</p>
    </div>
    <div class=\"speech-bottom\">
        <a href=\"#\">欢呼(0) </a>
        <a href=\"#\">关注(0) </a>
        <a href=\"#\">倒彩(0)</a>
    </div>
</div>"

"<span class=\"thispage\">"+i+"</span>"

"<a href=\"javascript:void(0)\" onclick=\"load_speech("+i+")\">"+i+"</a>"

"<div class=\"input-group input-group-sm\">
    <input type=\"text\" class=\"form-control speech-page-swap-input\" \id=\"speech-page-swap-input\" placeholder=\"跳转到某页\">
    <button type=\"submit\" class=\"btn btn-primary speech-page-swap-button\" \onclick=\"speech_swap()\">跳转</button>
</div>"
*/