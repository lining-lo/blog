<template>
    我是友链
    <div class="water-flow-container">
  <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg">
    <!-- 第一层波浪：主波 -->
    <path id="wave1" d="M0,50 Q250,0 500,50 T1000,50" fill="none" stroke="#4A90E2" stroke-width="3" opacity="0.6" />
    
    <!-- 第二层波浪：反向波，错开位置 -->
    <path id="wave2" d="M0,50 Q250,100 500,50 T1000,50" fill="none" stroke="#4A90E2" stroke-width="3" opacity="0.4" />
    
    <!-- 第三层波浪：更细密的波 -->
    <path id="wave3" d="M0,50 Q125,0 250,50 T500,50 T750,50 T1000,50" fill="none" stroke="#2979FF" stroke-width="2" opacity="0.3" />
    
    <!-- 第四层波浪：最上层的细波 -->
    <path id="wave4" d="M0,50 Q125,100 250,50 T500,50 T750,50 T1000,50" fill="none" stroke="#2979FF" stroke-width="2" opacity="0.2" />
  </svg>
</div>
</template>

<script setup lang='ts'>

</script>
<style lang='less' scoped>
.water-flow-container {
  width: 100%;
  height: 100px;
  position: relative;
  overflow: hidden;
}

/* 波浪动画定义 */
@keyframes wave-flow {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

/* 每条波浪应用不同的动画参数 */
#wave1 {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: wave-flow 15s linear infinite;
}

#wave2 {
  stroke-dasharray: 1000;
  stroke-dashoffset: 500;
  animation: wave-flow 20s linear infinite reverse; /* 反向流动 */
}

#wave3 {
  stroke-dasharray: 1000;
  stroke-dashoffset: 750;
  animation: wave-flow 10s linear infinite;
}

#wave4 {
  stroke-dasharray: 1000;
  stroke-dashoffset: 250;
  animation: wave-flow 12s linear infinite reverse;
}
</style>