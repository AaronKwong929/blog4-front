<template>
    <el-container>
        <Loading v-if="loading"></Loading>
        <el-header class="header">
            <el-select
                size="small"
                v-model="searchForm.type"
                clearable
                placeholder="类型"
                class="tool-bar-item"
            >
                <el-option
                    v-for="(item, index) in typeOptions"
                    :key="`type` + index"
                    :value="item.value"
                    :label="item.label"
                ></el-option>
            </el-select>
            <el-select
                size="small"
                v-model="searchForm.tag"
                clearable
                placeholder="标签"
                class="tool-bar-item"
                ><el-option
                    v-for="(item, index) in tagOptions"
                    :key="`tag` + index"
                    :value="item.value"
                    :label="item.label"
                ></el-option
            ></el-select>
            <el-input
                size="small"
                class="tool-bar-item"
                placeholder="搜索标题或全文关键词"
                v-model="searchForm.keyword"
                clearable
                style="width: 200px;"
            ></el-input>
            <el-button
                @click.prevent.native="getArticles"
                size="small"
                type="primary"
                >搜索</el-button
            >
            <el-button @click.prevent.native="reset" size="small"
                >重置</el-button
            >
        </el-header>
        <el-main class="main">
            <div
                class="article-card"
                v-for="(item, index) in articleList"
                :key="'articleList - ' + index"
                @click="pushToArticle(item._id)"
            >
                <div class="article-title">
                    {{ item.title }}
                </div>
                <div class="article-attributes">
                    <div class="article-attributes-type" v-if="item.type">
                        <i class="el-icon-menu"></i>
                        {{ item.type | typeFormatter }}
                    </div>
                    <div class="article-attributes-tag" v-if="item.tag">
                        <i class="el-icon-collection-tag"></i>
                        {{ item.tag | tagFormatter }}
                    </div>
                </div>
                <div class="article-time">
                    <i class="el-icon-date"></i>
                    {{ item.updatedAt | dateFormatter }}
                </div>
            </div>
        </el-main>
        <el-footer class="footer">
            <el-pagination
                layout="total, prev, pager, next"
                :total="articleListCount"
                :current-page.sync="pageIndex"
                @current-change="handlePageChange"
            ></el-pagination>
        </el-footer>
    </el-container>
</template>

<script>
import dateFormat from '@/utils/dateFormat';
import Loading from '../components/Loading';
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
            searchForm: {
                type: null,
                tag: null,
                keyword: null
            },
            pageSize: 10,
            pageIndex: 1,
            articleList: [],
            articleListCount: 0,
            // 分类
            typeOptions: [
                { value: `code`, label: `编程` },
                { value: `game`, label: `游戏` },
                { value: `life`, label: `生活` }
            ],
            // 标签
            tagOptions: [
                { value: `html`, label: `HTML` },
                { value: `css`, label: `CSS` },
                { value: `js`, label: `JavaScript` },
                { value: `algo`, label: `算法` },
                { value: `vue`, label: `Vue.JS` },
                { value: `server`, label: `服务器` }
            ]
        };
    },
    methods: {
        getArticles() {
            this.loading = true;
            postFetch(getArticleIndex, {
                pageSize: 10,
                pageIndex: this.pageIndex,
                tag: this.searchForm.tag,
                type: this.searchForm.type,
                keyword: this.searchForm.keyword
            })
                .then(res => {
                    this.articleList = res.data.resultList;
                    this.articleListCount = res.data.totalCount;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        pushToArticle(id) {
            this.$router.push(`article/${id}`);
        },
        handlePageChange(val) {
            this.pageIndex = val;
            this.getArticles();
        },
        reset() {
            this.pageSize = 20;
            this.pageIndex = 1;
            this.$set(this, `searchForm`, {
                tag: null,
                type: null
            });
            this.getArticles();
        },
        dateFormatter(row, column) {
            return dateFormat(
                new Date(row[column.property]),
                'yyyy-MM-dd hh:mm:ss'
            );
        }
    },
    filters: {
        dateFormatter(value) {
            return dateFormat(new Date(value), 'yyyy-MM-dd hh:mm:ss');
        },
        tagFormatter(value) {
            if (!value) {
                return '';
            }
            switch (value) {
                case 'html':
                    value = `HTML`;
                    break;
                case 'css':
                    value = `CSS`;
                    break;
                case 'js':
                    value = `JavaScript`;
                    break;
                case 'algo':
                    value = `算法`;
                    break;
                case 'vue':
                    value = `Vue.JS`;
                    break;
                case 'server':
                    value = `服务器`;
                    break;
                default:
                    break;
            }
            return value;
        },
        typeFormatter(value) {
            if (!value) {
                return '';
            }
            switch (value) {
                case `code`:
                    value = `编程`;
                    break;
                case `game`:
                    value = `游戏`;
                    break;
                case `life`:
                    value = `生活`;
                    break;
                default:
                    break;
            }
            return value;
        }
    },
    components: {
        Loading
    }
};
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: calc(100vh - 290px);
}
.article-card {
    flex-direction: column;
    height: 120px;
    width: 45%;
}
</style>
