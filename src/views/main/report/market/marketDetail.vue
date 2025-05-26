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
        id="bi_iframe"
        style="width: 100%; height: 700px"
        class="content"
        :src="report?.reportUrl"
        frameborder="0"
      ></iframe>

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
        <div>
          <img src="~@/assets/img/评论@1x.png" class="myIcon" />99条评论
        </div>
      </section>
      <section class="comments">
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
            <img class="reply_left" :src="item.userImages" />
            <div class="reply_right">
              <div class="name">{{ item.userId }}</div>
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
              <el-input
                v-if="showInput && cur == item.userWordsId"
                v-model="input1"
                autosize
                maxlength="500"
                style="width: 640px; height: 36px"
                placeholder="理性发言，友善互动"
                @keyup.enter="handleClickReplyUser(item.userWordsId)"
              />
              <div
                class="reply_box"
                v-for="(item_sub, index) in item.children"
                :key="index"
              >
                <img class="reply_left" :src="item_sub.userImages" />
                <div class="reply_right">
                  <div class="name">{{ item_sub.userId }}</div>
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
                    placeholder="理性发言，友善互动"
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
import Icon from '../../dataService/cpns/icon.vue'

// // 1.注册Service Worker
// navigator.serviceWorker.register('./sw-proxy.js')

// // 2.拦截请求（sw-proxy.js）
// self.addEventListener('fetch', async (event) => {
//   const { request } = event
//   let response = await fetch(request)
//   // 3.重新构造Response
//   response = new Response(response.body, response)
//   // 4.篡改响应头
//   response.headers.delete('Content-Security-Policy')
//   response.headers.delete('X-Frame-Options')

//   event.respondWith(Promise.resolve(originalResponse))
// })
// const https = require('https')
// const querystring = require('querystring')
// const url = require('url')

// const port = 10101
// // 1.创建代理服务
// https.createServer(onRequest).listen(port)
// function onRequest(req, res) {
//   const originUrl = url.parse(req.url)
//   const qs = querystring.parse(originUrl.query)
//   const targetUrl = qs['target']
//   const target = url.parse(targetUrl)

//   const options = {
//     hostname: target.hostname,
//     port: 80,
//     path: url.format(target),
//     method: 'GET'
//   }

//   // 2.代发请求
//   const proxy = https.request(options, (_res) => {
//     // 3.修改响应头
//     const fieldsToRemove = ['x-frame-options', 'content-security-policy']
//     Object.keys(_res.headers).forEach((field) => {
//       if (!fieldsToRemove.includes(field.toLocaleLowerCase())) {
//         res.setHeader(field, _res.headers[field])
//       }
//     })
//     _res.pipe(res, {
//       end: true
//     })
//   })
//   req.pipe(proxy, {
//     end: true
//   })
// }
const isClickUp = ref(false)
const isClickDown = ref(false)
const isClickFollow = ref(false)
const thumbUpHandle = () => {
  thumbUp(report.value?.reportId).then((res) => {
    if (res && isClickUp.value == false) {
      ;(report.value as any).reportUserBehaviorSummaryResponse.thumbUp++
    } else {
      ;(report.value as any).reportUserBehaviorSummaryResponse.thumbUp--
    }
    res ? (isClickUp.value = !isClickUp.value) : ''
  })
}
const thumbDownHandle = () => {
  thumbDown(report.value?.reportId).then((res) => {
    if (res && isClickDown.value == false) {
      ;(report as any).reportUserBehaviorSummaryResponse.thumbDown.value++
    } else {
      ;(report as any).reportUserBehaviorSummaryResponse.thumbDown.value--
    }
    res ? (isClickDown.value = !isClickDown.value) : ''
  })
  // isClickDown.value = !isClickDown.value
}
const followHandle = () => {
  follow(report.value?.reportId).then((res) => {
    if (res && isClickFollow.value == false) {
      ;(report as any).reportUserBehaviorSummaryResponse.follow.value++
    } else {
      ;(report as any).reportUserBehaviorSummaryResponse.follow.value--
    }
    res ? (isClickFollow.value = !isClickFollow.value) : ''
  })
  // isClickFollow.value = !isClickFollow.value
}
const route = useRoute()
const id = ref<any>(route.params.id)
const report = ref<ViewDetailRes>()
const input = ref('')
const input1 = ref('')
const replies = ref<UserWords[]>([])
const proxyUrl = (url: any) => {
  return 'https://cors-anywhere.herokuapp.com/' + url
}
getReport(id.value as any).then((res) => {
  report.value = res
  axios.get(proxyUrl(report.value?.reportUrl)).then((res) => {
    const html = res.data.replace(/data-src/g, 'src')
    document.querySelector('#bi_iframe')?.contentDocument.write(html)
  })
})

// TODO 分页
getUserWords(1, 10, id.value as any).then((res) => {
  replies.value = res.records
})
import { ElMessage } from 'element-plus'
const handleClickReply = () => {
  if (input.value.trim() === '') return ElMessage.warning('请输入评论内容')
  userWords({
    reportId: id.value,
    userWords: input.value,
    userImages: []
  }).then((res) => {
    if (res) {
      getUserWords(1, 10, id.value as any).then((res) => {
        replies.value = res.records
      })
    }
  })
}
const handleClickReplyUser = (parentId: any) => {
  if (input1.value.trim() === '') return ElMessage.warning('请输入评论内容')
  replyUserWords({
    reportId: id.value,
    parentId: parentId,
    userWords: input1.value,
    userImages: []
  }).then((res) => {
    if (res) {
      input1.value = ''
      showInput.value = false
      getUserWords(1, 10, id.value as any).then((res) => {
        replies.value = res.records
      })
    }
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
    margin-top: 20px;
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
