# Reforming the challenge project
# 挑战卡路里react改造版本

## 开始

* npm start 生成测试环境代码
* npm compile 生成生产环境的代码

## 代码技术规范

* react版本

## 所用插件

* sass
    本项目使用react技术，为避免CSS变量全局污染，采用CSSmodule，
    scss中的变量
    ```
    $primary-color: #f40;
    :export {
        primaryColor: $primary-color;
        }
    ```
* redux
* eslint

## 注意事项 

* 移动端项目不使用Data URI



## 开发进度

* 增加greenlight颜色值 \@import '../../../styles/_base.scss';
* 边框灰色bordergrey
* 去除了按钮的边框和点击效果。

## 特性
* [react](https://github.com/facebook/react)
* [redux](https://github.com/rackt/redux)
* [react-router](https://github.com/rackt/react-router)
* [react-router-redux](https://github.com/rackt/react-router-redux)
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [express](https://github.com/expressjs/express)
* [karma](https://github.com/karma-runner/karma)
* [eslint](http://eslint.org) //ESLint是一个QA工具，用来避免低级错误和统一代码的风格



## 项目开发中的问题

 * 由于采用了单页面应用，以往从格子向下跳转时所传递的链接不能使用，主要是.html不能识别。
 * 为了适应测试环境将package.json中script修改，将better-npm-run的配置改成npm的配置
 * 用来删除测试时生成的文档运行npm run cleancoverage即刻删除coverage包 
