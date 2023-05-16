#!/bin/bash
##版本：V3.0
	#新功能，支持更新优选完毕后推送至TG，再也不怕脚本没有成功运行了。
	#使用脚本需要安装jq和timeout，新增openwrt专用cf_RE.sh文件，运行cf_RE.sh即可在openwrt安装jq和timeout两个扩展。
	#其他linux请自行安装jq和timeout。
	#增加阿里DNS解析
	#优化TG推送流程
###################################################################################################
##运行模式ipv4 or ipv6 默认为：ipv4
#指定工作模式为ipv4还是ipv6。如果为ipv6，请在文件夹下添加ipv6.txt
#ipv6.txt在CloudflareST工具包里，下载地址：https://github.com/XIU2/CloudflareSpeedTest/releases
IP_ADDR=ipv4
###################################################################################################
##cloudflare配置
#cloudflare账号邮箱
x_email=xxxxx@qq.com
#填写需要DDNS的完整域名
#支持多域名:域名需要填写在括号中，每个域名之间用“空格”相隔。
#例如：（cdn.test.com） 或者 （cdn1.test.com cdn2.test.com cdn3.test.com）
hostname=(xxx.xxxx.xxx)
#空间ID
zone_id=xxxxxxxxx7d14e5152f9xxxxxxxxx
#Global API Key
api_key=xxxxxxxb4cxxxxxxxxxx
###################################################################################################
##阿里云配置
#需要更新的域名ddns.example.com
#设置需要DDNS的域名：example.com
AliDDNS_DomainName="xxx.xxx"
# 设置需要DDNS的主机名：ddns
AliDDNS_SubDomainName="xxxx"
# 设置域名记录的TTL (生存周期)
# 免费版产品最低为600(10分钟)~86400(1天), 付费版(企业版)包括以上范围, 还可以按照购买产品配置设置为：
# 600(10分钟)、120(2分钟)、60(1分钟)、10(10秒)、5(5秒)、1(1秒), 
# 请按照自己的产品配置和DDNS解析速度需求妥善配置TTL值, 免费版设置低于600的TTL将会报错。
AliDDNS_TTL="600"
# 设置阿里云的AccessKeyId/AccessKeySecret,
# 可在 https://ak-console.aliyun.com/ 处获取 ,
# 推荐使用 https://ram.console.aliyun.com/#/user/list 生成的AK/SK, 更安全
# 设置阿里云的Access Key
AliDDNS_AK="xxxxxxxxxxxxxxxxxxx"
# 设置阿里云的Secret Key
AliDDNS_SK="x7dZxxxxxxxxxxxxxxxx"
###################################################################################################
##openwrt科学上网插件配置
#优选节点时是否自动停止科学上网服务 true=自动停止 false=不停止 默认为 true
pause=false
#填写openwrt使用的是哪个科学上网客户端，填写对应的“数字”  默认为 1  客户端为passwall
# 1=passwall 2=passwall2 3=ShadowSocksR Plus+ 4=clash 5=openclash 6=bypass
clien=3
###################################################################################################
##CloudflareST配置
#测速地址  
CFST_URL=替换测试地址
#测速线程数量；越多测速越快，性能弱的设备 (如路由器) 请勿太高；(默认 200 最多 1000 )
CFST_N=250
#延迟测速次数；单个 IP 延迟测速次数，为 1 时将过滤丢包的IP，TCP协议；(默认 4 次 )
CFST_T=4
#下载测速数量；延迟测速并排序后，从最低延迟起下载测速的数量；(默认 10 个)
CFST_DN=3
#平均延迟上限；只输出低于指定平均延迟的 IP，可与其他上限/下限搭配；(默认9999 ms 这里推荐配置250 ms)
CFST_TL=250
#平均延迟下限；只输出高于指定平均延迟的 IP，可与其他上限/下限搭配、过滤假墙 IP；(默认 0 ms 这里推荐配置40)
CFST_TLL=20
#下载速度下限；只输出高于指定下载速度的 IP，凑够指定数量 [-dn] 才会停止测速；(默认 0.00 MB/s 这里推荐5.00MB/s)
CFST_SL=5
#初次输出文件，筛选初次测速IP
CFST_CSV=result.csv
#IP对比输出文件，与原IP进行对比后输出IP文件名
CFST_CSV2=DCF.csv
#####################################################################################################
##TG推送设置
#（填写即为开启推送，未填写则为不开启）
#提示，如果openwrt中，请先执行./cf_RE.sh命令安装相应模块，不然会推送失败
#TG机器人token 例如：123456789:ABCDEFG...
telegramBotToken=xx22xxxxxxx:AAHJkMLxxxxxxxxxxxxx
#用户ID或频道、群ID 例如：123456789
telegramBotUserId=6xxxxxxxxxxx
##TGlink设置，默认：api.telegram.org
telegramlink=
#####################################################################################################
source cf-ddns
