<!-- 地图 -->
<template>
  <section class="glmap_wrap f-cb">
    <tab class="map_tab f-fl" :tabList="tabListData"  @checkTab="checkTab" v-if="tabListData.length !== 0" />

    <div id='glMap' class="glMap_cont" style='width: 100%; height: 100%;' v-loading="mapLoading"></div>

    <!-- 图例 -->
    <map-lend ref="mapLendRef" @removePopup="removePopup" />
  </section>
</template>

<script>
// map-core
import maplibregl from 'maplibre-gl';
import { glMapConfig, glMapConfigIndex, glMapConfigTest } from './mapData/mapConfig'  // config
// mapconfig/geodata
import zhejiangGeo from './mapData/geoData/zhejiang';  // 浙江
import zhejiangGeo2 from './mapData/geoData/zhejiang2';  // 浙江
import shanghaiGeo from './mapData/geoData/shanghai';  // 上海
// import shanghaiGeo from './mapData/geoData/shanghai';  // 上海
// mapdata popup数据
import { mainPopupData, zhonTanData, zheShangJianRongData, gaoSuShiYouData, gaoSuNengYuanData, chuangShengZhiHeData, gaoSuShangMaoData, YingTongCanYingData } from './mapData/popupData'

// tools components
import Tab from '../tipComponents/Tab'
import MapLend from './MapLend'

// 接口
// import { getIndexMap } from '@/api/largeScreen'
import { getIndexMap } from '../tipComponents/lgTipApi'

export default {
  components: {
    Tab, MapLend
  },

  props: {
    // 选项卡
    tabListData: {
      type: Array,
      default: ()=> []
    },
  },

  data() {
    return {
      /**
       * tools
       */
      glMap: null,
      mapDataList: [],
      tabCurrent: '',
      indexMapData: [],
      mapLoading: false,

      /**
       * 数据
       */
      mainPopupData,  // 首页大屏数据
      zhonTanData,  // 中碳科技数据
      zheShangJianRongData,  // 浙江建融数据
      gaoSuShiYouData,  // 高速石油数据
      gaoSuNengYuanData,  // 高速能源数据
      chuangShengZhiHeData,  // 创胜至合数据
      gaoSuShangMaoData,  // 高速商贸数据
      YingTongCanYingData,  // 盈通餐饮数据
    }
  },

  computed: {
    /**
     * 气泡
     */
    // 首页大屏气泡
    mainPopup() {
      return `<section class="popupp_wrap main_popupp">
                <ul>
                  <li>便利店到店转化率：<span>${this.mainPopupData.mpdt1}</span></li>
                  <li>光伏发电量：<span>${this.mainPopupData.mpdt2}</span></li>
                  <li>中餐单笔平均消费金额：<span>${this.mainPopupData.mpdt3}</span></li>
                  <li>西餐单笔平均消费金额：<span>${this.mainPopupData.mpdt4}</span></li>
                </ul>
              </section>`
    },
    // 中碳科技气泡
    zhonTanPopup() {
      return `<section class="popupp_wrap zhongtan_popupp">
                <ul>
                  <li>场站名称：${this.zhonTanData.ztdt1}</li>
                  <li>地址：${this.zhonTanData.ztdt2}</li>
                  <li>容量：${this.zhonTanData.ztdt3} KWP</li>
                  <li>年发电量：${this.zhonTanData.ztdt4} KWh</li>
                </ul>
              </section>`
    },
    // 浙江建融
    zheShangJianRongPopup() {
      return `<section class="popupp_wrap zheshangjr_popupp">
                <ul>
                  <li>项目名称：${this.zheShangJianRongData.zsjrdt1}</li>
                </ul>
              </section>`
    },
    // 高速石油气泡
    gaoSuShiYouPopup() {
      /**
       * table1
       */
      let tb1ThStr = '' 
      let tb1TbdStr = '' 
      this.gaoSuShiYouData.gssytable1.columns.forEach(item=> {
        tb1ThStr += `<th>${item}</th>`
      })
      this.gaoSuShiYouData.gssytable1.gssytbData.forEach(item=> {
          tb1TbdStr += `<tr>
            <td>${item.gsytdCol1}</td> 
            <td>${typeof item.gsytdCol2 === 'object' ? '<span>'+ item.gsytdCol2.num +'</span>' + item.gsytdCol2.unit : item.gsytdCol2}</td> 
          </tr>`
      })
      /**
       * table2
       */
      let tb2ThStr = '' 
      let tb2TbdStr = '' 
      this.gaoSuShiYouData.gssytable2.columns.forEach(item=> {
        tb2ThStr += `<th>${item}</th>`
      })
      this.gaoSuShiYouData.gssytable2.gssytbData.forEach(item=> {
          tb2TbdStr += `<tr>
            <td>${item.gsytdCol1}</td> 
            <td>${typeof item.gsytdCol2 === 'object' ? '<span>'+ item.gsytdCol2.num +'</span>' + item.gsytdCol2.unit : item.gsytdCol2}</td> 
          </tr>`
      })


      return `<section class="popupp_wrap gaosushiyou_popupp">
                <ul>
                  <li>名称：${this.gaoSuShiYouData.gssydt1}</li>
                  <li>地址：${this.gaoSuShiYouData.gssydt2}</li>
                </ul>
                <table>
                  <thead>
                    <tr>
                      ${tb1ThStr}
                    </tr>
                  </thead>
                  <tbody>
                     ${tb1TbdStr}
                  </tbody>
                </table>
                <table>
                  <thead>
                    <tr>
                      ${tb2ThStr}
                    </tr>
                  </thead>
                  <tbody>
                     ${tb2TbdStr}
                  </tbody>
                </table>
              </section>`
    },
    // 高速能源气泡
    gaoSuNengYuanPopup() {
      /**
       * table1
       */
      let tb1ThStr = '' 
      let tb1TbdStr = '' 
      this.gaoSuNengYuanData.gsnytable1.columns.forEach(item=> {
        tb1ThStr += `<th>${item}</th>`
      })
      this.gaoSuNengYuanData.gsnytable1.gsnytbData.forEach(item=> {
          tb1TbdStr += `<tr>
            <td>${item.gnytdCol1}</td> 
            <td>${typeof item.gnytdCol2 === 'object' ? '<span>'+ item.gnytdCol2.num +'</span>' + item.gnytdCol2.unit : item.gnytdCol2}</td> 
          </tr>`
      })
      /**
       * table2
       */
      let tb2ThStr = '' 
      let tb2TbdStr = '' 
      this.gaoSuNengYuanData.gsnytable2.columns.forEach(item=> {
        tb2ThStr += `<th>${item}</th>`
      })
      this.gaoSuNengYuanData.gsnytable2.gsnytbData.forEach(item=> {
          tb2TbdStr += `<tr>
            <td>${item.gnytdCol1}</td> 
            <td>${typeof item.gnytdCol2 === 'object' ? '<span>'+ item.gnytdCol2.num +'</span>' + item.gnytdCol2.unit : item.gnytdCol2}</td> 
          </tr>`
      })


      return `<section class="popupp_wrap gaosushiyou_popupp">
                <ul>
                  <li>名称：${this.gaoSuNengYuanData.gsnydt1}</li>
                  <li>地址：${this.gaoSuNengYuanData.gsnydt2}</li>
                </ul>
                <table>
                  <thead>
                    <tr>
                      ${tb1ThStr}
                    </tr>
                  </thead>
                  <tbody>
                     ${tb1TbdStr}
                  </tbody>
                </table>
                <table>
                  <thead>
                    <tr>
                      ${tb2ThStr}
                    </tr>
                  </thead>
                  <tbody>
                     ${tb2TbdStr}
                  </tbody>
                </table>
              </section>`
    },
    // 创胜至合气泡
    chuangShengZhiHePopup() {
      /**
       * table
       */
      let tbThStr = '' 
      let tbTbdStr = '' 
      this.chuangShengZhiHeData.cszhtable.columns.forEach(item=> {
        tbThStr += `<th>${item}</th>`
      })
      this.chuangShengZhiHeData.cszhtable.cszhtbData.forEach(item=> {
          tbTbdStr += `<tr>
            <td>${item.cszhtdCol1}</td> 
            <td>${typeof item.cszhtdCol2 === 'object' ? '<span>'+ item.cszhtdCol2.num +'</span>' + item.cszhtdCol2.unit : item.cszhtdCol2}</td> 
          </tr>`
      })

      return `<section class="popupp_wrap gaosushiyou_popupp">
                <ul>
                  <li>名称：${this.chuangShengZhiHeData.cszhdt1}</li>
                  <li>简介：${this.chuangShengZhiHeData.cszhdt2}</li>
                </ul>
                <table>
                  <thead>
                    <tr>
                      ${tbThStr}
                    </tr>
                  </thead>
                  <tbody>
                     ${tbTbdStr}
                  </tbody>
                </table>
              </section>`
    },
    // 高速商贸气泡
    gaoSuShangMaoPopup() {
      /**
       * table
       */
      let tbThStr = '' 
      let tbTbdStr = '' 
      this.gaoSuShangMaoData.gssmtable.columns.forEach(item=> {
        tbThStr += `<th>${item}</th>`
      })
      this.gaoSuShangMaoData.gssmtable.gssmtbData.forEach(item=> {
          tbTbdStr += `<tr>
            <td>${item.gssmtdCol1}</td> 
            <td>${typeof item.gssmtdCol2 === 'object' ? '<span>'+ item.gssmtdCol2.num +'</span>' + item.gssmtdCol2.unit : item.gssmtdCol2}</td> 
          </tr>`
      })

      return `<section class="popupp_wrap gaosushiyou_popupp">
                <ul>
                  <li>名称：${this.gaoSuShangMaoData.gssmdt1}</li>
                  <li>地址：${this.gaoSuShangMaoData.gssmdt2}</li>
                </ul>
                <table>
                  <thead>
                    <tr>
                      ${tbThStr}
                    </tr>
                  </thead>
                  <tbody>
                     ${tbTbdStr}
                  </tbody>
                </table>
              </section>`
    },
    // 盈通餐饮气泡
    YingTongCanYingPopup() {
      /**
       * table
       */
      let tbThStr = '' 
      let tbTbdStr = '' 
      this.YingTongCanYingData.ytcytable.columns.forEach(item=> {
        tbThStr += `<th>${item}</th>`
      })
      this.YingTongCanYingData.ytcytable.ytcytbData.forEach(item=> {
          tbTbdStr += `<tr>
            <td>${item.ytcytdCol1}</td> 
            <td>${typeof item.ytcytdCol2 === 'object' ? '<span>'+ item.ytcytdCol2.num +'</span>' + item.ytcytdCol2.unit : item.ytcytdCol2}</td> 
          </tr>`
      })

      return `<section class="popupp_wrap gaosushiyou_popupp">
                <ul>
                  <li>名称：${this.YingTongCanYingData.ytcydt1}</li>
                  <li>地址：${this.YingTongCanYingData.ytcydt2}</li>
                </ul>
                <table>
                  <thead>
                    <tr>
                      ${tbThStr}
                    </tr>
                  </thead>
                  <tbody>
                     ${tbTbdStr}
                  </tbody>
                </table>
              </section>`
    },

    /**
     * map
     */
    // 浙江地图2
    zhejiangMap2() {
      return this.mapInitTool(glMapConfig, zhejiangGeo2)
    },
    // 浙江地图
    zhejiangMap() {
      return this.mapInitTool(glMapConfig, zhejiangGeo)
    },
    // 上海地图
    shanghaiMap() {
      return this.mapInitTool(glMapConfigIndex, shanghaiGeo)
    },
    // 上海地图
    shanghaiMap() {
      return this.mapInitTool(glMapConfigIndex, shanghaiGeo)
    },
  },

  created() {
    this.getIndexMapData()
  },

  methods: {
    /**
     * tools
     */
    // 点击选项卡
    checkTab(val) {
      // console.log(val)

      this.tabCurrent = val

      this.removeAllMarker()  // 移除所有标注

      this.getImgMarker()  // 设置图片标注
    },
    // 返回
    goBack() {
      // console.log('返回')

      this.$refs.mapLendRef.goBack()
      this.getIndexMapData()
    },
    // 开始maploading
    startMapLoading() {
      // console.log("开始loading")

      this.mapLoading = true
    },
    // 结束maploading
    endMapLoading() {
      // console.log("结束loading")

      this.mapLoading = false
    },

    /**
     * api data
     */
    // 获取公司信息
    getCompanyData(companyData) {
      // console.log(companyData)
      this.reStartMap()  // 重置地图

      this.companyData = companyData
      this.$refs.mapLendRef.getCompanyData(companyData)  // MapLend组件获取数据
      this.indexMapData = []

      this.$nextTick(()=> {
        this.tabCurrent = this.tabListData[0]
      })
    },
    // 首页地图数据
    async getIndexMapData() {
      this.mapLoading = true
      // this.indexMapData = await this.globalUtils.apiCommon(getIndexMap)
      this.indexMapData = await getIndexMap()
      // console.log(this.indexMapData)
      this.mapDataList = this.indexMapData

      this.initIndexMap()  // 初始化首页地图

      this.mapLoading = false
    },
    // 获取地图数据
    getMapData(mapDataList) {
      // console.log("获取地图数据", mapDataList)

      if(mapDataList.length !== 0) {
        this.mapDataList = mapDataList
        this.currentCompany = mapDataList[0].company_id
      }
    },

    /**
     * map tools
     */
    mapInitTool(mapconfig, geoData, center, zoom) {
      this.removeAllMarker()

      if(this.glMap) {
        this.glMap.remove()
      }
      
      return new maplibregl.Map(mapconfig('glMap', geoData, center, zoom));  // 初始化地图
    },
    // 启动地图
    startMap() {
      this.$nextTick(()=> {
        this.initMap()
      })
    },
    // 重置地图
    reStartMap() {
      this.removeAllMarker()

      if(this.glMap) {
        this.glMap.remove()
      }
      
      this.startMap()
    },
    // 定制geojson并渲染
    renderGeo() {
      zhejiangGeo.features.forEach(({ properties: { name, centroid } })=> {
        // console.log(name, centroid)

        let el = document.createElement('div');
        el.innerHTML = `<div class="title">${name}</div>`;
        el.className = 'city-label';
        new maplibregl.Marker({ element: el, anchor: 'center' }).setLngLat(centroid).addTo(this.glMap);
      })
    },
    // 设置气泡
    SetPopupCommon(map, linlat, inner) {
      return new maplibregl.Popup({ closeOnClick: true })
      .setLngLat(linlat)
      .setHTML(inner)
      .addTo(map);
    },
    // 设置气泡 - 测试
    setPopup() {
      // this.SetPopupCommon(this.glMap, [120.5, 30], this.mainPopup)  // 首页大屏气泡
      // this.SetPopupCommon(this.glMap, [120.5, 30], this.zhonTanPopup)  // 中碳科技气泡
      // this.SetPopupCommon(this.glMap, [120.5, 30], this.zheShangJianRongPopup)  // 浙江建融气泡
      // this.SetPopupCommon(this.glMap, [120.5, 30], this.gaoSuShiYouPopup)  // 高速石油气泡
      // this.SetPopupCommon(this.glMap, [120.5, 30], this.gaoSuNengYuanPopup)  // 高速石油气泡
      // this.SetPopupCommon(this.glMap, [120.5, 30], this.chuangShengZhiHePopup)  // 创胜至合气泡
      // this.SetPopupCommon(this.glMap, [120.5, 30], this.gaoSuShangMaoPopup)  // 高速商贸气泡
      // this.SetPopupCommon(this.glMap, [120.5, 30], this.YingTongCanYingPopup)  // 盈通餐饮气泡
    },
    // 点击地图
    clickMap(lngLat) {
      // console.log(lngLat)
    },

    /**
     * map
     */
    // 初始化首页
    initIndexMap() {
      // 切换地图   glMapConfig0 为首页地图
      /* if(this.indexMapData.length !== 0) {
        this.glMap = new maplibregl.Map(glMapConfigIndex('glMap', zhejiangGeo));  // 初始化地图
      } else {
        this.glMap = new maplibregl.Map(glMapConfig('glMap', zhejiangGeo));  // 初始化地图
      } */
      this.glMap = this.zhejiangMap2;  // 初始化地图
      
      this.setMapConfig()  // 地图配置
      
      this.glmapEvent()  // 绑定事件
    },
    // 地图配置
    setMapConfig() {
      // 添加相关的地图控件
      this.glMap.addControl(new maplibregl.FullscreenControl(),'top-right'); 
      // this.glMap.addControl(new maplibregl.NavigationControl()); 
    },
    // 绑定点击事件
    glmapEvent() {
      // 点击地图
      this.glMap.on('click', e => {
        this.clickMap(e.lngLat)
      });

      // reload
      this.glMap.on('load', () => {
        this.setPopup()  // 气泡 - 测试

        /**
         * 业务
         */
        this.$nextTick(()=> {
          this.renderGeo()  // 定制geojson并渲染
          this.getImgMarker()  // 设置图片标注
        })
      });
    },
    /**
     * 配置标注
     * @param {*} lonlat 经纬度  [120.5, 30]
     * @param {*} mapPopup  气泡
     * @param {*} markerClass  标注样式
     */
    setMarkerConfig(lonlat, mapPopup, markerClass, isTab=false, item) {
      // console.log()
      let popup = this.SetPopupCommon(this.glMap, lonlat, mapPopup)  // 气泡

      let el = document.createElement('div');
      el.className = `map_marker ${markerClass}`;

      if(isTab) {
        el.addEventListener('click', e=> {
          // console.log(item)

          this.$emit('getMarkerData', item)
        })
      }

      new maplibregl.Marker(el)
      .setLngLat(lonlat)
      .setPopup(popup) // sets a popup on this marker
      .addTo(this.glMap);
    },
    setNoPopuoMarkerConfig(lonlat, markerClass, item) {
      let el = document.createElement('div');
      el.className = `no_popup_map_marker index_marker ${markerClass}`;

      el.addEventListener('click', e=> {
        // console.log(item)

        this.$emit('getMarkerData', item)
      })

      new maplibregl.Marker(el)
      .setLngLat(lonlat)
      .addTo(this.glMap);
    },
    // 设置图片标注
    getImgMarker() {
      this.removeAllMarker()

      this.mapDataList.forEach(item=> {
        switch(item.company_id) {
          case '6':
            this.setZtkjMarker(item)  // 中碳科技 6
            break
          case '8':
            this.setZjjrMarker(item)  // 浙江建融 8
            break
          case '4':
            this.setGssyMarker(item)  // 高速石油 4
            break
          case '5':
            this.setGsnyMarker(item)  // 高速能源 5
            break
          case '7':
            this.setCszhMarker(item)  // 创胜至合 7
            break
          case '10':
            this.setGssmMarker(item)  // 高速商贸 10
            break
          case '3':
            this.setYtcyMarker(item)  // 盈通餐饮 3
            break
          default:
            this.setMainMarker(item)  // 首页
        }
      })
    },
    // 移除所有标注
    removeAllMarker() {
      // 清除气泡
      this.removePopup()

      // 清除标注
      let markerList = document.querySelectorAll('.map_marker')
      if(markerList.length !== 0) {
        let markerParentNode = markerList[0].parentNode

        markerList.forEach(item=> {
          // console.log(item)
          markerParentNode.removeChild(item)
        })
      }
    },
    // 移除气泡
    removePopup() {
      let mapNode = document.querySelector('#glMap')
      // console.log(mapNode)

      let popupNode = document.querySelectorAll('.maplibregl-popup')
      if(popupNode.length !== 0) {
        mapNode.removeChild(popupNode[0])
      }
    },
    /**
     * 业务
     */
    // 判断标注
    checkMapMarker(item, label, popup, node) {
      if(item.latitude <= -90 || item.latitude > 90) {
        // item.latitude = 30
        return
      }

      if(node) {
        if(item.business_type.search(label) === 0) {
          this.setMarkerConfig([item.longitude, item.latitude], popup, node)
        }
      } else {
        node = popup
        popup = label
        
        // this.setMarkerConfig([item.longitude, item.latitude], this.zheShangJianRongPopup, 'map3_mksty1')
        this.setMarkerConfig([item.longitude, item.latitude], popup, node)
      }
    },
    // 中碳科技 6
    setZtkjMarker(item) {
      // console.log("中碳科技 6", item)

      this.zhonTanData = {
        ztdt1: item.shop_name,
        ztdt2: item.adress,
        ztdt3: item.pv_capacity,
        ztdt4: item.annual_pvenergy_output,
      }
      // 判断选项卡
      if(item.province.search(this.tabCurrent) === 0) {
        /* switch(item.business_type) {
          case '光伏电站':
            this.setMarkerConfig([item.longitude, item.latitude], this.zhonTanPopup, 'map2_mksty1')
            break
          case 'LNG场站':
            this.setMarkerConfig([item.longitude, item.latitude], this.zhonTanPopup, 'map2_mksty2')
            break
        } */
        this.checkMapMarker(item, '光伏电站', this.zhonTanPopup, 'map2_mksty1')
        this.checkMapMarker(item, 'LNG场站', this.zhonTanPopup, 'map2_mksty2')
      }
    },
    // 浙江建融 8
    setZjjrMarker(item) {
      // console.log("浙江建融 8", item)

      this.zheShangJianRongData = {
        zsjrdt1: item.shop_name,
      }

      this.checkMapMarker(item, this.zheShangJianRongPopup, 'map3_mksty1')
    },
    // 高速石油 4
    setGssyMarker(item) {
      // console.log("高速石油 4", item)

      this.gaoSuShiYouData = {
        gssydt1: item.shop_name,
        gssydt2: item.adress,
        gssytable1: {
          columns: ['指标', '数据'],
          gssytbData: [
            {
              gsytdCol1: '开业时间',
              gsytdCol2: item.open_date,
            },
            {
              gsytdCol1: '轻油年销量',
              gsytdCol2: {
                num: item.loil_lng_annual_sales,
                unit: '万吨'
              },
            },
            {
              gsytdCol1: '加油机',
              gsytdCol2: {
                num: item.oiling_machine,
                unit: '台'
              },
            },
            {
              gsytdCol1: '油枪',
              gsytdCol2: {
                num: item.oil_gun,
                unit: '把'
              },
            },
            {
              gsytdCol1: '员工',
              gsytdCol2: {
                num: item.employees,
                unit: '人'
              },
            }
          ]
        },
        gssytable2: {
          columns: ['本年指标', '数据'],
          gssytbData: [
            {
              gsytdCol1: '年成品油零售',
              gsytdCol2: {
                num: item.refind_oil_annual_sales,
                unit: '吨'
              },
            },
            {
              gsytdCol1: '92号汽油',
              gsytdCol2: {
                num: item.annual_sales_92,
                unit: '吨'
              },
            },
            {
              gsytdCol1: '95号汽油',
              gsytdCol2: {
                num: item.annual_sales_95,
                unit: '吨'
              },
            },
            {
              gsytdCol1: '98号汽油',
              gsytdCol2: {
                num: item.annual_sales_98,
                unit: '吨'
              },
            },
            {
              gsytdCol1: '柴油',
              gsytdCol2: {
                num: item.annual_sales_0,
                unit: '吨'
              },
            }
          ]
        },
      }

      this.checkMapMarker(item, this.gaoSuShiYouPopup, 'map4_mksty1')
    },
    // 高速能源 5
    setGsnyMarker(item) {
      // console.log("高速能源 5", item)

      this.gaoSuNengYuanData = {
        gsnydt1: item.shop_name,
        gsnydt2: item.adress,
        gsnytable1: {
          columns: ['指标', '数据'],
          gsnytbData: [
            {
              gnytdCol1: '加油机',
              gnytdCol2: {
                num: item.oiling_machine,
                unit: '台'
              }
            },
            {
              gnytdCol1: '油枪',
              gnytdCol2: {
                num: item.oil_gun,
                unit: '把'
              }
            },
            {
              gnytdCol1: '员工',
              gnytdCol2: {
                num: item.employees,
                unit: '人'
              }
            },
          ]
        },
        gsnytable2: {
          columns: ['本年指标', '数据'],
          gsnytbData: [
            {
              gnytdCol1: '成品油销量',
              gnytdCol2: {
                num: item.refind_oil_annual_sales,
                unit: '吨'
              },
            },
            {
              gnytdCol1: '92号汽油',
              gnytdCol2: {
                num: item.annual_sales_92,
                unit: '吨'
              },
            },
            {
              gnytdCol1: '95号汽油',
              gnytdCol2: {
                num: item.annual_sales_95,
                unit: '吨'
              },
            },
            {
              gnytdCol1: '98号汽油',
              gnytdCol2: {
                num: item.annual_sales_98,
                unit: '吨'
              },
            },
            {
              gnytdCol1: '柴油',
              gnytdCol2: {
                num: item.annual_sales_0,
                unit: '吨'
              },
            }
          ]
        },
      }

      this.checkMapMarker(item, this.gaoSuNengYuanPopup, 'map5_mksty1')
    },
    // 创胜至合 7
    setCszhMarker(item) {
      // console.log("创胜至合 7", item, this.tabCurrent)

      // console.log(item.shop_name, item.adress)

      this.chuangShengZhiHeData = {
        cszhdt1: item.shop_name,
        cszhdt2: item.adress,
        cszhtable: {
          columns: ['指标', '数据'],
          cszhtbData: [
            {
              cszhtdCol1: '今年累计营收(截止上月）',
              cszhtdCol2: {
                num: item.cumul_revenue,
                unit: '万元'
              }
            },
            {
              cszhtdCol1: '上月平均客单价',
              cszhtdCol2: {
                num: parseFloat(item.passenger_price).toFixed(2),
                unit: '元'
              }
            },
          ]
        }
      }

      // console.log(item.business_type)
      if(item.identifier.search(this.tabCurrent) === 0) {
        this.checkMapMarker(item, '肯德基', this.chuangShengZhiHePopup, 'map6_mksty1')
        this.checkMapMarker(item, 'COSTA', this.chuangShengZhiHePopup, 'map6_mksty2')
        this.checkMapMarker(item, 'DQ', this.chuangShengZhiHePopup, 'map6_mksty2')
        this.checkMapMarker(item, '驿茉茶', this.chuangShengZhiHePopup, 'map6_mksty3')
      }
    },
    // 高速商贸 10
    setGssmMarker(item) {
      // console.log("高速商贸 10", item, this.tabCurrent)

      this.gaoSuShangMaoData = {
        gssmdt1: item.shop_name,
        gssmdt2: item.adress,
        gssmtable: {
          columns: ['指标', '数据'],
          gssmtbData: [
            {
              gssmtdCol1: '销售额',
              gssmtdCol2: {
                num: item.sale_amount,
                unit: '元'
              }
            },
            {
              gssmtdCol1: '客流量',
              gssmtdCol2: {
                num: item.passenger_flow,
                unit: '人'
              }
            },
            {
              gssmtdCol1: '客单价',
              gssmtdCol2: {
                num: parseFloat(item.passenger_price).toFixed(2),
                unit: '元'
              }
            }
          ]
        }
      }

      if(item.province.search(this.tabCurrent) === 0) {
        switch(item.business_id) {
          // 直营店
          case '111':
            this.checkMapMarker(item, this.gaoSuShangMaoPopup, 'map7_mksty1')
            break
          // 加盟店
          case '222':
            this.checkMapMarker(item, this.gaoSuShangMaoPopup, 'map7_mksty2')
        } 
      }
    },
    // 盈通餐饮 3
    setYtcyMarker(item) {
      // console.log("盈通餐饮 3", item)

      this.YingTongCanYingData = {
        ytcydt1: item.shop_name,
        ytcydt2: item.adress,
        ytcytable: {
          columns: ['指标', '数据'],
          ytcytbData: [
            {
              ytcytdCol1: '开业时间',
              ytcytdCol2: {
                num: item.open_date,
                unit: ''
              }
            },
            {
              ytcytdCol1: '员工总计',
              ytcytdCol2: {
                num: item.employees,
                unit: '人'
              }
            },
            {
              ytcytdCol1: '累计营收',
              ytcytdCol2: {
                num: item.cumul_revenue,
                unit: '万元'
              }
            }
          ]
        }
      }

      if(item.province.search(this.tabCurrent) === 0) {
        this.checkMapMarker(item, this.YingTongCanYingPopup, 'map8_mksty1')
      }
    },
    // 首页标注
    setMainMarker(item) {
      // console.log('首页标注', item)

      this.mainPopupData = {
        mpdt1: '57%',  // 便利店到店转化率
        mpdt2: '12000kw·h',  // 光伏发电量
        mpdt3: '42元',  // 中餐单笔平均消费金额
        mpdt4: '56元',  // 西餐单笔平均消费金额
      }
      // this.setNoPopuoMarkerConfig([item.longitude, item.latitude], 'map0_mksty1', item)

      if(item.status === '正常' || item.status === '未录入') {
        // 繁忙 - 红 - 拥堵
        if(item.busy_level >= 100) {
          // this.setMarkerConfig([item.longitude, item.latitude], this.mainPopup, 'map1_mksty1', true, item)
          this.setNoPopuoMarkerConfig([item.longitude, item.latitude], 'map1_mksty1', item)
        }
        // 正常 - 黄 - 饱和
        if(item.busy_level>90 && item.busy_level<100) {
          // this.setMarkerConfig([item.longitude, item.latitude], this.mainPopup, 'map1_mksty1', true, item)
          this.setNoPopuoMarkerConfig([item.longitude, item.latitude], 'map1_mksty1', item)
        }
        // 空闲 - 绿 - 繁忙
        if(item.busy_level>70 && item.busy_level<90) {
          // this.setMarkerConfig([item.longitude, item.latitude], this.mainPopup, 'map1_mksty3', true, item)
          this.setNoPopuoMarkerConfig([item.longitude, item.latitude], 'map1_mksty3', item)
        }
        // 其他未知 - 蓝
        if(item.busy_level < 70) {
          // this.setMarkerConfig([item.longitude, item.latitude], this.mainPopup, 'map1_mksty5', true, item)
          this.setNoPopuoMarkerConfig([item.longitude, item.latitude], 'map1_mksty5', item)
        }
      } else {
        switch(item.status) {
          case '改造':
            this.setNoPopuoMarkerConfig([item.longitude, item.latitude], 'map1_mksty4', item)
            break;
          case '关闭':
            this.setNoPopuoMarkerConfig([item.longitude, item.latitude], 'map1_mksty2', item)
            break;
          case '管控':
            this.setNoPopuoMarkerConfig([item.longitude, item.latitude], 'map1_mksty6', item)
            break;
        }
      }
    }
  },

  destroyed() {
    if(this.glMap) {
      this.glMap.remove()
    }
  },
}
</script>

<style lang="less" scoped>
@import url('./less/marker');

.glmap_wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: #091f3f;

  // 选项卡
  .map_tab {
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 1;
  }

  .glMap_cont {
    ::v-deep .el-loading-mask {
      background-color: @loadingMask
    }
  }

  // 地图样式
  ::v-deep .maplibregl-map {
    // 气泡
    .maplibregl-popup {
      max-width: 260px !important;

      .maplibregl-popup-tip {
        border-top-color: rgba(12,38,77,0.7500);
        border-bottom-color: rgba(12,38,77,0.7500);
      }

      .maplibregl-popup-content {
        width: 100%;
        padding-top: 12px;
        border-top: solid 2px #3395be;
        background: rgba(12,38,77,0.7500);

        &>button {
          display: none;
        }

        .popupp_wrap {
          dt,dd,li,span,b,td {
            font-size: 12px;
          }

          table {
            width: 100%;
            margin-top: 10px;

            thead, tbody {
              th, td {
                padding: 2px 8px;

                &:first-child {
                  text-align: left;
                }
                &:last-child {
                  text-align: right;
                }
              }
            }

            thead {
              margin-bottom: 5px;

              tr {
                th {
                  font-weight: bold;
                  color: #58B2FF;
                }
              }
            }
            tbody {
              tr {
                td {
                  span {
                    margin-right: 6px;
                    color: #58B2FF;
                  }
                }

                &:nth-child(odd) {
                  background: rgba(79,135,228,0.2000);;
                }
              }
            }
          }

          // 首页大屏
          &.main_popupp {
            ul {
              li {
                span {
                  color: #34FFF0;
                  margin-left: 0px;
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