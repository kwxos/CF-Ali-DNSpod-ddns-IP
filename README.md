# CF-DNSpod-Aliy-ddns
#版本：V4.0
#需要软件包：jq curl openssl wget coreutils-timeout
>运行日志文件和配置文件在/root/dns-ip/文件夹下的ddns_log.txt和config
功能有：
1. 可以优选Cf的ip更新到CF  阿里云DNS  DNSpod，可选择平台更新
2. 增加ip源选择，可选择ip为反代IP，仓库推荐
   `https://github.com/ymyuuu/Proxy-IP-library`
3. 也可作为本地公网IP更新到域名
4. 自动下载所需环境软件包，运行文件，IP文件
5. 增加轮询，可指定轮询时间，若IP不能用则进行新一轮测速
6. 增加docker模式
7. TG推送更新消息,所有配置均可选择开启或关闭
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
感谢[lee1080](https://github.com/lee1080)
感谢XIU2给大家提供的工具。 https://github.com/XIU2/CloudflareSpeedTest
