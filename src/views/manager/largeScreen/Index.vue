<template>
  <section class="large_screen_wrap">
    <!-- 主体部分 -->
    <div class="lagscn_content">
      <div class="map_demo">
        <el-amap ref="map" vid="amapDemo" :center="center" :zoom="zoom" :events="events">
        </el-amap>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
          zoom: 12,
          center: [121.59996, 31.197646],
          events: {
            'click': (e) => {
              alert('map clicked');
            }
          }
        }
  },

  methods: {

  },

  created() {

  }
}
</script>

<style lang="less" scoped>
// @navHeight: 105px;
@navHeight: 0px;
@caontentMargin: 0px;
@asideWidth: 30.5%;
@titleHeight: 38px;
@titleMargin: 14px;
@tabRadius: 5px;
@numFontSize: 20px;
@fontBetween: 5px;
@dotMargin: 13px;
@fontBlueColor1: #4abefe;
@fontBlueColor2: #58b2ff;
@fontBlueColor3: #00c0ff;
@fontRedColor1: #e54246;
@progressColor: linear-gradient(270deg, #1aaf87 0%, rgba(26, 175, 135, 0) 100%);

.large_screen_wrap {
  width: 100%;
  height: 100%;
  // background: #091f3f;
  // color: #fff;
  // padding-bottom: 1px;
  background: url('../../../assets/images/bgimg.png') top no-repeat; 

  .lagscn_content {
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 98.5%;
    // margin-top: -@caontentMargin;
    min-height: 1080px;
    // margin-bottom: 10px;
    .map_demo {
      height: 500px;
      width: 300px;
    }
  }
}
</style>
