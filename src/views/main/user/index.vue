<template>
  <div class="page-bg">
    <el-container class="common-layout">
      <el-aside width="160px">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-menu-item
            v-for="(item, index) in arr"
            :key="index"
            :index="index"
            @click="handleClick(item.index)"
          >
            <!-- <el-icon><setting /></el-icon> -->
            <img :src="currIndex == index + 1 ? item.iconAT : item.icon" />
            <span>{{ item.label }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <section v-if="currIndex == 1" class="VIP">
          <div class="header" :class="{ isVIP: isVIP }">
            <img src="@/assets/img/detail.png" alt="" />
            <div class="flex-col">
              <div class="name">
                果果汤
                <img
                  v-show="isVIP"
                  src="@/assets/img/icon/VIP.png"
                  class="VIPIcon"
                />
              </div>
              <div class="desc">{{ VIPDesc }}</div>
            </div>
          </div>
          <div class="center">
            <div class="box isActive">
              <div class="top flex-col">
                <div class="name">体验版</div>
                <div class="desc">1000 算力</div>
                <div class="money"><span class="amount">39</span>元/月</div>
              </div>
              <div class="bottom">
                <div class="title">权益</div>
                <div class="content_item">
                  <div>权益时效</div>
                  <div>XXXX</div>
                </div>
                <div class="content_item">
                  <div>发现报告</div>
                  <div>XXXX</div>
                </div>
                <div class="content_item">
                  <div>文本文本</div>
                  <div>XXXX</div>
                </div>
              </div>
            </div>
            <div class="box">
              <div class="top flex-col">
                <div class="name">体验版</div>
                <div class="desc">1000 算力</div>
                <div class="money"><span class="amount">39</span>元/月</div>
              </div>
              <div class="bottom">
                <div class="title">权益</div>
                <div class="content_item">
                  <div>权益时效</div>
                  <div>XXXX</div>
                </div>
                <div class="content_item">
                  <div>发现报告</div>
                  <div>XXXX</div>
                </div>
                <div class="content_item">
                  <div>文本文本</div>
                  <div>XXXX</div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="pay"></div>
          </div>
        </section>
        <section v-if="currIndex == 2">
          <div class="header">个人信息</div>
          <div class="content">
            <div class="info">
              <div style="height: 80px" class="box">
                <div class="left">头像</div>
                <div class="center">
                  <img src="~img/Frame.png" alt="" />
                </div>
                <div class="right"></div>
              </div>
              <div class="box">
                <div class="left">昵称</div>
                <div class="center">{{ userInfo.nick }}</div>
                <div @click="changeNick" class="right">修改</div>
              </div>
              <div class="box">
                <div class="left">账号ID</div>
                <div class="center">{{ userInfo.id }}</div>
                <div @click="copyToClipboard(userInfo.id)" class="right">
                  复制
                </div>
              </div>
              <div class="box">
                <div class="left">绑定微信</div>
                <div class="center">{{ userInfo.wx }}</div>
                <div class="right" @click="changeWx">更换</div>
              </div>
              <div class="box">
                <div class="left">手机号码</div>
                <div class="center">{{ userInfo.phone }}</div>
                <div class="right" @click="changePhone">更换</div>
              </div>
              <div class="box">
                <div class="left">邮箱</div>
                <div class="center">{{ userInfo.email }}</div>
                <div class="right" @click="changeEmail">更换</div>
              </div>
            </div>
          </div>
        </section>
        <section v-else-if="currIndex == 3" class="order">
          <el-tabs v-model="activeName" class="demo-tabs" type="">
            <el-tab-pane label="我的订单" name="first">
              <div class="box_order">
                <div class="top_order">
                  <p>订单编号&nbsp;&nbsp;1740560641913237733258</p>
                  <p>下单时间&nbsp;&nbsp;2025-06-02 10:00</p>
                </div>
                <el-descriptions
                  direction="vertical"
                  :column="5"
                  border
                  style="text-align: center"
                >
                  <el-descriptions-item label="订单类型" align="center"
                    >算力购买</el-descriptions-item
                  >
                  <el-descriptions-item label="算力数量" align="center"
                    >1000算力</el-descriptions-item
                  >
                  <el-descriptions-item label="生效时间" align="center"
                    >2025-06-02 10:00</el-descriptions-item
                  >
                  <el-descriptions-item label="到期时间" align="center">
                    <el-tag size="small">2025-07-02 10:00</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="订单金额" align="center">
                    <el-tag size="small">¥ 29.9</el-tag>
                  </el-descriptions-item>
                </el-descriptions>
              </div>
              <!-- <el-divider /> -->
              <div class="box_order">
                <div class="top_order">
                  <p>订单编号&nbsp;&nbsp;1740560641913237733258</p>
                  <p>下单时间&nbsp;&nbsp;2025-06-02 10:00</p>
                </div>
                <el-descriptions
                  direction="vertical"
                  :column="5"
                  border
                  style="text-align: center"
                >
                  <el-descriptions-item label="订单类型" align="center"
                    >算力购买</el-descriptions-item
                  >
                  <el-descriptions-item label="算力数量" align="center"
                    >1000算力</el-descriptions-item
                  >
                  <el-descriptions-item label="生效时间" align="center"
                    >2025-06-02 10:00</el-descriptions-item
                  >
                  <el-descriptions-item label="到期时间" align="center">
                    <el-tag size="small">2025-07-02 10:00</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="订单金额" align="center">
                    <el-tag size="small">¥ 29.9</el-tag>
                  </el-descriptions-item>
                </el-descriptions>
              </div>
              <div class="box_order">
                <div class="top_order">
                  <p>订单编号&nbsp;&nbsp;1740560641913237733258</p>
                  <p>下单时间&nbsp;&nbsp;2025-06-02 10:00</p>
                </div>
                <el-descriptions
                  direction="vertical"
                  :column="5"
                  border
                  style="text-align: center"
                >
                  <el-descriptions-item label="订单类型" align="center"
                    >算力购买</el-descriptions-item
                  >
                  <el-descriptions-item label="算力数量" align="center"
                    >1000算力</el-descriptions-item
                  >
                  <el-descriptions-item label="生效时间" align="center"
                    >2025-06-02 10:00</el-descriptions-item
                  >
                  <el-descriptions-item label="到期时间" align="center">
                    <el-tag size="small">2025-07-02 10:00</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="订单金额" align="center">
                    <el-tag size="small">¥ 29.9</el-tag>
                  </el-descriptions-item>
                </el-descriptions>
                <el-pagination
                  class="pagination"
                  :page-size="3"
                  layout="total, prev, pager, next,jumper"
                  :total="100"
                  v-model:current-page="currentPage"
                  @current-change="handleCurrentChange"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="积分明细" name="second">
              <el-table
                :data="tableData"
                style="width: 100%"
                :header-cell-style="{ background: '#f4f6f8', color: '#6B7280' }"
              >
                <el-table-column
                  prop="type"
                  label="订阅类型"
                  width="90"
                  align="center"
                />
                <el-table-column
                  prop="keywords"
                  label="订阅关键词"
                  align="center"
                />
                <el-table-column
                  prop="period"
                  label="订阅周期"
                  align="center"
                />
                <el-table-column
                  prop="endTIme"
                  label="到期时间"
                  align="center"
                />
                <el-table-column prop="state" label="订单状态" align="center">
                  <template #default="scope">
                    <el-tag
                      v-if="scope.row.state === '订阅中'"
                      color="#EBEBFD"
                      >{{ scope.row.state }}</el-tag
                    >
                    <el-tag v-else type="info">{{ scope.row.state }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="cp" label="消耗算力" align="center" />
              </el-table>
              <el-pagination
                class="pagination"
                :page-size="3"
                layout="total, prev, pager, next,jumper"
                :total="100"
                v-model:current-page="currentPage1"
                @current-change="handleCurrentChange"
              />
            </el-tab-pane>
          </el-tabs>
        </section>

        <section v-else-if="currIndex == 4">
          <div class="header">我的阅读</div>
          <div class="content">
            <div class="read">
              <div
                class="box"
                v-for="(item, index) in new Array(8)"
                :key="index"
              >
                <!-- <div class="header">
                  <img src="~img/icon/time.png" alt="" />
                  <div>&nbsp;2025-03-25</div>
                </div> -->
                <div class="content">
                  <div class="left">
                    <div class="title">2024 中国新能源汽车行业深度研究报告</div>
                    <div class="desc">
                      <div>发布时间：2024-01-15</div>
                      <div>页数：128页</div>
                      <div>格式：PDF</div>
                      <div>大小：15.8MB</div>
                      <div class="center">
                        <el-icon><Star /></el-icon>2,456次收藏
                      </div>
                    </div>
                  </div>
                  <div class="right">
                    <el-button class="btn">
                      <div class="center">
                        <el-icon><Download /></el-icon>下载报告
                      </div>
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section v-else-if="currIndex == 5" class="star">
          <div class="header">
            我的收藏
            <div class="addStar" @click="addStar">
              <el-icon><Plus /></el-icon>新建收藏夹
            </div>
          </div>

          <div class="icons">
            <el-icon @click="editStar(activeName1)"><Edit /></el-icon>
            <el-icon @click="deleteStar" color="#EC5B56"
              ><DeleteFilled
            /></el-icon>
          </div>

          <el-tabs v-model="activeName1" class="demo-tabs" type="">
            <el-tab-pane
              v-for="(item, index) in stars"
              :key="index"
              :label="item"
              :name="index"
              style="position: relative"
            >
              <div class="star_box">
                <div class="content">
                  <div class="read">
                    <div
                      class="box"
                      v-for="(item, index) in new Array(8)"
                      :key="index"
                    >
                      <div class="content">
                        <div class="left">
                          <div class="title">
                            2024 中国新能源汽车行业深度研究报告
                          </div>
                          <div class="desc">
                            <div>发布时间：2024-01-15</div>
                            <div>页数：128页</div>
                            <div>格式：PDF</div>
                            <div>大小：15.8MB</div>
                            <div class="center">
                              <el-icon><Star /></el-icon>2,456次收藏
                            </div>
                          </div>
                        </div>
                        <div class="right">
                          <el-button class="btn">
                            <div class="center">
                              <el-icon><Download /></el-icon>取消收藏
                            </div>
                          </el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </section>
        <section v-else-if="currIndex == 6" class="download">
          <div class="header">我的下载</div>
          <div class="content">
            <div class="read">
              <div
                class="box"
                v-for="(item, index) in new Array(8)"
                :key="index"
              >
                <!-- <div class="header">
                  <img src="~img/icon/time.png" alt="" />
                  <div>&nbsp;2025-03-25</div>
                </div> -->
                <div class="content">
                  <div class="left">
                    <div class="title">2024 中国新能源汽车行业深度研究报告</div>
                    <div class="desc">
                      <div>发布时间：2024-01-15</div>
                      <div>页数：128页</div>
                      <div>格式：PDF</div>
                      <div>大小：15.8MB</div>
                      <div class="center">
                        <el-icon><Star /></el-icon>2,456次收藏
                      </div>
                    </div>
                  </div>
                  <div class="right">
                    <el-button class="btn">
                      <div class="center">
                        <el-icon><Download /></el-icon>下载报告
                      </div>
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section v-else-if="currIndex == 7" class="subscribe">
          <div class="header">我的订阅</div>
          <div class="content">
            <div
              class="subscribe_box"
              v-for="(item, index) in new Array(3)"
              :key="index"
            >
              <div class="subscribe_box_title">2025-06-06</div>
              <div class="subscribe_box_content">
                <div class="subscribe_content_top">
                  <div class="subscribe_title">
                    <el-button class="subscribe_btn">订阅邮箱</el-button>
                    <span>1007267507@qq.com</span>
                    <div class="right" @click="unsubscribe">
                      <el-icon><Close /></el-icon>退订
                    </div>
                  </div>
                  <el-descriptions column="2">
                    <el-descriptions-item label="关键词：" span="3"
                      >女装｜护肤品｜装饰</el-descriptions-item
                    >
                    <el-descriptions-item label="国家："
                      >美国</el-descriptions-item
                    >
                    <el-descriptions-item label="关联深度："
                      >1-6个关键词</el-descriptions-item
                    >
                    <el-descriptions-item label="订阅周期："
                      >7天</el-descriptions-item
                    >
                    <el-descriptions-item label="订阅频率："
                      >周一</el-descriptions-item
                    >
                  </el-descriptions>
                </div>
                <div class="subscribe_content_bottom">
                  <div class="bottom_box">
                    <img src="@/assets/img/状态@1x.png" alt="" />
                    <div>
                      <div>当前状态</div>
                      <p>订阅中</p>
                    </div>
                  </div>
                  <div class="bottom_box">
                    <img src="@/assets/img/发送@1x.png" alt="" />
                    <div>
                      <div>累计发送</div>
                      <p>0</p>
                    </div>
                  </div>
                  <div class="bottom_box">
                    <img src="@/assets/img/到期时间@1x.png" alt="" />
                    <div>
                      <div>到期时间</div>
                      <p>2025-06-15</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </el-main>
    </el-container>
    <el-dialog
      v-model="addStarVisible"
      title="新建收藏夹"
      width="550"
      style="padding: 30px 50px"
    >
      <el-form :model="userFormStar">
        <el-form-item prop="phone" label="名称">
          <el-input
            placeholder="请输入名称"
            :input-style="inputStyle"
            v-model="userFormStar.star"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            style="width: 90px; height: 35px; margin-right: 10px"
            @click="addStarVisible = false"
            >取消</el-button
          >
          <el-button
            style="width: 90px; height: 35px"
            type="primary"
            @click="addStarSubmit"
          >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="editStarVisible"
      title="编辑收藏夹"
      width="550"
      style="padding: 30px 50px"
    >
      <el-form :model="userFormStar">
        <el-form-item prop="phone" label="名称">
          <el-input
            placeholder="请输入名称"
            :input-style="inputStyle"
            v-model="userFormStar.star"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            style="width: 90px; height: 35px; margin-right: 10px"
            @click="editStarVisible = false"
            >取消</el-button
          >
          <el-button
            style="width: 90px; height: 35px"
            type="primary"
            @click="editStarVisibleSubmit"
          >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="deleteStarVisible"
      title="是否要删除当前收藏夹？"
      width="550"
      style="padding: 30px 50px"
    >
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4
            :id="titleId"
            :class="titleClass"
            style="
              text-align: left;
              display: flex;
              align-items: center;
              gap: 5px;
              margin-top: 0;
              margin-bottom: 10px;
            "
          >
            <el-icon style="font-size: 30px" color="#EC5B56"
              ><Warning /></el-icon
            >是否要删除当前收藏夹？
          </h4>
        </div>
      </template>
      <div style="text-align: left; margin-left: 20px">
        确定要将“果果收藏”删除吗？
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            style="width: 90px; height: 35px; margin-right: 10px"
            @click="deleteStarVisible = false"
            >取消</el-button
          >
          <el-button
            style="width: 90px; height: 35px"
            type="primary"
            @click="deleteStarVisibleSubmit(activeName1)"
          >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="unsubscribeVisible"
      width="550"
      style="padding: 30px 50px"
    >
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4
            :id="titleId"
            :class="titleClass"
            style="
              text-align: left;
              display: flex;
              align-items: center;
              gap: 5px;
              margin-top: 0;
              margin-bottom: 10px;
            "
          >
            <el-icon style="font-size: 30px" color="#EC5B56"
              ><Warning /></el-icon
            >是否要退订？
          </h4>
        </div>
      </template>
      <div style="text-align: left; margin-left: 20px">
        退订后将不再接受推送信息
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            style="width: 90px; height: 35px; margin-right: 10px"
            @click="unsubscribeVisible = false"
            >取消</el-button
          >
          <el-button
            style="width: 90px; height: 35px"
            type="primary"
            @click="unsubscribeSubmit()"
          >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogWxVisible"
      title="关注公众号后下次可扫码登录哦"
      width="550"
      style="padding: 30px 50px"
    >
      <img
        style="width: 150px; margin: 20px"
        src="@/assets/img/qrCode.png"
        alt=""
      />
    </el-dialog>
    <el-dialog
      v-model="dialogNickVisible"
      title="修改昵称"
      width="450"
      style="padding: 30px 50px"
    >
      <el-form :model="userFormNick">
        <el-form-item prop="phone">
          <el-input
            placeholder="请输入昵称"
            :input-style="inputStyle"
            v-model="userFormNick.nick"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            style="width: 90px; height: 35px; margin-right: 10px"
            @click="dialogNickVisible = false"
            >取消</el-button
          >
          <el-button
            style="width: 90px; height: 35px"
            type="primary"
            @click="dialogNickVisible = false"
          >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogEmailVisible"
      title="绑定邮箱"
      width="450"
      style="padding: 30px 50px"
    >
      <el-form :model="userFormEmail">
        <el-form-item prop="phone">
          <el-input
            placeholder="请输入邮箱"
            :input-style="inputStyle"
            v-model="userFormEmail.email"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            style="width: 90px; height: 35px; margin-right: 10px"
            @click="dialogEmailVisible = false"
            >取消</el-button
          >
          <el-button
            style="width: 90px; height: 35px"
            type="primary"
            @click="dialogEmailVisible = false"
          >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogFormVisible"
      title="绑定手机号"
      width="450"
      style="padding: 30px 50px"
    >
      <el-form :rules="rules" :model="userForm">
        <el-form-item prop="phone">
          <el-input
            placeholder="请输入手机号"
            :input-style="inputStyle"
            v-model="userForm.phone"
            maxLength="11"
          >
            <template #prepend>+86</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="authCode">
          <el-input
            :input-style="inputStyle"
            placeholder="请输入手机验证码"
            v-model="userForm.authCode"
          >
            <template #append>
              <el-button
                key="primary"
                type="primary"
                class="authCode"
                color="#4040E9"
                :text="true"
                @click="handleSendSms"
                :disabled="time < 60"
              >
                {{ time < 60 ? time + 's' : '获取验证码' }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            style="width: 90px; height: 35px; margin-right: 10px"
            @click="dialogFormVisible = false"
            >取消</el-button
          >
          <el-button
            style="width: 90px; height: 35px"
            type="primary"
            @click="dialogFormVisible = false"
          >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { sendSms } from '@/service/request/login/login'
import { copyToClipboard } from '@/utils/util'
import { computed, reactive, ref } from 'vue'
import { ElAvatar, ElMessage, FormRules } from 'element-plus'
import payPanel from '@/components/pay-panel/src/pay-panel.vue'
const currIndex = ref(1)

const handleClick = (key: string) => {
  console.log(key)
  currIndex.value = parseInt(key)
}

// 个人信息
const userInfo = reactive({
  avatar: '',
  nick: '阿瑟东',
  id: '747578',
  wx: '已绑定微信',
  phone: '153****7257',
  email: '1007267507@qq.com'
})

const dialogFormVisible = ref(false)
const dialogEmailVisible = ref(false)
const dialogNickVisible = ref(false)
const dialogWxVisible = ref(false)
const changePhone = () => {
  dialogFormVisible.value = true
}
const changeWx = () => {
  dialogWxVisible.value = true
}
const changeNick = () => {
  dialogNickVisible.value = true
}
const changeEmail = () => {
  dialogEmailVisible.value = true
}
// 表单数据+验证
const inputStyle = {
  width: '100%',
  height: '40px'
}
const userFormEmail = reactive({
  email: ''
})
const userFormNick = reactive({
  nick: ''
})
const userForm = reactive({
  phone: '',
  authCode: '',
  captchaCode: '',
  protocol: ''
})
const rules = reactive<FormRules>({
  phone: [
    {
      required: true,
      message: '请输入手机号'
    },
    {
      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      message: '请输入正确的手机号'
    }
  ],
  authCode: [
    {
      required: true,
      message: '请输入手机验证码'
    }
    // {
    //   pattern: /^[A-z0-9]{6,12}$/,
    //   message: '请输入6到12位数的字母数字组合~'
    // }
  ]
})
const time = ref(60)

const handleSendSms = () => {
  if (/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(userForm.phone)) {
    if (/^[A-z0-9]{1,12}$/.test(userForm.captchaCode)) {
      sendSms({
        // imageUuid: uuid.value,
        imageCode: userForm.captchaCode,
        tel: userForm.phone
      })
        .then(() => {
          ElMessage.success('验证码已发送')
          const timer = setInterval(() => {
            time.value--
            console.log(time.value)

            if (time.value <= 0) {
              clearInterval(timer)
              time.value = 60
            }
          }, 1000)
        })
        .catch((err) => {
          ElMessage.error(err)
        })
    } else {
      ElMessage.error('请填写图形验证码')
    }
  } else {
    ElMessage.error('请填写正确的手机号')
  }
}

const arr = [
  {
    label: '成为 VIP',
    icon: require('@/assets/img/icon/VIP@2x.png'),
    iconAT: require('@/assets/img/icon/VIP@2xAT.png'),
    index: '1'
  },
  {
    label: '个人信息',
    icon: require('@/assets/img/icon/个人信息@2x.png'),
    iconAT: require('@/assets/img/icon/个人信息@2xAT.png'),
    index: '2'
  },
  {
    label: '我的订单',
    icon: require('@/assets/img/icon/订单@2x.png'),
    iconAT: require('@/assets/img/icon/订单@2xAT.png'),
    index: '3'
  },
  {
    label: '我的阅读',
    icon: require('@/assets/img/icon/阅读@2x.png'),
    iconAT: require('@/assets/img/icon/阅读@2xAT.png'),
    index: '4'
  },
  {
    label: '我的收藏',
    icon: require('@/assets/img/icon/收藏@2x.png'),
    iconAT: require('@/assets/img/icon/收藏@2xAT.png'),
    index: '5'
  },
  {
    label: '我的下载',
    icon: require('@/assets/img/icon/下载@2x.png'),
    iconAT: require('@/assets/img/icon/下载@2xAT.png'),
    index: '6'
  },
  {
    label: '我的订阅',
    icon: require('@/assets/img/icon/订阅@2x.png'),
    iconAT: require('@/assets/img/icon/订阅@2xAT.png'),
    index: '7'
  }
]

// VIP逻辑
const isVIP = ref(false)
const VIPDesc = computed(() =>
  isVIP.value
    ? `会员类型：体验版会员     会员到期时间：2025-07-05 10:00 `
    : '您当前还不是VIP哦～'
)
//订单
const activeName = ref('first')
const activeName1 = ref(0)
const currentPage = ref(1)
const currentPage1 = ref(1)
const addStarVisible = ref(false)
const editStarVisible = ref(false)
const deleteStarVisible = ref(false)
const unsubscribeVisible = ref(false)
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
//star
const stars = ref(['默认收藏', '收藏夹1', '收藏夹12'])
const tableData = [
  {
    endTIme: '2016-05-03',
    type: 'Tom',
    period: '30day',
    state: '订阅中',
    cp: '1000',
    keywords: 'Grove St'
  },
  {
    endTIme: '2016-05-03',
    type: 'Tom',
    period: '30day',
    state: '订阅中',
    cp: '1000',
    keywords: 'Grove St'
  },
  {
    endTIme: '2016-05-03',
    type: 'Tom',
    period: '30day',
    state: '已完成',
    cp: '1000',
    keywords: 'Grove St'
  },
  {
    endTIme: '2016-05-03',
    type: 'Tom',
    period: '30day',
    state: '已完成',
    cp: '1000',
    keywords: 'Grove St'
  },
  {
    endTIme: '2016-05-03',
    type: 'Tom',
    period: '30day',
    state: '已完成',
    cp: '1000',
    keywords: 'Grove St'
  },
  {
    endTIme: '2016-05-03',
    type: 'Tom',
    period: '30day',
    state: '已完成',
    cp: '1000',
    keywords: 'Grove St'
  }
]
const addStar = () => {
  userFormStar.star = ''
  addStarVisible.value = true
}
const editStar = (key: number) => {
  userFormStar.star = stars.value[key]
  editStarVisible.value = true
}
const deleteStar = () => {
  deleteStarVisible.value = true
}
const unsubscribe = () => {
  unsubscribeVisible.value = true
}
const unsubscribeSubmit = () => {
  unsubscribeVisible.value = false
}
const addStarSubmit = () => {
  stars.value.push(userFormStar.star)
  addStarVisible.value = false
}

const deleteStarVisibleSubmit = (key: number) => {
  stars.value.splice(key, 1)
  deleteStarVisible.value = false
}
const editStarVisibleSubmit = () => {
  stars.value.push(userFormStar.star)
  editStarVisible.value = false
}
const userFormStar = reactive({
  star: ''
})
</script>

<style scoped lang="less">
:deep(.el-tabs__nav-wrap:after) {
  height: 0px;
}
.el-main:has(.VIP) {
  padding: 0 !important;
}
.page-bg {
  background-color: #f5f6f7 !important;
}
.common-layout {
  padding: 15px;
  aside {
    height: 600px;
    .el-menu {
      border: none;
      li {
        font-size: 16px;
        img {
          width: 18px;
          height: 18px;
          object-fit: contain;
          margin-right: 5px;
        }
      }
    }
  }
  main {
    min-height: 600px;
    max-height: 100%;
    margin-left: 15px;
    background-color: #fff;
    padding: 5px 25px;
    .VIP {
      .header {
        height: 140px;
        border: 1px solid var(--border-color);
        border-radius: 3px;
        background: linear-gradient(270deg, #b6c6e1 0%, #91a7d3 100%);
        display: flex;
        align-items: center;
        padding: 30px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 33px;
          margin-right: 10px;
        }
        .flex-col {
          align-items: flex-start;
          justify-content: space-around;
        }
        .name {
          font-size: 18px;
          color: #fff;
          line-height: 28px;
          .VIPIcon {
            width: 24.28px;
            height: 14px;
            border-radius: 0;
          }
        }
        .desc {
          color: #fff;
          font-size: 14px;
          line-height: 28px;
          font-weight: normal;
        }
      }
      .center {
        margin-top: 30px;
        padding: 0 20px;
        .box {
          width: 300px;
          height: 320px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          background-image: url('~@/assets/img/vipDiamond.png');
          background-position: right top;
          background-size: 159px 155px;
          background-repeat: no-repeat;
          margin-right: 30px;
          .flex-col {
            align-items: flex-start;
            justify-content: space-around;
          }
          .top {
            height: 50%;
            border-bottom: 1px solid #e5e7eb;
            .name {
              color: #000000;
              font-size: 20px;
              font-weight: bold;
              margin-top: -10px;
            }
            .desc {
              font-size: 14px;
              font-weight: normal;
              color: #6b7280;
              margin-top: -20px;
            }
            .money {
              font-size: 14px;
              font-weight: bold;
              color: #6b7280;
              margin-top: -10px;
              display: flex;
              align-items: baseline;
              .amount {
                font-size: 30px;
                color: var(--main-color);
                margin-right: 12px;
              }
            }
          }
          .bottom {
            height: 50%;
            .title {
              font-size: 16px;
              font-weight: bold;
              color: #000000;
              margin-top: 25px;
              margin-bottom: 10px;
            }
            .content_item {
              display: flex;
              height: 30px;
              justify-content: space-between;
              align-items: center;
              font-size: 14px;
              color: #4b5563;
            }
          }
        }
        .isActive {
          border-color: var(--main-color);
          background-color: #f8f9ff;
          background-image: url('~@/assets/img/vipDiamondAt.png');
        }
      }
      .footer {
        padding: 0 20px;
      }
      .pay {
        margin: 20px 0;
        height: 258px;
        border-radius: 10px;
        background: #f5f7fa;
      }
      .isVIP {
        background: linear-gradient(
          270deg,
          #c0d8ff 0%,
          #8181ff 100%,
          #4040f2 100%
        );
      }
    }
    .order {
      background-color: #fff;
      .pagination {
        margin: 70px 0;
      }
      .box_order {
        min-height: 180px;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #e5e7eb;
        &:last-child {
          border-bottom: none;
        }
        .top_order {
          display: flex;
          gap: 40px;
          font-size: 14px;
          color: #000000;
        }
      }
    }
    .star {
      position: relative;
      .icons {
        position: absolute;
        right: 0;
        display: flex;
        gap: 20px;
        margin-top: 15px;
        z-index: 99;
      }
      .el-icon {
        cursor: pointer;
      }
    }
    .subscribe {
      .subscribe_box {
        height: 425px;
        .subscribe_box_title {
          font-size: 18px;
          margin: 20px 0px 10px;
        }
        .subscribe_box_content {
          height: 368px;
          border-radius: 12px;
          background: #eff6ff;
          padding: 32px;
          .subscribe_content_top {
            height: 204px;
            border-radius: 12px;
            background: #ffffff;
            padding: 24px;
            display: flex;
            flex-direction: column;
            .subscribe_title {
              position: relative;
              margin-bottom: 20px;
              display: flex;
              font-size: 16px;
              align-items: center;
              .subscribe_btn {
                font-size: 14px;
                width: 80px;
                height: 28px;
                background: #4040f2;
                color: #fff;
                margin-right: 20px;
              }
              .right {
                display: flex;
                align-items: center;
                gap: 5px;
                color: red;
                position: absolute;
                right: 0;
                top: 0;
                cursor: pointer;
              }
            }
          }
          .subscribe_content_bottom {
            display: flex;
            gap: 20px;
            margin-top: 25px;
            height: 77px;
            .bottom_box {
              flex: 1;
              background: #ffffff;
              padding: 18px 15px;
              border-radius: 12px;
              display: flex;
              gap: 15px;
              img {
                width: 40px;
                height: 40px;
                border-radius: 12px;
              }
              div {
                font-size: 14px;
                font-weight: normal;
                color: #6b7280;
              }
              p {
                font-size: 16px;
                font-weight: bold;
                color: #000000ac;
                margin: 4px 0px;
              }
            }
          }
        }
      }
    }
    section {
      width: 100%;
      max-height: calc(100vh - 110px);
      text-align: start;
      .header {
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        font-weight: 600;
        // margin-bottom: 20px;
        color: #3d3d3d;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .addStar {
          float: right;
          display: flex;
          width: 120px;
          padding: 6px 10px;
          height: 36px;
          align-items: center;
          gap: 10px;
          border-radius: 3px;
          background: #f5f5ff;
          font-size: 14px;
          color: #4040f2;
          font-weight: normal;
          cursor: pointer;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        // border-top: 1px solid #f5f7f9;
        .info {
          .box {
            width: 450px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 50px;
            div {
              flex: 1;
            }
            .left {
              color: #4b5563;
            }
            .center {
              color: #1f2937;
              // font-weight: 600;
              img {
                width: 60px;
                height: 60px;
                border-radius: 30px;
              }
            }
            .right {
              cursor: pointer;
              margin-left: 20px;
              color: var(--main-color);
            }
          }
        }

        .read {
          margin: 20px 0;
          .box {
            border: 1px solid var(--border-color);
            border-radius: 10px;
            margin-bottom: 20px;
            .header {
              height: 36px;
              display: flex;
              justify-content: start;
              align-items: center;
              background: #f0f0ff;
              gap: 5px;
              padding: 0 12px;
              border-radius: 10px 10px 0 0;
            }
            .content {
              height: 120px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              padding: 0 30px;
              .left {
                display: flex;
                flex-direction: column;
                gap: 10px;
                .title {
                  font-size: 20px;
                  color: #3d3d3d;
                  font-weight: bold;
                }
                .desc {
                  display: flex;
                  gap: 20px;
                  color: #6b7280;
                  font-size: 14px;
                  .center {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                  }
                }
              }
              .right {
                margin-right: 5px;
                .center {
                  display: flex;
                  align-items: center;
                  gap: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
