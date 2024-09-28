lz发现水电脑端的98的时候一直没有代码的语法渲染功能，在98上看代码不是很舒服orz   
另一个原因是自己最近在学js, 于是就磕磕绊绊地写了一个脚本尝试解决了一下orz          

## 下载方式
如果您安装了篡改猴插件，可以戳[这里](https://greasyfork.org/zh-CN/scripts/510585-cc98-highlight)下载。若没下载的话，可以参考：[这个帖子]
(https://www.cc98.org/topic/5410676)的前半部分操作~

## 功能
CC98内代码编辑器的优化工具，可以对代码进行高亮，并且添加复制按钮。  
在98上看帖子，效果如图：  
![alt text](<屏幕截图 2024-09-28 202837.png>)
点击右上角按钮，按钮上的文字会变为"Copied!" 并复制到剪贴板中~  
## 可以自定义的部分：
### 高亮风格选择
可以通过修改`style.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/kimbie-light.min.css';`进行自定义。
`highlight.js`给的官方的`demo`在: https://highlightjs.org/demo 在这里可以选择你想要的样式并且预览。找到你喜欢的样式，记住名字，然后在 https://cdnjs.com/libraries/highlight.js/11.7.0 内可以找到cdn服务器储存的css文件，这样调用速度比在github上看快很多。
我们以我这里用的`kimbie-light.min.css`为例：
我们先在https://highlightjs.org/demo中预览，效果如图1  
之后我们进行搜索（如图2）  
点击左侧的link图标，复制对应的url: `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/kimbie-light.min.css`，放入对应的引用的位置即可~  

### 按钮样式设置  
可以在以下代码片段中根据代码的意义及注释修改~
```javascript
const copyButton = document.createElement('button');
copyButton.textContent = 'Copy'; //modify the text
copyButton.style.position = 'absolute';
copyButton.style.top = '5px';
copyButton.style.zIndex = '9999'; //ensure it's on the top
copyButton.style.backgroundColor = '#E8E8E8';  //modify RGB to change the color of the button
copyButton.style.color = '#616161';  //modify RGB to change the color of the text
copyButton.style.cursor = 'pointer';
copyButton.style.padding = '5px 10px';
copyButton.style.border = 'none';
copyButton.style.borderRadius = '3px';
```

## 未解决的问题
目前加载时还是有点卡顿，感觉是highlight.js的延时导致。本来想用动态DOM检测，但实际测试中发现highlight不知道为什么总是会卡顿……

---
<br></br>
第一次磕磕碰碰的写这种脚本，写的有点冗杂/乱七八糟，请见谅。  
代码开源在github：https://github.com/Slowist-Lee/CC98Opitimize/tree/op1-highlight 一些心路历程乱七八糟的也记在Note里面。  
欢迎PR！小白不胜感激 qwq



