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
git pull
docker compose up -d --build vibe-trading
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
