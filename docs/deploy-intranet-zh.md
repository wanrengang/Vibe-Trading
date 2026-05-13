# 万策量化内网部署指南

本文档用于把当前中文二开版本部署到另一台内网服务器。

## 服务器准备

推荐系统：Ubuntu 22.04/24.04 或其他常见 Linux 发行版。

需要安装：

```bash
docker --version
docker compose version
git --version
```

如果没有 Docker，请先按服务器系统安装 Docker Engine 和 Docker Compose Plugin。

## 拉取代码

```bash
git clone https://github.com/wanrengang/Vibe-Trading.git
cd Vibe-Trading
git checkout codex-zh-ui-localization
```

如果服务器已经 clone 过：

```bash
cd Vibe-Trading
git fetch origin
git checkout codex-zh-ui-localization
git pull
```

## 配置环境变量

复制示例配置：

```bash
cp agent/.env.example agent/.env
```

编辑配置：

```bash
nano agent/.env
```

至少配置你实际使用的大模型提供商、模型名、API Key、Base URL 等参数。

内网部署也建议设置一个访问密钥：

```env
API_AUTH_KEY=换成一串足够长的随机字符串
```

`.env` 只保存在服务器本地，不要提交到 Git。

## 启动服务

```bash
docker compose up -d --build vibe-trading
```

查看状态：

```bash
docker compose ps
```

健康检查：

```bash
curl http://127.0.0.1:8899/health
```

如果返回 `healthy`，说明服务已启动。

## 内网访问

在同一内网里的电脑访问：

```text
http://服务器内网IP:8899
```

例如：

```text
http://192.168.1.20:8899
```

如果访问不了，检查：

- 服务器防火墙是否放行 `8899`
- 云服务器或虚拟化平台安全组是否放行 `8899`
- `docker compose ps` 是否显示 `0.0.0.0:8899->8899/tcp`

## 数据持久化

`docker-compose.yml` 使用相对路径挂载，数据会保存在项目目录下：

```text
agent/runs
agent/sessions
agent/uploads
```

重建镜像或重启容器不会删除这些数据。

## 更新版本

以后同步你的中文二开版本：

```bash
cd Vibe-Trading
git checkout codex-zh-ui-localization
git pull
docker compose up -d --build vibe-trading
```

## 同步官方更新

本项目建议长期保留两个分支：

```text
main
用于跟踪官方原版，尽量不直接二开。

codex-zh-ui-localization
用于万策量化中文二开、品牌和内网部署。
```

如果本地还没有官方远程仓库，先配置一次：

```bash
git remote -v
git remote add upstream https://github.com/HKUDS/Vibe-Trading.git
```

如果已经有 `upstream`，不用重复添加。

### 在开发机同步官方更新

先保证自己的中文分支已经提交干净：

```bash
git checkout codex-zh-ui-localization
git status
```

如果有未提交改动，先提交或暂存。

然后更新官方主线：

```bash
git fetch upstream
git checkout main
git merge --ff-only upstream/main
```

再把官方更新合入中文二开分支：

```bash
git checkout codex-zh-ui-localization
git rebase main
```

如果出现冲突，按提示修复冲突文件，然后执行：

```bash
git add 冲突文件
git rebase --continue
```

如果想放弃本次 rebase：

```bash
git rebase --abort
```

合并完成后，本地验证：

```bash
docker compose config --quiet
docker compose up -d --build vibe-trading
curl http://127.0.0.1:8899/health
```

确认没问题后推送你的中文分支：

```bash
git push origin codex-zh-ui-localization
```

如果 rebase 后 Git 提示需要 force push，使用更安全的：

```bash
git push --force-with-lease origin codex-zh-ui-localization
```

### 在服务器更新到最新中文版本

服务器只需要拉你的中文分支，不需要处理官方合并：

```bash
cd Vibe-Trading
git checkout codex-zh-ui-localization
git pull
docker compose up -d --build vibe-trading
curl http://127.0.0.1:8899/health
```

也就是说：

```text
开发机：负责同步 upstream 官方更新、解决冲突、推送中文分支。
服务器：只负责拉取 codex-zh-ui-localization 并重建容器。
```

## 备份数据

建议定期备份：

```bash
tar -czf wance-data-$(date +%F).tar.gz agent/runs agent/sessions agent/uploads agent/.env
```

恢复时把这些目录和 `.env` 放回项目对应位置，再重启容器。

## 常用维护命令

查看日志：

```bash
docker compose logs -f vibe-trading
```

重启服务：

```bash
docker compose restart vibe-trading
```

停止服务：

```bash
docker compose down
```

只重建后端与内置前端：

```bash
docker compose up -d --build vibe-trading
```
