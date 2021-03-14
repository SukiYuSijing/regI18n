<!--
 * @Author: your name
 * @Date: 2021-03-11 01:56:19
 * @LastEditTime: 2021-03-14 22:56:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \regI18n\README.md
-->

# regI18n

#### 使用方法

1. npm install 后，把你需要替换中文的文件夹放进 server 目录下

2. 把对应的 excel 表命名为"excelfortranslation.xlsx"，A 列是中文，B 列是英文的格式放进 server 目录下

3. 进入 server 文件夹，执行 index.js，打开 localhost:3002

4. 最后会生成 vueAfterReplace 文件夹里面是同名的替换好的文件，在没有找到翻译的中文会写入新的 excel 文件"translationLost.xlsx"里面

5. index.html 作为例子可以直接在浏览器运行，<div id="aaa"></div>里面的 innerHtml 是转换前的内容，打开控制台可以看到转换后的内容
