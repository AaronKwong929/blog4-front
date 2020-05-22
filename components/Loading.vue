<template>
    <div id="load">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
    </div>
</template>

<style lang="scss" scoped>
#load {
    background: rgba($color: #000000, $alpha: 0.7);
    position: fixed;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    overflow: visible;
    user-select: none;
    cursor: default;
    z-index: 10000;
    display: flex;
    align-items: center;
}

#load div {
    position: absolute;
    width: 20px;
    height: 36px;
    opacity: 0;
    font-family: Helvetica, Arial, sans-serif;
    animation: move 2s linear infinite;
    transform: rotate(180deg);
    color: #35c4f0;
}

#load div:nth-child(2) {
    animation-delay: 0.2s;
}
#load div:nth-child(3) {
    animation-delay: 0.4s;
}
#load div:nth-child(4) {
    animation-delay: 0.6s;
}
#load div:nth-child(5) {
    animation-delay: 0.8s;
}
#load div:nth-child(6) {
    animation-delay: 1s;
}
#load div:nth-child(7) {
    animation-delay: 1.2s;
}

@keyframes move {
    0% {
        left: 0;
        opacity: 0;
    }
    35% {
        left: 41%;
        opacity: 1;
    }
    65% {
        left: 59%;
        transform: rotate(0deg);
        opacity: 1;
    }
    100% {
        left: 100%;
        opacity: 0;
    }
}
</style>
