# blog4 开放界面

> 将 blog3 管理模块和开放模块进行分离，并将开放模块进行 nuxt 重构以 SEO 优化

服务端渲染开放模块，管理模块单独做原生 Vue SPA，并进行打包部署使用 Nest.js 做服务器

## 几个注意的地方

1. 指令不再在全局注册，在/src/pages/Article/\_id.vue 内注册，代码如下

> 注意这里 querySelectorAll()，原来是 pre code 这里改成了 p code，

```js
import hljs from 'highlight.js';
import marked from 'marked';
export default {
    directives: {
        highlight: {
            inserted: function(el) {
                let blocks = el.querySelectorAll('p code');
                blocks.forEach(block => {
                    hljs.highlightBlock(block);
                });
            }
        }
    },
    computed: {
        compiledMarkdown: function() {
            return marked(this.articleDetails.content);
        }
    }
};
```

## 部署

不再使用 nuxt generate 进行静态资源打包

### 在本地 npm run build

打包出来的 .nuxt 文件夹，以及 nuxt.config.js, package.json，static 文件夹丢到服务器上

```cmd
npm install -production
```

### 进入到项目文件夹下

```cmd
npm run start
pm2 start npm --name "blog-front" -- run start
```

### 配置 nginx 稍后补上

### 部署 docker 稍后补上

## 优化点

1. 设置 hooks 自动拉取推送到 git 的代码然后 build 自动部署

---

## 以下属于过场环节

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
