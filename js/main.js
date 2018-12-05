var cssCode1 =
`/*
* 尊敬的面试官你好，我是 蒋海涛
* 现在我想用这个动画简历的方式
* 做个自我介绍，毕竟用其他网站模板的方式比较无聊
* 接下来就让我们开始吧,恩首先还是先设置一下动画样式
*/
* {
  transition: all 0.3s;
}

/* 调一下背景色 */
body {
  background: #eee;
}
/* 加个边框 */
#code {
  border: 1px solid #aaa;
  padding: 16px;
}

/* 旋转一个角度看看 */
#code-wrapper {
  perspective: 1000px;
}
#code {
  transform: rotateY(10deg);
}

/* 恩，再加个呼吸效果就不玩了 */
#code {
  animation: breath 0.8s infinite alternate-reverse;
}

/* 最后代码高亮一下 */
.token.comment {
  color: slategray
}
.token.selector {
  color: #690;
}
.token.property {
  color: #905;
}
.token.function {
  color: #DD4A68;
}

/* 好了,现在可以开始了,首先空出一个位置 */
#code-wrapper {
  width: 50%;
  height: 100%;
  position: fixed;
  animation: move 3s both running;
}
#code {
  transform: rotateY(-10deg);
}
`

var cssCode2 =
`
/* 调一下简历的颜色 */
#resume {
  perspective: 1000px;
  background: #b38e8e;
}
/* 让简历斜一下 */
#resume > .content {
  transform: rotateY(10deg);
}

/* 现在开始写简历的那些内容啦 */

`;

var cssCode3 =
`/* 然后使用 showdown.js 将 markdown 转换成 html */

`;

var markdownCode =
`# 自我介绍
  我叫 蒋海涛
  1994 年 4 月出生
  XXX 学校毕业
  自学前端半年
  希望应聘前端开发岗位
# 技能介绍
  熟悉 JavaScript CSS
# 项目介绍
  1. 轮播
  2. 简历
  3. 画板
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`;

function createResume(fn) {
  let resume = document.createElement('div');
  let content = document.createElement('pre');
  resume.id = 'resume';
  content.className = 'content';
  resume.appendChild(content);
  document.body.appendChild(resume);

  fn && fn.call();
}
function createMarkdownContent(markdownContent, fn) {
  console.log('create Markdown Content begin');
  let contentDom = document.querySelector('#resume > .content');
  let n = 0;
  let timeId = setInterval(()=> {
    n += 1;
    contentDom.innerHTML = markdownContent.substring(0, n);
    contentDom.scrollTop = contentDom.scrollHeight;
    if (n >= markdownContent.length) {
      window.clearInterval(timeId);
      fn && fn.call();
    }
  }, 100);
}
function convertMarkdownToHtml(markdownContent, fn) {
  let converter = new showdown.Converter();
  let html = converter.makeHtml(markdownContent);

  let markdownDom = document.createElement('div');
  markdownDom.className = 'html markdown-body';
  markdownDom.innerHTML = html;

  let markdownContainer = document.querySelector('#resume > .content');
  markdownContainer.replaceWith(markdownDom);

  fn && fn.call()
}

function createCssCode(preCssCode, nextCssCode, fn) {
  let n = 0;
  let timeId = setInterval(()=> {
    n += 1;
    styleTag.innerHTML = preCssCode + nextCssCode.substring(0, n)
    code.innerHTML = Prism.highlight(preCssCode + nextCssCode.substring(0, n), Prism.languages.css, 'css');
    code.scrollTop = code.scrollHeight;
    if (n >= nextCssCode.length) {
      window.clearInterval(timeId);
      fn && fn.call();
    }
  }, 0);
}

createCssCode('', cssCode1, function() {
  createResume(function() {
    createCssCode(cssCode1, cssCode2, function() {
      createMarkdownContent(markdownCode, function() {
        createCssCode(cssCode1 + cssCode2, cssCode3, function() {
          convertMarkdownToHtml(markdownCode, function() {
            console.log('over');
          });
        });
      });
    });
  });
});

