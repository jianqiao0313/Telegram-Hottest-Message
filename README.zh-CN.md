<p align="center">
  <img src="assets/logo.png" alt="logo" width="150" height="150"/>
</p>

# Telegram Hottest Message

获取 Telegram 指定频道中最热门的消息(表情回复最多的)，并可以转发到指定聊天。（比如：想获取某些福利群组里，点赞最多最火的消息）

**请放心，THM没收集你的任何信息，用的npm包都是官方的，请踏实儿使用～enjoy～**

<div align="center">

  <!-- 项目信息 -->
  <img src="https://img.shields.io/github/repo-size/jianqiao0313/Telegram-Hottest-Message" alt="Repo size" />
  <img src="https://img.shields.io/github/license/jianqiao0313/Telegram-Hottest-Message" alt="License" />

  <!-- 社交统计 -->
  <img src="https://img.shields.io/github/stars/jianqiao0313/Telegram-Hottest-Message?style=social" alt="Stars" />
  <img src="https://img.shields.io/github/forks/jianqiao0313/Telegram-Hottest-Message?style=social" alt="Forks" />
  <img src="https://img.shields.io/github/issues/jianqiao0313/Telegram-Hottest-Message" alt="Issues" />

</div>

![demo-1.0.3](https://static.gezichenshan.top/public/thm-1.0.3.gif)

[如果 GIF 播放不全，请点我查看完整 demo](https://static.gezichenshan.top/public/thm-1.0.3.gif)

## 功能特性

- 🔥 根据消息反应(表情回复)数量排序，找出最热门的消息
- 📨 支持将热门消息转发到指定聊天
- 🌐 支持 SOCKS5/HTTP 代理
- 🎯 可自定义获取消息数量和转发数量
- 📅 支持按时间范围筛选消息（如最近 7 天、指定日期等）
- 📱 交互式选择频道对话
- 💾 支持会话持久化

## 安装

### 从 npm 安装（推荐）

```bash
npm install -g telegram-hottest-message
```

### 从源码构建

```bash
git clone https://github.com/jianqiao0313/Telegram-Hottest-Message.git
cd Telegram-Hottest-Message
npm install
npm run build
npm link
```

## 使用方法

### 基本用法

```bash
thm
```

### 完整参数

```bash
thm -I your_api_id -H your_api_hash -S your_session_string -M 50000 -T 20 -P socks5://[user:pass@]127.0.0.1:7890 -F me
```

## 参数说明

| 参数 | 长参数 | 说明 | 默认值 |
|------|--------|------|--------|
| `-I` | `--apiId` | Telegram API ID | `2040` |
| `-H` | `--apiHash` | Telegram API Hash | `b18441a1ff607e10a989891a5462e627` |
| `-S` | `--session` | 会话字符串 | 无 |
| `-M` | `--maxMessages` | 最大获取消息数 | `100000` |
| `-T` | `--top` | 转发的热门消息数量 | `100` |
| `-O` | `--offsetId` | 消息偏移ID | 无 |
| `-P` | `--proxy` | 代理地址 | 无 |
| `-F` | `--forward` | 转发目标聊天 | `me` |
| `--since` |  | 仅获取此日期之后的消息（如 `7d`/`2024-01-01`） | 无 |
| `--until` |  | 仅获取此日期之前的消息（如 `2024-12-31`） | 无 |

## 获取 API 凭证

1. 访问 [my.telegram.org](https://my.telegram.org)
2. 登录您的 Telegram 账户
3. 点击 "API development tools"
4. 创建新应用程序获取 `api_id` 和 `api_hash`

## 会话字符串

首次运行时，程序会提示您输入手机号和验证码进行登录，登录成功后会显示会话字符串。请保存此字符串用于后续使用。

## 使用示例

### 示例 1：使用手机验证码或Telegram验证码登录

```bash
thm
```

### 示例 2：使用默认 API 凭证

```bash
thm -S "your_session_string_here"
```

### 示例 3：获取前 50 条热门消息

```bash
thm -S "your_session_string_here" -T 50
```

### 示例 4：使用自定义代理

```bash
thm -S "your_session_string_here" -P "socks5://user:pass@127.0.0.1:1080"
```

### 示例 5：转发到特定聊天

```bash
thm -S "your_session_string_here" -F "your_channel_username"
```

### 示例 6：按时间范围筛选

```bash
# 获取最近 7 天最火的 20 条
thm -S "your_session_string_here" --since 7d -T 20

# 获取 2024 年全年最火的
thm -S "your_session_string_here" --since 2024-01-01 --until 2025-01-01

# 获取最近 24 小时最火的
thm -S "your_session_string_here" --since 24h
```

## 工作流程

1. 🔐 使用提供的凭证登录 Telegram
2. 📋 获取并显示可用的对话列表
3. 🎯 选择要分析的频道
4. 📥 获取频道中的消息
5. 🔥 根据反应数量排序消息
6. 📤 将热门消息转发到指定聊天

## 代理配置

支持以下代理格式：

- `socks5://127.0.0.1:1080`
- `socks5://user:pass@127.0.0.1:1080`
- `http://127.0.0.1:8080`
- `http://user:pass@127.0.0.1:8080`

## 系统要求

- Node.js >= 22.0.0
- npm >= 8.0.0

## 开发

### 开发环境运行

```bash
npm run dev
```

### 构建

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

## ⭐ Star

[![Stargazers over time](https://starchart.cc/jianqiao0313/Telegram-Hottest-Message.svg?variant=adaptive)](https://starchart.cc/jianqiao0313/Telegram-Hottest-Message)

## 免责声明

请遵守 Telegram 的使用条款和相关法律法规。本工具仅供学习和个人使用。
