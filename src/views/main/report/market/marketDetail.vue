<template>
  <div class="marketDetail">
    <section class="content">
      <div class="header">
        <div class="left">
          {{ report?.reportTitle }}
        </div>
        <div class="right">
          <el-button class="btn">
            <div class="center">
              <el-icon><Download /></el-icon>下载报告
            </div>
          </el-button>
        </div>
      </div>
      <div class="desc">
        <div>发布时间：{{ report?.createTime }}</div>
        <div>{{ report?.platform }}</div>
        <div>{{ report?.reportTag }}</div>
        <div>{{ report?.reportCategory }}</div>
        <div>{{ report?.reportType }}</div>
      </div>
      <iframe
        v-if="report?.reportUrl"
        id="wx_iframe"
        style="width: 100%; height: 700px"
        class="content"
        src=""
        frameborder="0"
      ></iframe>
      <img v-else style="width: 100%; height: 700px" />
      <div class="footer">
        <div class="left">此报告还剩88页，如需下载请订阅。</div>
        <div class="right">
          <el-button class="btn"
            ><img src="~img/diamond-icon.png" alt="" />订阅服务</el-button
          >
        </div>
      </div>
      <section class="operation">
        <div>
          <img
            v-if="isClickUp"
            src="~@/assets/img/点赞-选中@1x.png"
            class="myIcon"
            @click="thumbUpHandle"
          />
          <img
            v-else
            src="~@/assets/img/点赞@1x.png"
            class="myIcon"
            @click="thumbUpHandle"
          />
          赞&nbsp;{{ report?.reportUserBehaviorSummaryResponse.thumbUp }}
        </div>
        <div>
          <img
            v-if="isClickDown"
            src="~@/assets/img/踩-选中@1x.png"
            class="myIcon"
            @click="thumbDownHandle"
          />
          <img
            v-else
            src="~@/assets/img/踩@1x.png"
            class="myIcon"
            @click="thumbDownHandle"
          />
          踩&nbsp;{{ report?.reportUserBehaviorSummaryResponse.thumbDown }}
        </div>
        <div>
          <img
            v-if="isClickFollow"
            src="~@/assets/img/关注-选中@1x.png"
            class="myIcon"
            @click="followHandle"
          />
          <img
            v-else
            src="~@/assets/img/关注@1x.png"
            class="myIcon"
            @click="followHandle"
          />
          收藏&nbsp;{{ report?.reportUserBehaviorSummaryResponse.follow }}
        </div>
        <div @click="handleToReply">
          <img src="~@/assets/img/评论@1x.png" class="myIcon" />{{
            replyNum
          }}条评论
        </div>
      </section>
      <section class="comments" ref="replyRef">
        <div class="title">
          <el-input
            v-model="input"
            style="width: 840px; height: 36px"
            placeholder="理性发言，友善互动"
            maxlength="500"
          />
          <el-button class="btn" @click="handleClickReply">发布评论</el-button>
        </div>
        <div class="reply">
          <div class="reply_box" v-for="(item, index) in replies" :key="index">
            <img class="reply_left" :src="item.userAvatarUrl" />
            <div class="reply_right">
              <div class="name">
                {{ item.userNickName || `用户${item.userId}` }}
              </div>
              <div class="desc">{{ item.userWords }}</div>
              <div class="hint">{{ item.updateTime }}</div>
              <div
                class="hint center"
                style="cursor: pointer; width: fit-content"
                @click="handleClickReply1(item.userWordsId)"
              >
                <img src="~@/assets/img/评论@1x.png" style="width: 15px" />
                <span v-if="cur !== item.userWordsId">回复</span>
                <span v-else>取消回复</span>
              </div>
              <!-- <div class="flex"> -->
              <el-input
                v-if="showInput && cur == item.userWordsId"
                v-model="input1"
                autosize
                maxlength="500"
                style="width: 640px; height: 36px"
                placeholder="理性发言，友善互动，按Enter回复"
                @keyup.enter="handleClickReplyUser(item.userWordsId)"
              />
              <!-- <el-button
                  style="width: 80px !important; height: 35px"
                  class="btn"
                  @click="handleClickReply"
                  >回复</el-button
                > -->
              <!-- </div> -->

              <div
                class="reply_box"
                v-for="(item_sub, index) in item.children"
                :key="index"
              >
                <img class="reply_left" :src="item_sub.userAvatarUrl" />
                <div class="reply_right">
                  <div class="name">
                    {{ item_sub.userNickName || `用户${item_sub.userId}` }}
                  </div>
                  <div class="desc">{{ item_sub.userWords }}</div>
                  <div class="hint">{{ item_sub.updateTime }}</div>
                  <div
                    class="hint center"
                    style="cursor: pointer; width: fit-content"
                    @click="handleClickReply1(item_sub.userWordsId)"
                  >
                    <img src="~@/assets/img/评论@1x.png" style="width: 15px" />
                    <span v-if="cur !== item_sub.userWordsId">回复</span>
                    <span v-else>取消回复</span>
                  </div>
                  <el-input
                    v-if="showInput && cur == item_sub.userWordsId"
                    v-model="input1"
                    autosize
                    maxlength="500"
                    style="width: 640px; height: 36px"
                    placeholder="理性发言，友善互动，按Enter回复"
                    @keyup.enter="handleClickReplyUser(item_sub.userWordsId)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>

    <section class="aside">
      <div class="header">相关推荐</div>
      <div class="content">
        <div class="content-box" v-for="i of new Array(6)" :key="i">
          <div class="title" @click="turnToDetail(i)">
            2025
            中国新能源汽车行业深度中国新能源汽车行业中国新能源汽车行业深度深度
            研究报告
          </div>
          <div class="content">
            <div>2025-01-15</div>
            <div class="center">
              <el-icon><Star /></el-icon>2,456
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import {
  getReport,
  thumbUp,
  thumbDown,
  follow,
  replyUserWords,
  userWords,
  getSubUserWords,
  getUserWords
} from '@/service/request/report'
import { useRoute } from 'vue-router'
import {
  GetUserWordsRes,
  UserWords,
  ViewDetailRes
} from '@/service/request/report/type'

const isClickUp = ref(false)
const isClickDown = ref(false)
const isClickFollow = ref(false)
const route = useRoute()
const id = ref<any>(route.params.id)
const report = ref<ViewDetailRes>()
const input = ref('')
const input1 = ref('')
const replies = ref<UserWords[]>([])
const thumbUpHandle = () => {
  thumbUp(report.value?.reportId).then((res) => {
    if (res && isClickUp.value == false) {
      ;(report.value as any).reportUserBehaviorSummaryResponse.thumbUp++
    } else if (res && isClickUp.value == true) {
      ;(report.value as any).reportUserBehaviorSummaryResponse.thumbUp--
    }
    res ? (isClickUp.value = !isClickUp.value) : ''
  })
}
const thumbDownHandle = () => {
  thumbDown(report.value?.reportId).then((res) => {
    if (res && isClickDown.value == false) {
      ;(report.value as any).reportUserBehaviorSummaryResponse.thumbDown++
    } else if (res && isClickDown.value == true) {
      ;(report.value as any).reportUserBehaviorSummaryResponse.thumbDown--
    }
    res ? (isClickDown.value = !isClickDown.value) : ''
  })
}
const followHandle = () => {
  follow(report.value?.reportId).then((res) => {
    if (res && isClickFollow.value == false) {
      ;(report.value as any).reportUserBehaviorSummaryResponse.follow++
    } else if (res && isClickFollow.value == true) {
      ;(report.value as any).reportUserBehaviorSummaryResponse.follow--
    }
    res ? (isClickFollow.value = !isClickFollow.value) : ''
  })
}
const replyRef = ref()
const handleToReply = () => {
  replyRef.value.scrollIntoView({
    behavior: 'smooth', // 平滑过渡
    block: 'start' // 上边框与视窗顶部平齐。默认值
  })
}
import { BASE_DOMAIN } from '@/service/request/config'

const mapper: any = {
  'https://mp.weixin.qq.com': 'wx',
  'https://mmbiz.qpic.cn': 'wxImg',
  'http://mmbiz.qpic.cn': 'wxImg',
  'http://mp.weixin.qq.com': 'wx'
}

function proxyUrl(url: string) {
  let redirectURL = ''
  for (var key in mapper) {
    if (url.startsWith(key)) {
      redirectURL = BASE_DOMAIN + mapper[key] + url.slice(key.length)
    }
  }
  return redirectURL
}

getReport(id.value as any).then((res) => {
  report.value = res
  axios.get(proxyUrl(report.value?.reportUrl)).then((res) => {
    const html = res.data
      .replace(/data-src/g, 'src')
      .replace(
        /background-image: url\(&quot;(http[^&]+)/g,
        (s: any, g: any) => `background-image: url(&quot;${proxyUrl(g)}`
      )
      .replace(
        /<meta\s+name="referrer"\s+content="[^"]+"/g,
        '<meta name="referrer" content="never"'
      )

    let backgroundUrlReg = /url[(]&quot;(\S*)&quot;/g
    let backgroundImgs = html.match(backgroundUrlReg)
    if (backgroundImgs && backgroundImgs.length) {
      backgroundImgs.forEach((item: string) => {
        let url = item.replace(/url[(]&quot;/g, '').replace(/&quot;/g, '')
        let img = document.createElement('img')
        img.src = url
        doc.querySelector('body').appendChild(img)
        //通过对生成一个无效的img进行赋值，使这个路径能够绕过检测，这样背景图片也能够正常展示了
      })
    }

    const doc =
      document.querySelector('#wx_iframe')?.contentDocument ||
      document.querySelector('#wx_iframe')?.contentWindow.document
    doc.write(html)
    // doc.write('<h1>旧的不去，新的不来！</h1>')
  })
})

const replyNum = ref(0)
// TODO 分页
getUserWords(1, 10, id.value as any).then((res) => {
  replies.value = res.records
  replyNum.value = res.total
})
import { ElMessage } from 'element-plus'
const handleClickReply = () => {
  if (input.value.trim() === '') return ElMessage.warning('请输入评论内容')
  userWords({
    reportId: id.value,
    userWords: input.value,
    userImages: []
  })
    .then((res) => {
      ElMessage.success('评论成功')
      input.value = ''
      if (res) {
        getUserWords(1, 10, id.value as any).then((res) => {
          replies.value = res.records
        })
      }
    })
    .catch((err) => {
      ElMessage.error(err.message)
    })
}
const handleClickReplyUser = (parentId: any) => {
  if (input1.value.trim() === '') return ElMessage.warning('请输入评论内容')
  replyUserWords({
    reportId: id.value,
    parentId: parentId,
    userWords: input1.value,
    userImages: []
  })
    .then((res) => {
      if (res) {
        ElMessage.success('回复成功')

        input1.value = ''
        cur.value = ''
        showInput.value = false
        getUserWords(1, 10, id.value as any).then((res) => {
          replies.value = res.records
        })
      }
    })
    .catch((err) => {
      ElMessage.error(err.message)
    })
}
const showInput = ref(false)
const cur = ref<any>()
const handleClickReply1 = (id: number) => {
  if (cur.value === id) {
    showInput.value = false
    input1.value = ''
    cur.value = ''
  } else {
    cur.value = id
    showInput.value = true
  }
}
const turnToDetail = (i: any) => {
  console.log(i)
}
</script>

<style scoped lang="less">
.marketDetail {
  display: flex;
  width: 100%;
  padding: 15px 40px;
  overflow: hidden;
  .center {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .content {
    width: 900px;
    // height: 1000px;
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    .header {
      width: 100%;
      height: 40px;
      margin: 20px 0;
      .left {
        float: left;
      }
      .right {
        display: flex;
        gap: 15px;
        float: right;
        .el-button {
          width: 110px;
          height: 40px;
          border-radius: 4px;
          font-size: 14px;
        }
      }
    }
    .desc {
      display: flex;
      gap: 30px;
      margin: 20px 0;
      color: #6b7280;
      font-size: 14px;
      font-weight: normal;

      div {
        font-size: 14px;
      }
    }
    .content {
      width: 100%;
      height: auto;
      width: 100%;
      object-fit: cover;
    }
    .footer {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 20px;
      padding-right: 10px;
      box-shadow: 0px -4px 10px 0px rgba(0, 0, 0, 0.3);
      border: 1px solid var(--border-color);
      .left {
        font-size: 14px;
        color: #6b7280;
        font-weight: normal;
      }
      .right {
        .btn {
          width: 110px;
          height: 40px;
          img {
            width: 16px;
            height: 16px;
            position: relative;
            right: 5px;
          }
        }
      }
    }
  }

  .operation {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 80px;
    font-size: 16px;
    font-weight: normal;
    .myIcon {
      width: 20px;
      vertical-align: text-bottom;
      cursor: pointer;
      margin-right: 7px;
    }
    div {
    }
  }
  .comments {
    width: 100%;
    // margin-top: 20px;
    // padding: 20 0px;
    .title {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      .btn {
        width: 88px !important;
        height: 36px;
      }
    }
    .reply {
      margin-top: 10px;
      display: flex;
      flex-direction: column;

      .reply_box {
        margin-top: 10px;
        display: flex;
        .reply_left {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin-right: 10px;
        }
        .reply_right {
          width: 90%;
          display: flex;
          flex-direction: column;
          text-align: left;

          .name {
            font-size: 16px;
            color: #000000;
            font-weight: bold;
          }
          .desc {
            font-size: 16px;
            line-height: 24px;
            color: #1f2937;
            margin: 0;
          }
          .hint {
            font-weight: normal;
            font-size: 14px;
            color: #6b7280;
          }
        }
      }
    }
  }
  .aside {
    position: relative;
    left: 100px;
    width: 300px;
    height: 100%;
    padding: 20px;
    text-align: start;
    .header {
      font-size: 18px;
      font-weight: bolder;
      margin-bottom: 50px;
    }
    .content {
      width: 100%;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 30px;
      .content-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: start;
        width: 100%;
        .title {
          width: 100%;
          height: 48px;
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          line-clamp: 2;
          box-orient: vertical;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 1.4;
          color: #000;
          font-weight: normal;
          cursor: pointer;
        }
        .content {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          font-size: 14px;
          padding: 0;
          div {
            color: #6b7280;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
