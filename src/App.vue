<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import superMan from './assets/superman.gif'
  import { nextTick } from 'vue';
  import { onBeforeUnmount } from 'vue';
  import startMp3 from './assets/start.mp3'
  import one from './assets/1.mp3'
  import two from './assets/2.mp3'
  import three from './assets/3.mp3'
  import four from './assets/4.mp3'
  import endMp3 from './assets/end.mp3'

  const superManRef = ref<any>();
  const popoverRef = ref();

  const top = ref(0);
  const left = ref(0);

  const currentTaskIndex = ref(0);

  const taskList = [{
    name: '任务一',
    content: '微笑小达人，只要我们带着微笑独自走进校门，即可获得一枚奖章。许多同学，表示这简直是太简单啦。'
  }, {
    name: '任务二',
    content: '社交小达人，如果你能在一周内结交一个新的好朋友，即可获得一枚奖章，参加方式：找到你的班主任或科任老师，说出你新交到的好朋友的名字，并且两个人能相互说出对方最开心的一件事，挑战成功即可获得一枚奖章，一个人最多可获得两枚奖章。'
  }, {
    name: '任务三',
    content: '食堂小达人，当我们愉快地用餐并且安静地集队时，即可获得一枚奖章，此奖章由食堂阿姨，代餐老师，值班领导颁发。先到先得哦！'
  }, {
    name: '任务四',
    content: '分享小达人，回家后，你向你的家人分享一件发生在学校里的让你感到快乐的事，并把这个过程拍下来发班级群里，第2天，你的班主任将会为你送上专属于你的奖章。'
  }]

  function calcPosition() {
    const superManRect = superManRef.value?.getBoundingClientRect();
    top.value = superManRect?.top;
    left.value = superManRect?.left + superManRect?.width;
  }

  // 音频文件列表
const audioList = [
  startMp3,
  one,
  two,
  three,
  four,
  endMp3
];

// 当前播放音频的索引
const currentAudioIndex = ref(0);

// 是否正在播放
const isPlaying = ref(false);

// 获取当前音频的URL
const currentAudioSrc = computed(() => audioList[currentAudioIndex.value]);

const audioElement = ref();

// 播放当前音频
const playCurrent = () => {
  audioElement.value.play();
};

// 播放下一首音频
const nextAudio = () => {
  if (currentAudioIndex.value < audioList.length - 1) {
    currentAudioIndex.value++;
  } else {
    currentAudioIndex.value = 0
  }
  if (currentAudioIndex.value <= 1) {
    currentTaskIndex.value = 0
  } else if (currentAudioIndex.value <= 2) {
    currentTaskIndex.value = 1
  } else if (currentAudioIndex.value <= 3) {
    currentTaskIndex.value = 2
  } else if (currentAudioIndex.value <= 4) {
    currentTaskIndex.value = 3
  }
  playCurrent(); // 自动播放下一首
};


  onMounted(() => {
    window.addEventListener('resize', calcPosition);
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', calcPosition);
  })

  onMounted(() => {
    playCurrent();
    nextTick(() => {
      calcPosition();
    })
  })
</script>

<template>
  <div class="container">
    <audio ref="audioElement" :src="currentAudioSrc" autoplay @ended="nextAudio"></audio>
    <img class="superman" ref="superManRef" :src="superMan" height="600px" width="600px" v-drag @drag="calcPosition" />
    <div class="popover" ref="popoverRef" :style="{ left: `${left}px`, top: `${top}px` }">
      <div class="title">
        {{ taskList[currentTaskIndex].name }}
      </div>
      {{ taskList[currentTaskIndex].content }}
    </div>
  </div>
</template>

<style scoped>
  .container {
    height: 100%;
    width: 100%;
    background-image: url('./assets/bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
  }

  .superman {
    position: absolute;
    top: 50%;
    left: 23%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  .popover {
    width: 700px;
    height: 500px;
    position: absolute;
    margin: 20px auto;
    border-radius: 15px;
    font-size: 42px;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    color: #3b3777;
  }

  .title {
    font-size: 46px;
    font-weight: bold;
    margin-bottom: 20px;
  }
</style>
