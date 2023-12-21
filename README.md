## CF-DNSpod-Aliy-ddns
#### 版本：V4.1
#### 需要软件包：jq curl openssl wget coreutils-timeout(脚本带有安装代码，若出错，请自行安装)
#### 首次运行后，请填好配置文件，其中有详细解释，若不明白，搜索，或者问我
#### docker首次运行产生config文件后，请手动停止，配置好文件后手动重启
#### 运行日志文件和配置文件在/root/dns-ip/文件夹下的ddns_log.txt和config
#### 功能有：
1. 可以优选Cf的ip更新到CF  阿里云DNS  DNSpod，可选择平台更新
2. 增加ip源选择，可选择ip为反代IP，仓库推荐
   `https://github.com/ymyuuu/Proxy-IP-library`
3. 也可作为本地公网IP更新到域名
4. 自动下载所需环境软件包，运行文件，IP文件
5. 增加轮询，可指定轮询时间，若IP不能用则进行新一轮测速
6. 增加docker模式
7. TG推送更新消息,所有配置均可选择开启或关闭
8. 将上次以解析ip，放入本地重新测速比较
#### 手动运行方式：
```
mkdir -p $(pwd)/dns-ip/ && cd $(pwd)/dns-ip/ && wget https://raw.githubusercontent.com/kwxos/CF-Ali-DNSpod-ddns-IP/main/Ali-DNSpod-CF-ddns.sh && chmod a+x Ali-DNSpod-CF-ddns.sh && ./Ali-DNSpod-CF-ddns.sh
```
##### 在本文件夹下修改config配置，确保配置无误，然后
```
screen ./Ali-DNSpod-CF-ddns.sh &
```
##### 若要停止程序

```
# 搜寻进程编号
ps aux | grep Ali-DNSpod-CF-ddns.sh
# 杀死进程
kill -9 编号
```
如下图：

![image](https://github.com/kwxos/CF-Ali-DNSpod-ddns-IP/assets/102129419/3435a585-5a8d-44a7-b32c-9a58b4287880)

![image](https://github.com/kwxos/CF-Ali-DNSpod-ddns-IP/assets/102129419/fd82480e-68d3-4b6e-80ca-26dfd654241d)

#### docker运行：
首次运行，请在产生文件后停止，修改配置文件，确保无误后，再次运行
```
docker run \
    -itd \
    --name dns-ip \
    --restart always \
    --network=host \
    -v $(pwd)/dns-ip:/opt \
    kwxos/cfaliddns:latest
```
##### 手动停止
```
docker stop dns-ip
```
#### 手动开启
```
docker start dns-ip
```
配置样本

![image](https://github.com/kwxos/CF-Ali-DNSpod-ddns-IP/assets/102129419/ce505721-adac-48ff-b538-bbb4754d5aad)

运行样本

![bf50d0ab4006ce6fd974d741d58f4e6b](https://github.com/kwxos/CF-Ali-DNSpod-ddns-IP/assets/102129419/38eb83aa-f9f0-4939-a0bb-1c501a4dfa54)

### 如果项目有帮助到你，请点一个免费的`star`，
### 有钱捧钱场，没钱点star吧，捐赠大于等于2块，备注名字将记录进博客捐赠名单，
| wechat | alipay |
| --- | --- |
![image](https://github.com/kwxos/CF-Ali-DNSpod-ddns-IP/assets/102129419/69c5a4c2-e528-46b2-a65b-ac91cce68f96) | ![image](https://github.com/kwxos/CF-Ali-DNSpod-ddns-IP/assets/102129419/a2296be8-e71d-4868-8b91-f58ae58a3f56) |

感谢[lee1080](https://github.com/lee1080)
感谢XIU2给大家提供的工具。 https://github.com/XIU2/CloudflareSpeedTest
