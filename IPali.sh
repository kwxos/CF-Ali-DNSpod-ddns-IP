#!/bin/bash
echo "开始更新阿里域名。。。。。。"
sleep 3;

while true; do

ipAddr5=$ipAddr
AliDDNS_LocalIP="$ipAddr5"
# 设置解析使用的DNS服务器 (推荐使用 223.5.5.5/223.6.6.6 , 毕竟都是阿里家的东西)
AliDDNS_DomainServerIP="223.5.5.5"

ALiDom="$AliDDNS_SubDomainName.$AliDDNS_DomainName"

# 防止用户忘记设置参数导致程序报错，部分参数如果检测到空值，自动使用默认值
[ "$AliDDNS_LocalIP" = "" ] && AliDDNS_LocalIP="$ipAddr5"
[ "$AliDDNS_DomainServerIP" = "" ] && $AliDDNS_DomainServerIP="223.5.5.5"
[ "$AliDDNS_TTL" = "" ] && AliDDNS_TTL="600"
# 获取DDNS域名当前解析记录IP
AliDDNS_DomainIP=`nslookup $AliDDNS_SubDomainName.$AliDDNS_DomainName $AliDDNS_DomainServerIP 2>&1`
# 判断上一条命令的执行是否成功
if [ "$?" -eq "0" ]
then
    # 如果执行成功，分离出结果中的IP地址
    AliDDNS_DomainIP=`echo "$AliDDNS_DomainIP" | grep 'Address:' | tail -n1 | awk '{print $NF}'`
    # 进行判断，如果本次获取的新IP和旧IP相同，则进行休眠一分钟后再继续判断
    if [ "$AliDDNS_LocalIP" = "$AliDDNS_DomainIP" ]
    then
        echo -e "----->阿里未更新<------\n域名：$ALiDom\n原IP：$AliDDNS_DomainIP" >> informlog;
    break
    fi 
fi


# 如果IP发生变动，开始进行修改
# 生成时间戳
timestamp=`date -u "+%Y-%m-%dT%H%%3A%M%%3A%SZ"`
# URL加密函数
urlencode() {
    # urlencode <string>
    out=""
    while read -n1 c
    do
        case $c in
            [a-zA-Z0-9._-]) out="$out$c" ;;
            *) out="$out`printf '%%%02X' "'$c"`" ;;
        esac
    done
    echo -n $out
}
# URL加密命令
enc() {
    echo -n "$1" | urlencode
}
# 发送请求函数
send_request() {
    local args="AccessKeyId=$AliDDNS_AK&Action=$1&Format=json&$2&Version=2015-01-09"
    local hash=$(echo -n "GET&%2F&$(enc "$args")" | openssl dgst -sha1 -hmac "$AliDDNS_SK&" -binary | openssl base64)
    curl -s "http://alidns.aliyuncs.com/?$args&Signature=$(enc "$hash")"
}
# 获取记录值 (RecordID)
get_recordid() {
    grep -Eo '"RecordId":"[0-9]+"' | cut -d':' -f2 | tr -d '"'
}
# 请求记录值 (RecordID)
query_recordid() {
    send_request "DescribeSubDomainRecords" "SignatureMethod=HMAC-SHA1&SignatureNonce=$timestamp&SignatureVersion=1.0&SubDomain=$AliDDNS_SubDomainName.$AliDDNS_DomainName&Timestamp=$timestamp"
}
# 更新记录值 (RecordID)
update_record() {
    send_request "UpdateDomainRecord" "RR=$AliDDNS_SubDomainName&RecordId=$1&SignatureMethod=HMAC-SHA1&SignatureNonce=$timestamp&SignatureVersion=1.0&TTL=$AliDDNS_TTL&Timestamp=$timestamp&Type=A&Value=$AliDDNS_LocalIP"
}
# 添加记录值 (RecordID)
add_record() {
    send_request "AddDomainRecord&DomainName=$AliDDNS_DomainName" "RR=$AliDDNS_SubDomainName&SignatureMethod=HMAC-SHA1&SignatureNonce=$timestamp&SignatureVersion=1.0&TTL=$AliDDNS_TTL&Timestamp=$timestamp&Type=A&Value=$AliDDNS_LocalIP"
}

# 判断RecordIP是否为空
if [ "$AliDDNS_RecordID" = "" ]
then
    AliDDNS_RecordID=`query_recordid | get_recordid`
fi
if [ "$AliDDNS_RecordID" = "" ]
then
    AliDDNS_RecordID=`add_record | get_recordid`
    echo "[$(date "+%G/%m/%d %H:%M:%S")] Added RecordID : $AliDDNS_RecordID"
else
    update_record $AliDDNS_RecordID
    echo "[$(date "+%G/%m/%d %H:%M:%S")] Updated RecordID : $AliDDNS_RecordID"
fi

# 输出最终结果
if [ "$AliDDNS_RecordID" = "" ]; then
    # 输出失败结果 (因为没有获取到RecordID)
    echo "[$(date "+%G/%m/%d %H:%M:%S")] DDNS Update Failed !"
else
    # 输出成功结果
    echo -e "----->阿里域名<------\n域名：$ALiDom\n更新：$AliDDNS_LocalIP" >> informlog;
fi
break
done
pushmessage=$(cat informlog);
source tg-push;
exit 0;
