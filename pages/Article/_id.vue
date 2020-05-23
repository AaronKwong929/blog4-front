<template>
    <div
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
    >
        <el-container v-if="articleDetails.title">
            <el-main style="padding: 0;">
                <div class="header-background">
                    <el-page-header
                        @back="goBack"
                        content="文章详情"
                        class="page-header"
                    ></el-page-header>
                    <div class="header-title">
                        {{ articleDetails.title }}
                    </div>
                    <div class="header-other">
                        <div class="header-time">
                            {{ updatedAt }}
                        </div>
                        <div class="header-type">
                            {{ type }}
                        </div>
                        <div class="header-tag">{{ tag }}</div>
                        <div class="header-comment">
                            <el-button
                                size="small"
                                type="primary"
                                @click.prevent.native="getComments"
                                >查看评论</el-button
                            >
                        </div>
                    </div>
                </div>
                <div class="article-content-wrapper">
                    <div
                        v-if="articleDetails.content"
                        class="article-content"
                        v-html="compiledMarkdown"
                        v-highlight
                    ></div>
                </div>
            </el-main>
        </el-container>
        <div id="error" v-else>
            <div class="title">404</div>
            <div class="details">
                ╮( •́ω•̀ )╭ 这篇文章暂时不可以观看~
            </div>
            <div class="button1">
                <el-button
                    size="small"
                    type="primary"
                    @click.prevent.native="goBack"
                    >返回上级</el-button
                >
            </div>
        </div>
        <el-dialog
            title="文章评论"
            :visible.sync="commentDialog"
            :append-to-body="true"
            :lock-scroll="true"
            :close-on-click-modal="false"
            width="70%"
        >
            <div class="pagination">
                <el-button
                    size="small"
                    type="primary"
                    @click.prevent.native="pageChange(1)"
                    >上一页</el-button
                >
                <el-button
                    size="small"
                    type="primary"
                    @click.prevent.native="pageChange(2)"
                    >下一页</el-button
                >
            </div>
            <div class="comment-wrapper">
                <el-card
                    shadow="always"
                    v-for="(item, index) in commentList"
                    :key="'cl' + index"
                    style="margin: 10px 0;"
                >
                    <div slot="header" class="comment-item-header">
                        <div>{{ item.user }}</div>
                        <div>{{ item.updatedAt | dateFormat }}</div>
                    </div>
                    <div>
                        {{ item.content }}
                    </div>
                </el-card>
            </div>
            <div class="comment-footer">
                <el-form
                    :model="commentForm"
                    :rules="commentFormRules"
                    size="small"
                    ref="commentForm"
                >
                    <el-row :gutter="20">
                        <el-col :span="14">
                            <el-form-item prop="content">
                                <el-input
                                    v-model="commentForm.content"
                                    clearable
                                    placeholder="输入评论"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="user">
                                <el-input
                                    v-model="commentForm.user"
                                    clearable
                                    placeholder="评论人"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-button
                                size="small"
                                type="primary"
                                @click.prevent.native="sendComment"
                                >发送</el-button
                            >
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import marked from 'marked';
import dateFormat from '@/utils/dateFormat';
import hljs from 'highlight.js';
import { getFetch, putFetch, postFetch } from '@/plugins/axios';
import { getComment, sendComment, getArticleDetails } from '@/plugins/api';
export default {
    asyncData({ params }) {
        return getFetch(getArticleDetails, { id: params.id }).then(res => {
            return {
                articleDetails: res.data.article
            };
        });
    },
    data() {
        return {
            fullScreenLoading: false,
            articleDetails: {},
            commentDialog: false,
            commentList: [],
            commentListCount: 0,
            commentPageIndex: 1,
            commentForm: {
                user: null,
                content: null
            },
            commentFormRules: {
                user: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '评论内容不可为空'
                    }
                ],
                content: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '评论人不可为空'
                    }
                ]
            }
        };
    },
    methods: {
        goBack() {
            return this.$router.go(-1);
        },
        getComments() {
            this.fullScreenLoading = true;
            postFetch(getComment, {
                articleId: this.articleDetails._id,
                pageIndex: this.commentPageIndex,
                pageSize: 5
            })
                .then(res => {
                    this.commentList = res.data.resultList;
                    this.commentListCount = res.data.totalCount;
                    this.commentDialog = true;
                })
                .finally(() => {
                    this.fullScreenLoading = false;
                });
        },
        pageChange(num) {
            switch (num) {
                case 1:
                    if (this.commentPageIndex > 1) {
                        this.commentPageIndex--;
                        this.getComments();
                    }
                    break;
                case 2:
                    this.commentPageIndex++;
                    this.getComments();
                    break;
                default:
                    break;
            }
        },
        sendComment() {
            this.$refs['commentForm'].validate(valid => {
                if (valid) {
                    this.fullScreenLoading = true;
                    putFetch(sendComment, {
                        articleId: this.articleDetails._id,
                        content: this.commentForm.content,
                        user: this.commentForm.user
                    })
                        .then(() => {
                            this.$message.success(`发送评论成功`);
                            this.getComments();
                        })
                        .finally(() => {
                            this.fullScreenLoading = false;
                            this.$refs['commentForm'].resetFields();
                        });
                } else {
                    this.$message.warning(`请输入完整评论内容`);
                }
            });
        }
    },
    filters: {
        dateFormat(value) {
            return dateFormat(new Date(value), 'yyyy-MM-dd hh:mm');
        }
    },
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
        updatedAt() {
            return dateFormat(
                new Date(this.articleDetails.updatedAt),
                'yyyy-MM-dd hh:mm:ss'
            );
        },
        tag() {
            switch (this.articleDetails.tag) {
                case 'html':
                    return 'HTML';
                case 'css':
                    return 'CSS';
                case 'js':
                    return 'JavaScript';
                case 'algo':
                    return '算法';
                case 'vue':
                    return 'Vue.JS';
                case 'server':
                    return '服务器';
                default:
                    break;
            }
            return '';
        },
        type() {
            switch (this.articleDetails.type) {
                case 'code':
                    return '编程';
                case 'life':
                    return '生活';
                case 'game':
                    return '游戏';
                default:
                    break;
            }
            return '';
        },
        compiledMarkdown: function() {
            return marked(this.articleDetails.content);
        }
    }
};
</script>

<style lang="scss" scoped>
.header-background {
    background: linear-gradient(
        225deg,
        rgba($color: #00d090, $alpha: 0.1),
        rgba($color: #00d090, $alpha: 1)
    );
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    .header-title {
        color: rgba(255, 255, 255, 0.801);
        letter-spacing: 6px;
        font: {
            size: 64px;
            weight: bold;
        }
        margin: 32px;
    }
    .header-other {
        display: flex;
        flex-direction: row;
        .header-time {
            color: rgba(255, 255, 255, 0.801);
            margin: 0 32px;
            font-size: 22px;
            font-weight: 300;
        }
        .header-type {
            color: rgba(255, 255, 255, 0.801);
            margin: 0 16px;
            font-size: 22px;
            font-weight: 300;
        }
        .header-tag {
            color: rgba(255, 255, 255, 0.801);
            margin: 0 16px;
            font-size: 22px;
            font-weight: 300;
        }
    }
}

.page-header {
    padding: 16px 0 0 16px;
    color: rgba(255, 255, 255, 0.801);
}
/deep/ .el-page-header__content {
    color: rgba(255, 255, 255, 0.801);
}

.article-content-wrapper {
    width: 70%;
    margin: 0 auto;
    min-height: 500px;
    .article-content {
        padding: 48px;
    }
}
.pagination {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}
.comment-footer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.comment-item-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
#error {
    padding-top: 180px;
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
    color: rgb(96, 126, 121);
    user-select: none;
    .title {
        font-family: 'Georgia';
        font-weight: 600;
        font-size: 10rem;
        width: 30rem;
        margin: 0 auto;
    }
    .details {
        font-size: 2rem;
        font-weight: 400;
        box-shadow: 0 0.5rem 0.5rem -0.5rem #aaa;
        margin: 0 auto;
        padding-top: 3rem;
    }
    .button1 {
        margin-top: 20px;
    }
}
</style>
