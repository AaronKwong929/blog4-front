<template>
    <div class="container">
        TotalCount:{{ totalCount }} ResultList: {{ resultList }} Message:
        {{ message }}
        <button @click="getData">123</button>
        <div>
            <logo />
            <h1 class="title">
                blog4-front
            </h1>
            <h2 class="subtitle">
                blog4 front
            </h2>
            <div class="links">
                <a
                    href="https://nuxtjs.org/"
                    target="_blank"
                    class="button--green"
                >
                    Documentation
                </a>
                <a
                    href="https://github.com/nuxt/nuxt.js"
                    target="_blank"
                    class="button--grey"
                >
                    GitHub
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import { postFetch } from '@/plugins/axios';
export default {
    asyncData({
        isDev,
        route,
        store,
        env,
        params,
        query,
        req,
        res,
        redirect,
        error
    }) {
        return postFetch(`/common/article`, {
            pageIndex: 1,
            pageSize: 10
        }).then(res => {
            return {
                resultList: res.data.resultList,
                totalCount: res.data.totalCount,
                message: res.data.message
            };
        }); // 成功
    },
    data() {
        return {
            resultList: [],
            totalCount: 0,
            message: null
        };
    },
    components: {
        Logo
    },
    methods: {
        getData() {
            postFetch(`/common/article`, { pageIndex: 1, pageSize: 100 }).then(
                res => {
                    console.log(res);
                }
            );
        }
    }
};
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
        BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
