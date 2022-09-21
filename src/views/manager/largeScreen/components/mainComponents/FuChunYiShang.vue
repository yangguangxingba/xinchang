<!-- 富春驿商 -->
<template>
  <section class="fcys_wrap map_item_cont" @click="setPoint">
    <img src="../mapComponents/mapImg/fcys/fcys_map.png" />

    <!-- 点位 -->
    <!-- 旅居度假 -->
    <div class="point point_fcys point_fcys_1" data-name="百鸟坞水上运动中心"></div>
    <div class="point point_fcys point_fcys_2" data-name="高端度假酒店"></div>
    <div class="point point_fcys point_fcys_3" data-name="集中式亲子酒店"></div>
    <div class="point point_fcys point_fcys_4" data-name="旅居度假屋"></div>
    <div class="point point_fcys point_fcys_5" data-name="茶海飞跃运动基地"></div>
    <div class="point point_fcys point_fcys_6" data-name="天门缆车站"></div>
    <!-- 浪漫茶园 -->
    <div class="point point_fcys point_fcys_7" data-name="捻茶工坊"></div>
    <div class="point point_fcys point_fcys_8" data-name="茶香酒吧"></div>
    <div class="point point_fcys point_fcys_9" data-name="艺术家创作部落"></div>
    <div class="point point_fcys point_fcys_10" data-name="乡建·礼堂"></div>
    <div class="point point_fcys point_fcys_11" data-name="大唐茶人村"></div>
    <div class="point point_fcys point_fcys_12" data-name="婚拍礼堂"></div>
    <div class="point point_fcys point_fcys_13" data-name="富阳开放式服务区启动区"></div>
    <div class="point point_fcys point_fcys_14" data-name="茶田艺术咖啡馆"></div>
    <!-- 生态农庄 -->
    <div class="point point_fcys point_fcys_15" data-name="水果栽培园"></div>
    <div class="point point_fcys point_fcys_16" data-name="生态农业种植园"></div>
    <div class="point point_fcys point_fcys_17" data-name="农业体验教学区"></div>
    <div class="point point_fcys point_fcys_18" data-name="季节赏樱区"></div>

    <!-- 气泡窗 -->
    <div ref="boxfef" class="popbox" v-if='showBox' :style="{left: tranLeft + 'px', top: tranTop + 'px'}">
      <div class="drge" @mousedown="mouseDownHandleelse($event)" @mouseup="mouseUpHandleelse($event)"></div>
      <h3>{{ currentImg }}</h3>
      <span>此图片为意向图，实际以后续实施为准！</span>
      <!-- 旅居度假 -->
      <img src="../mapComponents/mapImg/fcys/ljdj/bnw.jpg" v-if="currentImg === '百鸟坞水上运动中心'" />
      <img src="../mapComponents/mapImg/fcys/ljdj/gddj.jpg" v-if="currentImg === '高端度假酒店'" />
      <img src="../mapComponents/mapImg/fcys/ljdj/jzs.jpg" v-if="currentImg === '集中式亲子酒店'" />
      <img src="../mapComponents/mapImg/fcys/ljdj/ljdjw.jpg" v-if="currentImg === '旅居度假屋'" />
      <img src="../mapComponents/mapImg/fcys/ljdj/chfy.jpg" v-if="currentImg === '茶海飞跃运动基地'" />
      <img src="../mapComponents/mapImg/fcys/ljdj/tmlc.jpg" v-if="currentImg === '天门缆车站'" />
      <!-- 浪漫茶园 -->
      <img src="../mapComponents/mapImg/fcys/lmcy/ncgf.jpg" v-if="currentImg === '捻茶工坊'" />
      <img src="../mapComponents/mapImg/fcys/lmcy/cxjb.jpg" v-if="currentImg === '茶香酒吧'" />
      <img src="../mapComponents/mapImg/fcys/lmcy/ysjczbl.jpg" v-if="currentImg === '艺术家创作部落'" />
      <img src="../mapComponents/mapImg/fcys/lmcy/xjlt.png" v-if="currentImg === '乡建·礼堂'" />
      <img src="../mapComponents/mapImg/fcys/lmcy/dtcrc.jpg" v-if="currentImg === '大唐茶人村'" />
      <img src="../mapComponents/mapImg/fcys/lmcy/hplt.jpg" v-if="currentImg === '婚拍礼堂'" />
      <img src="../mapComponents/mapImg/fcys/lmcy/fykfsfwq.jpg" v-if="currentImg === '富阳开放式服务区启动区'" />
      <img src="../mapComponents/mapImg/fcys/lmcy/ctyskfg.jpg" v-if="currentImg === '茶田艺术咖啡馆'" />
      <!-- 生态农庄 -->
      <img src="../mapComponents/mapImg/fcys/stny/sgzp.jpg" v-if="currentImg === '水果栽培园'" />
      <img src="../mapComponents/mapImg/fcys/stny/stny.jpg" v-if="currentImg === '生态农业种植园'" />
      <img src="../mapComponents/mapImg/fcys/stny/nyty.jpg" v-if="currentImg === '农业体验教学区'" />
      <img src="../mapComponents/mapImg/fcys/stny/jjsy.jpg" v-if="currentImg === '季节赏樱区'" />
    </div>

    <!-- 图例 -->
    <div class="lend_wrap">
      <ul>
        <li>
          <dl>
            <dt>
              <img src="../mapComponents/mapImg/fcys/ico/lmcy.png" />
            </dt>
            <dd>浪漫茶园</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <img src="../mapComponents/mapImg/fcys/ico/ljdj.png" />
            </dt>
            <dd>旅居度假</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <img src="../mapComponents/mapImg/fcys/ico/stnz.png" />
            </dt>
            <dd>生态农庄</dd>
          </dl>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentImg: "",
      showBox: false,
      
      tranLeft: 20, // 向左偏移
      tranTop: 10,  // 向右偏移
      moveDataelse: {
        x: null,
        y: null
      },
    }
  },

  created() {
    this.initPage()
  },

  methods: {
    initPage() {
      this.$nextTick(()=> {
        let wrap = this.$el.parentNode.parentNode.parentNode
        wrap.classList.add('fcys_main_wrap')
      })
    },

    // 命中锚点
    setPoint(e) {
      let { target } = e

      // 判断是否点击锚点
      if(target.classList.contains('point')) {
        this.tranLeft = e.pageX - 730
        this.tranTop = e.pageY - 400
        
        this.currentImg = target.getAttribute('data-name')
        this.showBox = true	
      } else if(target.classList.contains('popbox') || target.parentNode.classList.contains('popbox')) {
        this.showBox = true	
      } else {
        this.showBox = false	
      }
    },

    /**
     * 拖拽
     */
    mouseDownHandleelse (event) {
      this.moveDataelse.x = event.pageX - this.$refs.boxfef.offsetLeft
      this.moveDataelse.y = event.pageY - this.$refs.boxfef.offsetTop
      event.currentTarget.style.cursor = 'move'
      window.onmousemove = this.mouseMoveHandleelse
    },
    mouseMoveHandleelse (event) {
      let moveLeft = event.pageX - this.moveDataelse.x + 'px'
      let moveTop = event.pageY - this.moveDataelse.y + 'px'
      this.$refs.boxfef.style.left = moveLeft
      this.$refs.boxfef.style.top = moveTop
    },
    mouseUpHandleelse (event) {
      window.onmousemove = null
      event.currentTarget.style.cursor = 'move'
      // console.log('鼠标松开了')
    }
  },
  beforeDestroy() {
    let wrap = document.querySelector('.fcys_main_wrap')
    wrap.classList.remove('fcys_main_wrap')
  },
}
</script>

<style lang="less" scoped>
@import url('./less/point');

.fcys_wrap {
  position: relative;
  // height: 570px !important;

  img {
    width: 100%;
  }

  .popbox {
    position: absolute;
    top: 0;
    left: 0;
    // padding: 5px;
    padding: 20px 0px 0px;
    width: 226px;
    height: auto;
    border-top: solid 2px #3395be;
    background: rgba(12,38,77,0.7500);

    h3, span {
      position: absolute;
      font-family: @numFontFamily;
      font-size: 12px;
    }

    h3 {
      top: 4px;
      left: 6px;
    }

    span {
      right: -6px;
      bottom: 3px;
    }

    .drge {
      position: absolute;
      margin: -5px;
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
    }
  }

  .lend_wrap {
    position: absolute;
    bottom: 0;
    right: 20px;

    ul {
      li {
        &:not(:last-child) {
          margin-bottom: 10px;
        }

        dl {
          dt, dd {
            display: inline-block;
          }

          dt {
            width: 21px;
            height: 24px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
            }
          }

          dd {
            position: relative;
            top: -6px;
            left: 6px;
            font-size: 14px;
            color: #ADB1BC;
          }
        }
      }
    }
  }
}
</style>