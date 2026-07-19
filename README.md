# Halo 滚动数字插件

[![Halo](https://img.shields.io/badge/Halo-%3E%3D2.25.0-blue)](https://www.halo.run/)
[![License](https://img.shields.io/badge/License-GPL--3.0-green)](LICENSE)

作者：[Akagi_Zen](https://github.com/fhfzfy1231/halo-plugin-animated-number)

适用于 Halo 2.25.0 及以上版本。插件为 Halo 默认富文本编辑器增加一个可自定义内容与样式的滚动数字块，组件第一次进入浏览器可见区域时播放一次。

## 功能

- 每个数字独立随机滚动 20 次，约完成两轮 `0–9` 循环后停在目标数字
- 数字之间使用错开的启动延迟，让滚动效果更加自然
- 普通文字、中文、日期分隔符、百分号和货币符号保持静止
- 支持整数、小数、百分比、金额、中文日期和英文日期
- 一段内容可以包含多组数字，并在进入可见区域时同时播放
- 默认内容为 `XXXXXX`，默认动画总时长为 1.5 秒
- 自定义内容、字号、颜色、字重、对齐方式、宽度和动画时长
- 宽度支持 `100%`、`auto`、`480px` 等 CSS 宽度写法，并限制为不超过内容容器
- 仅在第一次滚动到组件时触发，离开后再次进入不会重复播放
- 支持 `prefers-reduced-motion`，访客要求减少动画时直接显示目标数字
- 前台脚本和样式由插件直接嵌入，不依赖第三方资源或额外外部请求
- 可从编辑器顶部工具箱直接插入
- 支持 `/滚动数字`、`/数字`、`/计数` 等关键词快捷插入

支持的内容示例：

```text
1000
100.90
98.6%
¥100.90万+
2016y12m21d
2016年12月11日
```

## 使用方法

1. 在 Halo 后台进入“插件”，上传构建产生的 JAR 并启用。
2. 使用 Halo 默认富文本编辑器打开文章或页面。
3. 点击编辑器顶部工具箱，选择“滚动数字”；也可以在空白行输入 `/` 后搜索“滚动数字”。
4. 插入组件后，设置内容、字号、颜色、字重、对齐、宽度和动画时长。
5. 保存或发布文章。访客第一次滚动到组件时，数字会自动播放一次。

## 本地构建

环境要求：JDK 21、Node.js 24+、pnpm 10。项目已包含 Gradle Wrapper，正常构建不需要单独安装 Gradle。

```bash
./gradlew build
```

Windows：

```powershell
.\gradlew.bat build
```

构建完成后，安装包位于：

```text
build/libs/plugin-animated-number-*.jar
```

## 开发模式

```bash
./gradlew haloServer
```

该命令会启动 Halo 开发环境并加载插件。详细要求以 Halo 官方插件开发文档为准。

## 内容格式

插件把组件保存为 `animated-number` 自定义元素。数字在浏览器端使用 `requestAnimationFrame` 播放，组件通过 `IntersectionObserver` 判断首次进入可见区域的时机。

## 许可

GPL-3.0
