<template>
    <header>
        <div class="header-left">
            Aar的个人博客
        </div>
        <div class="header-right">
            <nuxt-link
                :to="item.link"
                v-for="(item, index) in headerItems"
                :key="'hi' + index"
                tag="div"
                class="header-item hover-item"
                >{{ item.title }}</nuxt-link
            >
            <div>{{ date }}</div>
        </div>
    </header>
</template>

<script>
import dateFormat from '@/utils/dateFormat'
export default {
    data() {
        return {
            headerItems: [
                {
                    link: `/`,
                    title: `首页`
                },
                {
                    link: `/archive`,
                    title: `文章列表`
                },
                {
                    link: `/classification`,
                    title: `分类 | 标签`
                },
                {
                    link: `/about`,
                    title: `关于`
                },
                {
                    link: `/update`,
                    title: `更新`
                }
            ],
            date: dateFormat(
                new Date(),
                'yyyy 年 MM 月 dd 日 hh : mm : ss'
            ),
            timeId: null
        };
    },
    methods: {
        setTimer() {
            this.timeId = setInterval(() => {
                this.date = dateFormat(
                    new Date(),
                    'yyyy 年 MM 月 dd 日 hh : mm : ss'
                );
            }, 1000);
        },
        destroyTimer() {
            if (this.timeId) {
                clearInterval(this.timeId);
            }
        }
    },
    mounted() {
        this.setTimer();
    },
    beforeDestroy() {
        this.destroyTimer();
    }
};
</script>

<style lang="scss" scoped>
header {
    height: 80px;
    width: 100%;
    margin: 0 auto;
    background: transparent;
    color: #5b5d61;
    box-shadow: 0 7px 9px -9px rgba($color: #5b5d61, $alpha: 0.8);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    & > div:first-child {
        width: 40%;
    }
    & > div:last-child {
        width: 60%;
    }
    .header-left {
        padding-left: 100px;
        font-size: 2rem;
        font-weight: 400;
        font-family: Courier, monospace;
    }
    .header-right {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        .header-item {
            cursor: pointer;
            transition: all 0.3s;
        }
        .header-item:hover {
            color: #0089A7;
            transform: scale(1.1);
            transition: all 0.3s;
        }
    }
}
.router-link-active {
    color: #0089A7;
    transform: scale(1.1);
}
.router-link-active::before,
.router-link-active::after {
    position: absolute;
}

.router-link-active::before {
    content: '\5B';
    left: -20px;
}

.router-link-active::after {
    content: '\5D';
    right: -20px;
}
</style>
