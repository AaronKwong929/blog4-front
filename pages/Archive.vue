<template>
    <el-container>
        <Loading v-if="loading"></Loading>
        <el-main>
            <div
                class="year-wrapper"
                v-for="(item, index) in articleGroupList"
                :key="`agl` + index"
            >
                <div class="year">
                    {{ item.desc }}
                    <el-button
                        size="text"
                        type="success"
                        @click.prevent.native="changeShowStatus(item)"
                        style="margin-left: 10px; color: gray;"
                        >{{ item.onShow ? `收起` : `展开` }}</el-button
                    >
                </div>
                <div class="year-article" v-if="item.onShow">
                    <div
                        class="article-card"
                        v-for="(article, index) in item.articleList"
                        :key="`a` + index"
                        @click="pushToArticle(article._id)"
                    >
                        <div class="article-time">
                            <i class="el-icon-date"></i>
                            {{ article.updatedAt | dateFormatter }}
                        </div>
                        <div class="article-title">
                            {{ article.title }}
                        </div>
                    </div>
                </div>
            </div>
            <el-row>
                <el-col style="text-align: center;">
                    <el-link
                        type="info"
                        @click.prevent.native="loadMore"
                        :disabled="!loadable"
                        >点击加载更多</el-link
                    >
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import dateFormat from '@/utils/dateFormat';
import Loading from '@/components/Loading';
import { postFetch } from '@/plugins/axios';
import { getArticleIndex } from '@/plugins/api';
export default {
    asyncData() {
        return postFetch(getArticleIndex, { pageIndex: 1, pageSize: 10 }).then(
            res => {
                return {
                    articleList: res.data.resultList,
                    articleListCount: res.data.totalCount
                };
            }
        );
    },
    data() {
        return {
            loading: false,
            pageIndex: 1,
            pageSize: 10,
            articleList: [],
            articleListCount: 0,
            articleGroupList: []
        };
    },
    computed: {
        loadable() {
            return this.articleListCount > this.articleList.length;
        }
    },
    methods: {
        getArticle() {
            this.loading = true;
            this.$axios
                .postFetch(this.$api.articleIndex, {
                    pageSize: 10,
                    pageIndex: this.pageIndex,
                    tag: null,
                    type: null
                })
                .then(res => {
                    this.articleList = this.articleList.concat(res.resultList);
                    this.articleListCount = res.totalCount;
                    this.getArticleGroup();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        pushToArticle(id) {
            this.$router.push(`article/${id}`);
        },
        loadMore() {
            if (this.articleListCount > this.articleList.length) {
                this.pageIndex++;
                this.getArticle();
            }
        },
        initArticleGroup() {
            let currentYear = new Date().getFullYear(),
                lastYear = currentYear - 1,
                yearList = [currentYear, lastYear];
            yearList.forEach((item, index) => {
                this.articleGroupList.push({
                    year: item,
                    desc: `${
                        index == yearList.length - 1
                            ? `${item}年及以前`
                            : `${item}年`
                    }`,
                    articleList: [],
                    onShow: true
                });
            });
        },
        getArticleGroup() {
            this.articleGroupList.forEach(item => {
                item.articleList = this.articleList.filter(article => {
                    return (
                        new Date(article.updatedAt).getFullYear() === item.year
                    );
                });
            });
        },
        changeShowStatus(item) {
            let index = this.articleGroupList.indexOf(item);
            this.$set(
                this.articleGroupList[index],
                `onShow`,
                this.articleGroupList[index].onShow == true ? false : true
            );
        },
        init() {
            this.initArticleGroup();
            this.getArticleGroup();
        }
    },
    filters: {
        dateFormatter(value) {
            return dateFormat(new Date(value), 'MM-dd hh:mm');
        }
    },
    mounted() {
        this.init();
    },
    components: {
        Loading
    }
};
</script>

<style lang="scss" scoped>
.year-wrapper {
    .year {
        font-size: 1.8rem;
        font-weight: 400;
        margin-left: 100px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
}
</style>
