# CF-ddns-DNSpod-aliy
#版本：V4.0
#需要软件包：jq curl openssl wget
>运行日志文件和配置文件在/root/dns-ip/文件夹下的ddns_log.txt和config
功能有：
1. 

##手动运行方式：
```
mkdir /root/dns-ip/ && cd /root/dns-ip/
wget https://raw.githubusercontents.com/kwxos/CF-Ali-DNSpod-ddns-IP/main/Ali-DNSpod-CF-ddns.sh
chmod a+x Ali-DNSpod-CF-ddns.sh
./Ali-DNSpod-CF-ddns.sh
```
##docker运行：
```
docker run \
    -itd \
    --name dns-ip \
    --restart always \
    --network=host \
    -v /root/dns-ip:/opt \
    kwxos/cfaliddns:latest
```

##如果项目有帮助到你，请点一个免费的`star`
新功能，支持更新优选完毕后推送至TG，再也不怕脚本没有成功运行了,优化TG推送流程
使用脚本需要安装jq和timeout，新增openwrt专用plug.sh文件，运行plug.sh即可在openwrt安装jq和timeout两个扩展。
感谢[lee1080](https://github.com/lee1080)
感谢XIU2给大家提供的工具。 https://github.com/XIU2/CloudflareSpeedTest
