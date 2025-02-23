# UEG官方网站

这是一个基于《流浪地球》电影世界观的地球联合政府(UEG)官方网站项目。该网站采用赛博朋克工业风格设计，展示了人类在面对太阳系危机时的重大事件和政府机构信息。

## 功能特点

- 响应式设计，支持各种设备访问
- 实时显示行星发动机状态和飞行数据
- 完整的用户认证系统
- 新闻公告发布系统
- 历史事件时间线展示
- 地下城市信息展示
- 政府机构介绍

## 技术栈

- Python 3.8+
- Flask 2.0.1
- SQLAlchemy
- HTML5/CSS3
- JavaScript (ES6+)

## 安装说明

1. 克隆项目到本地：
```bash
git clone https://github.com/XiaoYeYa/ueg-website.git
cd ueg-website
```

2. 创建并激活虚拟环境：
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

3. 安装依赖：
```bash
pip install -r requirements.txt
```

4. 初始化数据库：
```bash
flask db upgrade
```

5. 运行项目：
```bash
python app.py
```

## 项目结构

```
UEG_Website/
├── static/
│   ├── css/
│   ├── js/
│   └── images/
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── news.html
│   ├── history.html
│   └── ...
├── app.py
├── requirements.txt
└── README.md
```

## 开发指南

1. 所有静态文件都放在 `static` 目录下
2. 模板文件放在 `templates` 目录下
3. 数据库模型定义在 `app.py` 中
4. CSS 样式遵循 BEM 命名规范

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 
