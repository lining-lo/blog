<template>
  <div class="diary-list">
    <div class="list-item" v-for="(item, index) in 4">
      <div class="item-left"></div>
      <div class="item-right">
        <div class="right-name">lining-lo</div>
        <div class="right-msg">临近毕业前的杂事不是一般的多……</div>
        <div class="right-imgs" style="width: 440px;"><!-- 一张图片宽440px,多张220px -->
          <img class="imgs-item" src="../assets/images/light-treehole.png" alt="">
        </div>
        <div class="right-footer">
          <div class="footer-time">55天前</div>
          <div class="footer-message">
            <el-icon class="message-like">
              <Sugar />
            </el-icon>11
            <el-icon class="message-look">
              <ChatDotSquare />
            </el-icon>4
            <el-icon class="message-write">
              <EditPen />
            </el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.diary-list {
  width: 66%;
  box-shadow: 0 1px 10px -6px black;
  border-radius: 10px;
  margin: 40px auto;
  padding: 40px 50px;

  .list-item {
    display: flex;
    border-bottom: 1px solid rgb(184, 184, 184);
    padding: 10px;
    margin-bottom: 14px;

    .item-left {
      width: 60px;
      height: 60px;
      background-color: skyblue;
    }

    .item-right {
      width: 600px;
      margin-left: 10px;

      .right-name {
        color: #4b4948;
      }

      .right-msg {
        margin: 24px 0 15px 0;
        font-size: 14px;
      }
      .right-imgs{
        width: 220px;
        margin-bottom: 14px;
        display: flex;
        .imgs-item{
          width: 100%;
          padding: 2px;
        }
      }

      .right-footer {
        width: 220px;
        display: flex;
        justify-content: space-between;
        color: #797979;
        font-size: 13px;

        .footer-message {
          padding: 1px 3px 0px;
          margin-bottom: 14px;

          .message-like {
            cursor: pointer;

            &:hover {
              color: red;
            }
          }

          .message-look {
            cursor: pointer;

            &:hover {
              color: #73c3f7;
            }
          }

          .message-write {
            cursor: pointer;

            &:hover {
              color: purple;
            }
          }
        }
      }
    }
  }
}
</style>