---
title: wsl2를 localhost로 연결할 수 없을 때
tags:
  - windows
  - wsl
page: null
description: hosts 파일을 수정할 수 있게 만들자
date: '2022-08-20T22:40:09.881+09:00'
---

# `localhost` 연결이 왜 안돼
`wsl2`(이하 `wsl`)에서 
```bash
python -m http.server
```
위와 같이 서버를 실행 한 다음, ```localhost:8000```으로 접근하면 해당 디렉토리를 탐색할 수 있는 페이지에 접근 할 수 있다.

그런데 정확한 이유는 모르겠지만 이게 정상적으로 작동하지 않을 때가 있다.

# `wsl`의 주소에 직접 접근하자
`wslconfig`를 수정해봐도 동일한 문제가 반복되는게 짜증나서, `localhost`대신 `wsl`의 로컬 주소를 매핑하는 글을 찾아봤다.

[Fixing WSL2 localhost access issue](https://abdus.dev/posts/fixing-wsl2-localhost-access-issue/)

> 위 글에서 가져온, 아래에서 사용할 코드
>```powershell[remote-port-hosts.ps1]
>$hostname = "wslhost"
>
># find ip of eth0
>$ifconfig = (wsl -- ip -4 addr show eth0)
>$ipPattern = "((\d+\.?){4})"
>$ip = ([regex]"inet $ipPattern").Match($ifconfig).Groups[1].Value
>if (-not $ip) {
>    exit
>}
>Write-Host $ip
>
>$hostsPath = "$env:windir/system32/drivers/etc/hosts"
>
>$hosts = (Get-Content -Path $hostsPath -Raw -ErrorAction Ignore)
>if ($null -eq $hosts) {
>    $hosts = ""
>}
>$hosts = $hosts.Trim()
>
># update or add wsl ip
>$find = "$ipPattern\s+$hostname"
>$entry = "$ip $hostname"
>
>if ($hosts -match $find) {
>    $hosts = $hosts -replace $find, $entry
>}
>else {
>    $hosts = "$hosts`n$entry".Trim()
>}
>
>try {
>    $temp = "$hostsPath.new"
>    New-Item -Path $temp -ItemType File -Force | Out-Null
>    Set-Content -Path $temp $hosts
>
>    Move-Item -Path $temp -Destination $hostsPath -Force
>}
>catch {
>    Write-Error "cannot update wsl ip"
>}
>```

해당 글에서는 `wsl`이 처음 시작하고, 네트워크가 연결되는 이벤트에 반응하는 스케쥴을 생성해서 관리하는 방식으로 되어있는데, 이전 글인 `Distrod`와 같이 쓰려니 알 수 없는 에러가 발생했다.

`wsl`으로 지속적인 서비스를 띄워놓을 생각은 없으므로, 터미널 접근시 실행하는 스크립트를 하나 작성하기로 했다.

```bash[hosts.sh]
#!/usr/bin/env bash

wsl_host_name=wslhost
win_ps1='c:\\wsl\\remote-port-hosts.ps1'

ip_pattern='([0-9]{1,3}\.){3}[0-9]{1,3}'
win_hosts='/mnt/c/Windows/System32/drivers/etc/hosts'
powershell_cmd='Start-Process powershell -verb runas -ArgumentList '\
'"-ExecutionPolicy Bypass -File '${win_ps1}'"'

# windows의 hosts에 작성되어 있는 wsl ip
win_hosts_ip=`cat ${win_hosts} | \
    grep ${wsl_host_name} | \
    egrep -o ${ip_pattern}`
# linux의 hosts에 작성되어 있는 wsl ip
linux_hosts_ip=`cat /etc/hosts | \
    grep ${wsl_host_name} | \
    egrep -o ${ip_pattern}`
# wsl이 실제로 실행되고 있는 ip
real_ip=`ip addr | \
    awk '/inet/ && /eth0/' | \
    awk '{print $2}' | \
    egrep -o ${ip_pattern}`

if [ ${win_hosts_ip} == $real_ip ] && \
    [ $linux_hosts_ip == $real_ip ]; then
    exit 0
fi

# 관리자권한 파워쉘을 실행하여 hosts파일 수정
echo run cmd to change windows hosts
powershell.exe ${powershell_cmd}
# 관리자권한으로 wsl의 hosts를 수정
echo change /etc/hosts
sudo sed -i s/${linux_hosts_ip}/${real_ip}/g /etc/hosts
exit 0
```

이제 위 스크립트를 ```.zshrc```와 같은 곳에서 실행하도록 설정하면 된다.

이 스크립트가 정상적으로 실행된다면, 이제 `localhost`대신 `wslhost`로 `wsl`에서 실행한 서비스에 접근할 수 있게 된다.

# 아쉽다
`wsl`내에서 윈도우의 `hosts` 파일을 수정할 수 있다면 훨씬 간단했지만, 쓰기 권한을 얻을 방법이 보이지 않아 일단 돌아서 처리하기로 했다.

좀 더 깔끔한 방법을 찾는다면 새로 포스팅하자.
