<template>
    <footer>
        <a href="http://beian.miitbeian.gov.cn" target="_blank"
            >AaronKwong 2019 - {{ currentYear }} | 粤ICP备19111987号-1</a
        >
    </footer>
</template>

<script>
export default {
    data() {
        return {
            currentYear: new Date().getFullYear()
        };
    }
};
</script>

<style lang="scss" scoped>
footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    a {
        color: #5b5d61;
    }
    a:hover {
        transition: all 0.3s;
        color: #0089a7;
    }
}
</style>
