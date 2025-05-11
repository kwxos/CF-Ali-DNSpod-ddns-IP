## 可访问[CloudFlare BestIP](http://bestip.badking.pp.ua/) 体验
## 暂不开源，无任何后门，挖矿，等危害计算机行为，可抓包获取外连网址。
## 项目介绍

BestIP 是一个高效的 IP 优选工具，通过Golang重构，借助 XIU2/CloudflareSpeedTest 的测速工具实现，支持 Cloudflare、阿里云和腾讯云 DNSPod 的 DNS 记录更新。本工具可以帮助用户找到最优的 IP 地址，并自动更新到您的域名解析记录中。

```
    _    _     ____            _ 
   / \  | |__ | __ ) _   _  __(_)
  / _ \ | '_ \|  _ \| | | |/ _| |
 / ___ \| |_) | |_) | |_| | (_| |
/_/   \_\_.__/|____/ \__,_|\__,_|
```

## 主要功能

- 自动下载和测试 Cloudflare IP 速度
- 支持 IPv4 和 IPv6 两种模式
- 支持 Cloudflare、阿里云和腾讯云 DNSPod 三种 DNS 服务商
- 可自定义测试参数和优选规则
- 支持 Cloudflare Workers KV 存储优选 IP 结果
- 定时监控 DNS 解析状态，在延迟或丢包超过阈值时自动更新
- 支持消息推送通知（如 Telegram）

## 配置文件参数详解

`config.json` 文件包含了所有配置参数，下面是详细的参数解释：

### 基本配置

- `IP_Type`: IP 优选类型，可选值：`ipv4`、`ipv6` 或 `ipv4&ipv6`
- `IP_Number`: 需要更新的 IP 数量
- `IPv4_Url`: IPv4 地址文件下载链接
- `Best_IPv4`: 最佳 IPv4 地址文件下载链接
- `IPv6_Url`: IPv6 地址文件下载链接
- `Pushinfo`: 消息推送 URL，支持 Telegram 等推送服务

### 阿里云配置 (Aliyun)

- `Aliyun.aliyun`: 是否启用阿里云 DNS 更新，`true` 或 `false`
- `Aliyun.Domain`: 您的主域名
- `Aliyun.SubDomainName`: 子域名名称
- `Aliyun.TTL`: DNS 记录的 TTL 值（秒）
- `Aliyun.AliDDNS_AK`: 阿里云 AccessKey ID
- `Aliyun.AliDDNS_SK`: 阿里云 AccessKey Secret

### Cloudflare 配置

- `Cloudflare.Cloudflare`: 是否启用 Cloudflare DNS 更新，`true` 或 `false`
- `Cloudflare.Domain`: 您的主域名
- `Cloudflare.SubDomainName`: 子域名名称
- `Cloudflare.Email`: Cloudflare 账户邮箱
- `Cloudflare.ZoneID`: 域名的 Zone ID
- `Cloudflare.ApiKey`: Cloudflare API 密钥
- `Cloudflare.Proxy`: 是否启用 Cloudflare 代理，`true` 或 `false`

### DNSPod 配置

- `Dnspod.Dnspod`: 是否启用腾讯云 DNSPod 更新，`true` 或 `false`
- `Dnspod.Domain`: 您的主域名
- `Dnspod.SubDomainName`: 子域名名称
- `Dnspod.RecordLine`: 记录线路，一般为 "默认"
- `Dnspod.SecretId`: 腾讯云 SecretId
- `Dnspod.SecretKey`: 腾讯云 SecretKey

### CloudflareST 测速配置

- `CloudflareST.CloudflareST_speed`: 是否启用 CloudflareST 测速，`true` 或 `false`
- `CloudflareST.CFST_URL`: 测速目标 URL
- `CloudflareST.CFST_conf`: CloudflareST 测速参数配置

### Cloudflare KV 配置

- `CloudflareKV.CloudflareKV`: 是否启用 Cloudflare Workers KV 存储，`true` 或 `false`
- `CloudflareKV.KVapiToken`: Cloudflare API Token
- `CloudflareKV.KVaccountID`: Cloudflare 账户 ID
- `CloudflareKV.KVnamespaceID`: KV 命名空间 ID

### 测试监控配置

- `TestSetime.Test_Loop`: 是否启用定时监控，`true` 或 `false`
- `TestSetime.Test_domain`: 需要监控的域名
- `TestSetime.Test_latencyThreshold`: 延迟阈值（毫秒）
- `TestSetime.Test_packetLossThreshold`: 丢包率阈值（百分比）
- `TestSetime.Test_checkInterval`: 检查间隔时间（分钟）
- `TestSetime.Test_checknum`: 每次测试的次数
- `TestSetime.Test_maxchecknum`: 强化测试的最大次数
- `TestSetime.Test_maxTestInterval`: 强制重新测试的时间间隔（小时）

### 调试配置
- `debug`: 是否启用调试模式，启用后会输出更详细的日志信息

## 使用方法

1. 下载本程序并解压
2. 根据自己的需求修改 `config.json` 配置文件
3. 运行可执行文件 `./bestip`

## 展示页面示例
![image](https://github.com/user-attachments/assets/24a57a0e-42a1-4853-8268-3f545658fecc)

## 展示页面示例
![image](https://github.com/user-attachments/assets/7a94937a-3bde-4471-90da-7441017d1c6c)

![image](https://github.com/user-attachments/assets/df0e6aa3-4cdd-458a-ba9e-7c640bcf56e8)

## 注意事项

- 请确保您的 API 密钥等敏感信息安全，不要泄露给他人
- 测速时可能会消耗一定的网络流量，请注意您的网络计划
- 本工具基于 XIU2/CloudflareSpeedTest，需要下载其测速组件才能正常工作
- 更新频率不建议设置过高，以免触发 API 调用限制

## 版权和许可

BestIP for CF-Ali-DNSpod 由 AbBai（阿布白）开发
源码仓库：[https://github.com/IonRh/Cloudflare-BestIP](https://github.com/IonRh/Cloudflare-BestIP)

感谢XIU2给大家提供的工具。 https://github.com/XIU2/CloudflareSpeedTest
