# Telegram Hottest Message

Get the hottest messages from Telegram channels and forward them to specified chats.

[中文文档](https://github.com/jianqiao0313/Telegram-Hottest-Message/blob/main/README.zh-CN.md)

![demo-1.0.3](https://gezichenshan.oss-cn-beijing.aliyuncs.com/public/thm-1.0.3.gif)

## Features

- 🔥 Sort messages by reaction count to find the hottest ones
- 📨 Forward hottest messages to specified chats
- 🌐 Support for SOCKS5/HTTP proxy
- 🎯 Customizable message count and forward count
- 📱 Interactive channel selection
- 💾 Session persistence support

## Installation

### Install from npm (Recommended)

```bash
npm install -g telegram-hottest-message
```

### Build from Source

```bash
git clone https://github.com/jianqiao0313/Telegram-Hottest-Message.git
cd Telegram-Hottest-Message
npm install
npm run build
npm link
```

## Usage

### Basic Usage

```bash
thm
```

### Full Parameters

```bash
thm -I your_api_id -H your_api_hash -S your_session_string -M 50000 -T 20 -P socks5://[user:pass@]127.0.0.1:7890 -F me
```

## Parameters

| Flag | Long Flag | Description | Default |
|------|-----------|-------------|---------|
| `-I` | `--apiId` | Telegram API ID | `2040` |
| `-H` | `--apiHash` | Telegram API Hash | `b18441a1ff607e10a989891a5462e627` |
| `-S` | `--session` | Session string | None |
| `-M` | `--maxMessages` | Maximum messages to fetch | `100000` |
| `-T` | `--top` | Number of top messages to forward | `100` |
| `-O` | `--offsetId` | Message offset ID | None |
| `-P` | `--proxy` | Proxy address | None |
| `-F` | `--forward` | Forward target chat | `me` |

## Getting API Credentials

1. Visit [my.telegram.org](https://my.telegram.org)
2. Log in to your Telegram account
3. Click "API development tools"
4. Create a new application to get `api_id` and `api_hash`

## Session String

When running for the first time, the program will prompt you to enter your phone number and verification code to log in. After successful login, it will display the session string. Please save this string for future use.

## Usage Examples

### Example 1: Using phoneCode login

```bash
thm
```

### Example 2: Using default API credentials

```bash
thm -S "your_session_string_here"
```

### Example 3: Get top 50 hottest messages

```bash
thm -S "your_session_string_here" -T 50
```

### Example 4: Using custom proxy

```bash
thm -S "your_session_string_here" -P "socks5://user:pass@127.0.0.1:1080"
```

### Example 5: Forward to specific chat

```bash
thm -S "your_session_string_here" -F "your_channel_username"
```

## Workflow

1. 🔐 Login to Telegram using provided credentials
2. 📋 Fetch and display available dialogs
3. 🎯 Select the channel to analyze
4. 📥 Fetch messages from the channel
5. 🔥 Sort messages by reaction count
6. 📤 Forward hottest messages to specified chat

## Proxy Configuration

Supports the following proxy formats:

- `socks5://127.0.0.1:1080`
- `socks5://user:pass@127.0.0.1:1080`
- `http://127.0.0.1:8080`
- `http://user:pass@127.0.0.1:8080`

## System Requirements

- Node.js >= 22.0.0
- npm >= 8.0.0

## Development

### Run in Development Mode

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## License

ISC

## Contributing

Issues and Pull Requests are welcome!

## Disclaimer

Please comply with Telegram's Terms of Service and relevant laws and regulations. This tool is for educational and personal use only.