# HealthcareApp

## 🎯 项目简介
HealthcareApp 是一款基于 UniApp + Java 的食品配料表识别与安全检测系统，帮助孕妇及特定人群识别食品中的不良成分，提供健康建议。

## 🛠️ 技术栈
- 前端：UniApp + HBuilderX
- 后端：Java + Spring Boot
- 数据库：MySQL
- 接口调用：百度OCR文字识别API

## 🔑 核心功能
1. 📸 拍照上传配料表
2. 🔍 OCR文字识别
3. 🧠 配料信息提取与分析
4. ⚠️ 危险成分提醒
5. 📌 个性化健康建议

## 🔗 项目目录结构
```
FoodApp
├─ components       # 组件
├─ pages           # 页面
├─ static          # 静态资源
└─ backend         # Java后端代码
```

## 🚀 快速启动
### 1. 克隆项目
```bash
git clone https://github.com/chenxix123/HealthcareApp.git
```

### 2. 前端运行
- 使用 HBuilderX 打开项目
- 直接运行到 Android 设备或模拟器

### 3. 后端运行
- 安装 JDK 17
- 使用 IDEA 打开 `backend` 目录
- 运行 Spring Boot 主类

## 📌 接口说明
| 接口名      | 请求方式 | 说明              |
|-------------|----------|----------------|
| /upload     | POST     | 图片上传       |
| /recognize  | POST     | 文字识别       |
| /analyze    | POST     | 配料分析       |
