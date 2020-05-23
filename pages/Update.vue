<template>
    <div class="time-line">
        <Loading v-if="loading"></Loading>
        <div
            class="time-line-item"
            :class="{ left: index % 2 === 0, right: index % 2 !== 0 }"
            v-for="(item, index) in logs"
            :key="'log' + index"
        >
            <div class="time">
                {{ item.timestamp }}
            </div>
            <div class="title">
                {{ item.title }}
            </div>
            <ul class="content">
                <li v-for="(tag, index) in item.contents" :key="'c' + index">
                    {{ tag }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading';
export default {
    data() {
        return {
            loading: true,
            logs: [
                {
                    title: `V4.1.0`,
                    contents: [`部署到 Docker`],
                    timestamp: `2020-6-1`,
                },
                {
                    title: `V4.0.0`,
                    contents: [`开放模块和管理模块分离部署`, `后端使用 Nest.js 重构完成`, `前端使用 Nuxt.js 重构完成`],
                    timestamp: `2020-5-23`,
                },
                {
                    title: `V3.9.3`,
                    contents: [`对外和管理样式分离`, `首页和时间线页再重写`],
                    timestamp: `2020-04-12`,
                },
                {
                    title: `V3.9.2`,
                    contents: ['样式去后台化完成', '前台展示页重写完成'],
                    timestamp: '2020-02-02',
                },
                {
                    title: `V3.9.1`,
                    contents: [
                        'Element-UI搭载基本完成',
                        '前台展示重构减少公式化',
                    ],
                    timestamp: '2020-01-29',
                },
                {
                    title: 'V3.8.0',
                    contents: ['Element-UI 重写侧栏/静态页'],
                    timestamp: '2019-12-01',
                },
                {
                    title: 'V3.7.0',
                    contents: ['图片上传和返回', '标签排序', '后端分页器'],
                    timestamp: '2019-11-07',
                },
                {
                    title: 'V3.6.0',
                    contents: ['Markdown编辑器样式更新，新增tool-bar'],
                    timestamp: '2019-10-17',
                },
                {
                    title: 'V3.5.0',
                    contents: ['首页UI更改', '轮播图实现'],
                    timestamp: '2019-10-12',
                },
                {
                    title: 'V3.4.0',
                    contents: ['评论区上线', '目体积优化'],
                    timestamp: '2019-09-30',
                },
                {
                    title: 'V3.3.0',
                    contents: [
                        '增加搜索系统',
                        '搜索相关结果高亮',
                        '前端分页器',
                    ],
                    timestamp: '2019-09-08',
                },
                {
                    title: 'V3.2.0',
                    contents: [
                        '时间格式化更新（Linux和Win下格式保持一致）',
                        '各种交互操作完全整合到vuex.actions',
                    ],
                    timestamp: '2019-08-28',
                },
                {
                    title: 'V3.1.0',
                    contents: ['登陆持久化', '新增开发日志页面'],
                    timestamp: '2019-08-26',
                },
                {
                    title: 'V3.0.0',
                    contents: [`部署上线`],
                    timestamp: '2019-08-23',
                },
            ],
        };
    },
    methods: {
        init() {
            setTimeout(() => {
                this.loading = false;
            }, 1500);
        },
    },
    mounted() {
        this.init();
    },
    components: {
        Loading,
    },
};
</script>
<style lang="scss" scoped>
.time-line {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-item {
        min-height: 100px;
        width: 400px;
        position: relative;
        background-color: white;
        border-radius: 15px;
        margin: 20px 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 10px;
        .time {
            font-size: 0.9rem;
            font-weight: 300;
        }
        .title {
            font-weight: 400;
            font-size: 1.1rem;
        }
        .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-weight: 300;
        }
    }
    .left {
        margin-left: -400px;
    }
    .left::after {
        position: absolute;
        top: 50%;
        right: -20px;
        margin-top: -20px;
        content: '';
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 10000px;
        background-color: white;
    }
    .right {
        margin-left: 400px;
    }
    .right::after {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
        content: '';
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 10000px;
        background-color: white;
    }
}
</style>
