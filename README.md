# regI18n

#### 使用方法

1. npm install后，把你需要替换中文的文件夹放进server目录下

2. 把对应的excel表命名为"excelfortranslation.xlsx"，A列是中文，B列是英文的格式放进server目录下

3. 执行index.js，打开localhost:3002

4. 最后会生成vueAfterReplace文件夹里面是同名的替换好的文件，在没有找到翻译的中文会写入新的excel文件"translationLost.xlsx"里面