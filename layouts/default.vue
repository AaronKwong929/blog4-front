<template>
    <div>
        <Header></Header>
        <el-container class="view">
            <el-main>
                <nuxt />
            </el-main>
        </el-container>
        <Footer></Footer>
    </div>
</template>

<script>
const Header = () => import('@/components/Header');
const Footer = () => import('@/components/Footer');
export default {
    components: {
        Header,
        Footer
    }
};
</script>

<style scoped>
.view {
    height: calc(100vh - 130px);
}
</style>
