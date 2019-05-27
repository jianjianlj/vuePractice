<template>
	<div class="main-content">
		<div class="header flex-XC">
			<div class="header-left flex-left-C">
				<i class="iconfont icon-fanhui reback"></i>
				<i class="iconfont icon-caidanlan menu-bar"></i>
			</div>
			<div class="header-center flex-C">订餐</div>
			<div class="header-right flex-right">
				<i class="iconfont icon-dot more"></i>
			</div>
		</div>
		<div class="commodities">
			<div class="commodities-left">
				<div class="commodities-classifies flex-C" :class="{bagActive: item.colorChangeFlag}" v-for="item in commoditiesList" :key="item.type" @click="commoditySwitching(item.type)">
					<div class="selected-flag" v-if="item.colorChangeFlag" ></div>
					<div class="single-commodity flex-C" :class="{active: item.colorChangeFlag}">{{item.name}}</div>
				</div>
			</div>
			<div class="commodities-right-maxHeight">
				<div class="commodities-right-autoHeight">
					<div class="commodities-right flex-Y">
						<div class="commodities-detail flex-left" v-for="(item,index) in commodityPropertityList" :key="index">
							<div class="commodity-img">
								<img :src="item.commodityImg" alt="">
							</div>
							<div class="comodity-description flex-Y">
								<div class="comodity-name">
									<div class="comodity-name-one">{{item.commodityName}}</div>
									<div class="comodity-name-two">{{item.comodityDescriptios}}</div>
								</div>
								<div class="comodity-total flex-XC">
									<div class="comodity-prices" ><span>¥</span>{{item.price}}</div>
									<div class="addSub-num flex-right">
										<!-- <div class="comoditity-sub flex-C" v-if="item.cnt">-</div>
										<div class="comoditity-num flex-C" v-if="item.cnt">{{item.cnt}}</div> -->
										<div class="comodity-sub flex-C" v-if="item.cnt" @click="sub(item.id,item.type)">-</div>
										<div class="comodity-num flex-C" v-if="item.cnt" >{{item.cnt}}</div>
										<div class="comodity-add flex-C" @click="add(item.id,item.type)">+</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		<div class="shopping-car-commodities" v-if="showShopCarContent">
			<div class="shoping-car-header flex-XC">
				<div class="commodity-selected flex-left-C">已选商品</div>
				<div class="delete-all-comodities flex-right" >
					<i class="iconfont icon-qingkong"></i>
					<span @click="deleteALL">清空</span>
				</div>
			</div>
			<div class="maxHidth">
				<div class="autoHeight">
					<div class="shoping-car-content flex-XC" v-for="(item,index) in shopCarComodityList" :key="index">
						<div class="description flex-Y">
							<div class="description-name ">{{item.commodityName}}</div>
							<div class="description-likes">{{item.personLikes}}</div>
						</div>
						<div class="comodity-total-price flex-right-Y ">
							<div class="total-prices"><span>¥</span>{{item.price}}</div>
							<div class="shop-car-sub flex-C" @click="sub(item.id,item.type)">-</div>
							<div class="shop-car-num flex-C">{{item.cnt}}</div>
							<div class="shop-car-add flex-C" @click="add(item.id,item.type)">+</div>
						</div>
					</div>
				</div>
				
			</div>
			
		</div>
		<div class="cover" @click="showCover" v-if="coverDisplay"></div>
		<div class="footer flex-XC">
			<div class="shop-car-border1 flex-C">
				<div class="shop-car-border2 flex-C" @click="showCar" :class="{nocommodity: total}">
					<i class="iconfont icon-gouwuche"></i>
					<div class="shop-car-number flex-C" v-if="total">{{total}}</div>
				</div>
			</div>
			<div class="sum-price flex-left-C">
				<span v-if="total">
					<span class="selected-price" >¥</span>{{totalPrice}}
				</span>
				<span class="unselected-comodities" v-if="unselected">您还未选购商品</span>
			</div>
			<div class="buyer flex-right">
				<div class="buyer-border flex-C" :class="{unorder: total}">去下单</div>
			</div>
		</div>
	</div>
</template>

<script>
    

export default {
	name: 'Reservation',
	data () {
		return {
			commoditiesList: [
				{name: '美味锅物',colorChangeFlag: false,type: 1},
				{name: '日本料理',colorChangeFlag: false,type: 2},
				{name: '各式饮品',colorChangeFlag: true,type: 3},
				{name: '饭后甜点',colorChangeFlag: false,type: 4},
				{name: '豪华中餐帝王服务',colorChangeFlag: false,type: 5},
				{name: '可口水果',colorChangeFlag: false,type: 6},
			],
			total: 0,
			totalPrice: 0,
			shopCarPrice:0,
			shopCarNum: 0,
			shopCarComodityList: [],
			//各式饮品
			commodityPropertityList: [
				{
					commodityName: '网红茶（喜茶）',
					comodityDescriptios: '蜜柚汁',
					price: 16,
					commodityImg: require('@/assets/images/1.jpeg'),
					personLikes: '大杯/七分糖/少冰',
					type: 3,
					id: 0,
					cnt: 0,
				},
				{
					commodityName: '缤彩多分柠檬水',
					comodityDescriptios: '柠檬5片+冰糖',
					price: 21,
					commodityImg: require('@/assets/images/2.jpeg'),
					personLikes: '大杯/三分糖/多冰',
					type: 3,
					id: 1,
					cnt: 0,
				},
				{
					commodityName: '水果大杂烩',
					comodityDescriptios: '草莓+苹果+香蕉',
					price: 32,
					commodityImg: require('@/assets/images/3.jpg'),
					personLikes: '中杯/五糖/少冰',
					type: 3,
					id: 2,
					cnt: 0,
				},
				{
					commodityName: '养颜茉莉花茶',
					comodityDescriptios: '十里茉莉花香',
					price: 18.5,
					commodityImg: require('@/assets/images/4.jpg'),
					personLikes: '大杯/6分糖/热',
					type: 3,
					id: 3,
					cnt: 0,
				},
				{
					commodityName: '牛奶水果茶',
					comodityDescriptios: '牛奶+红富士苹果',
					price: 28,
					commodityImg: require('@/assets/images/5.jpg'),
					personLikes: '大杯/少糖/常温',
					type: 3,
					id: 4,
					cnt: 0,
				},
				{
					commodityName: '芒果乐园',
					comodityDescriptios: '泰国芒果3个',
					price: 38,
					commodityImg: require('@/assets/images/6.jpg'),
					personLikes: '超大杯/不要糖/少冰',
					type: 3,
					id: 5,
					cnt: 0,
				},
				
			],
			commoditiyPropeties: [
				// 美味锅务-start
				{
					commodityName: '玉米排骨煲',
					comodityDescriptios: '进口玉米+土猪肉',
					price: 59,
					commodityImg: require('@/assets/images/7.jpg'),
					personLikes: '大份/不要味精/少葱',
					type: 1,
					id: 0,
					cnt: 0,
				},
				{
					commodityName: '土豆烧猪蹄',
					comodityDescriptios: '黑猪蹄+红皮土豆',
					price: 99,
					commodityImg: require('@/assets/images/8.jpg'),
					personLikes: '中份/微辣/多蒜',
					type: 1,
					id: 1,
					cnt: 0,
				},
				{
					commodityName: '干锅香辣虾',
					comodityDescriptios: '鲜活基围虾15只',
					price: 108,
					commodityImg: require('@/assets/images/9.jpeg'),
					personLikes: '超大份/重辣/少盐',
					type: 1,
					id: 2,
					cnt: 0,
				},
				{
					commodityName: '老母鸡炖猪肚',
					comodityDescriptios: '土黑鸡',
					price: 159,
					commodityImg: require('@/assets/images/10.jpeg'),
					personLikes: '大份/少盐/加香菜',
					type: 1,
					id: 3,
					cnt: 0,
				},
				{
					commodityName: '香辣田螺',
					comodityDescriptios: '无沙小田螺',
					price: 88,
					commodityImg: require('@/assets/images/11.jpg'),
					personLikes: '中份/变态辣/加蒜',
					type: 1,
					id: 4,
					cnt: 0,
				},
				// 美味锅务-end

				//日本料理-start
				{
					commodityName: '香辣牛肉拌饭',
					comodityDescriptios: '黄牛肉+竹笋',
					price: 228.5,
					commodityImg: require('@/assets/images/12.jpg'),
					personLikes: '中份/变态辣/加蒜',
					type: 2,
					id: 0,
					cnt: 0,
				},
				{
					commodityName: '冰山海鲜大拼盘',
					comodityDescriptios: '日本空运三文鱼',
					price: 399,
					commodityImg: require('@/assets/images/13.jpeg'),
					personLikes: '中份/超级薄/多份芥末',
					type: 2,
					id: 1,
					cnt: 0,
				},
				{
					commodityName: '青蔬PARTY',
					comodityDescriptios: '紫菜西虹市',
					price: 19.9,
					commodityImg: require('@/assets/images/14.jpg'),
					personLikes: '中份/番茄酱',
					type: 2,
					id: 2,
					cnt: 0,
				},
				{
					commodityName: '三文鱼寿司',
					comodityDescriptios: '空运新鲜三文鱼',
					price: 228.5,
					commodityImg: require('@/assets/images/15.jpg'),
					personLikes: '芥末',
					type: 2,
					id: 3,
					cnt: 0,
				},
				{
					commodityName: '牛肉寿司',
					comodityDescriptios: '极品牛肉',
					price: 228.5,
					commodityImg: require('@/assets/images/16.jpeg'),
					personLikes: '芥末',
					type: 2,
					id: 4,
					cnt: 0,
				},
				//日本料理-end

				//各式饮品-start
				{
					commodityName: '网红茶（喜茶）',
					comodityDescriptios: '蜜柚汁',
					price: 16,
					commodityImg: require('@/assets/images/1.jpeg'),
					personLikes: '大杯/七分糖/少冰',
					type: 3,
					id: 0,
					cnt: 0,
				},
				{
					commodityName: '缤彩多分柠檬水',
					comodityDescriptios: '柠檬5片+冰糖',
					price: 21,
					commodityImg: require('@/assets/images/2.jpeg'),
					personLikes: '大杯/三分糖/多冰',
					type: 3,
					id: 1,
					cnt: 0,
				},
				{
					commodityName: '水果大杂烩',
					comodityDescriptios: '草莓+苹果+香蕉',
					price: 32,
					commodityImg: require('@/assets/images/3.jpg'),
					personLikes: '中杯/五糖/少冰',
					type: 3,
					id: 2,
					cnt: 0,
				},
				{
					commodityName: '养颜茉莉花茶',
					comodityDescriptios: '十里茉莉花香',
					price: 18.5,
					commodityImg: require('@/assets/images/4.jpg'),
					personLikes: '大杯/6分糖/热',
					type: 3,
					id: 3,
					cnt: 0,
				},
				{
					commodityName: '牛奶水果茶',
					comodityDescriptios: '牛奶+红富士苹果',
					price: 28,
					commodityImg: require('@/assets/images/5.jpg'),
					personLikes: '大杯/少糖/常温',
					type: 3,
					id: 4,
					cnt: 0,
				},
				{
					commodityName: '芒果乐园',
					comodityDescriptios: '泰国芒果3个',
					price: 38,
					commodityImg: require('@/assets/images/6.jpg'),
					personLikes: '超大杯/不要糖/少冰',
					type: 3,
					id: 5,
					cnt: 0,
				},
				//各式饮品-end

				//饭后甜点-start
				{
					commodityName: '曲奇饼干',
					comodityDescriptios: '10个',
					price: 10,
					commodityImg: require('@/assets/images/17.jpg'),
					personLikes: '高热量',
					type: 4,
					id: 0,
					cnt: 0,
				},
				{
					commodityName: '冰糖雪梨',
					comodityDescriptios: '枸杞+雪梨',
					price: 9.9,
					commodityImg: require('@/assets/images/18.jpg'),
					personLikes: '中份/少糖',
					type: 4,
					id: 1,
					cnt: 0,
				},
				{
					commodityName: '黑森林蛋糕',
					comodityDescriptios: '精致奶油+小麦粉',
					price: 15,
					commodityImg: require('@/assets/images/19.jpg'),
					personLikes: '小份',
					type: 4,
					id: 2,
					cnt: 0,
				},
				{
					commodityName: '酒量圆子',
					comodityDescriptios: '酒香醇厚',
					price: 12,
					commodityImg: require('@/assets/images/20.jpg'),
					personLikes: '中份',
					type: 4,
					id: 3,
					cnt: 0,
				},
				{
					commodityName: '牛奶拌芒果',
					comodityDescriptios: '2个芒果',
					price: 17,
					commodityImg: require('@/assets/images/21.jpg'),
					personLikes: '中份',
					type: 4,
					id: 4,
					cnt: 0,
				},
				//饭后甜点-end

				//豪华中餐帝王服务-start
				{
					commodityName: '狗不理包子',
					comodityDescriptios: '小麦粉+土猪肉',
					price: 10,
					commodityImg: require('@/assets/images/22.jpg'),
					personLikes: '中份',
					type: 5,
					id: 0,
					cnt: 0,
				},
				{
					commodityName: '辣子鸡丁',
					comodityDescriptios: '鸡胸肉',
					price: 39,
					commodityImg: require('@/assets/images/23.jpeg'),
					personLikes: '中份/变态辣/加蒜',
					type: 5,
					id: 1,
					cnt: 0,
				},
				{
					commodityName: '爆炒鱿鱼',
					comodityDescriptios: '海鲜',
					price: 78,
					commodityImg: require('@/assets/images/24.jpg'),
					personLikes: '大份/微辣辣/加蒜',
					type: 5,
					id: 2,
					cnt: 0,
				},
				{
					commodityName: '糯米鸡爪',
					comodityDescriptios: '3个',
					price: 16,
					commodityImg: require('@/assets/images/25.jpg'),
					personLikes: '中份/中辣',
					type: 5,
					id: 3,
					cnt: 0,
				},
				{
					commodityName: '霸王蟹',
					comodityDescriptios: '5只',
					price: 299,
					commodityImg: require('@/assets/images/26.jpg'),
					personLikes: '中份/醋',
					type: 5,
					id: 4,
					cnt: 0,
				},
				{
					commodityName: '蒜灼基围虾',
					comodityDescriptios: '活虾',
					price: 159,
					commodityImg: require('@/assets/images/27.jpg'),
					personLikes: '中份/变态辣/加蒜/醋',
					type: 5,
					id: 5,
					cnt: 0,
				},
				//豪华中餐帝王服务-end

				//可口水果-start
				{
					commodityName: '霸王香蕉',
					comodityDescriptios: '皮薄肉多',
					price: 14,
					commodityImg: require('@/assets/images/28.jpg'),
					personLikes: '中份',
					type: 6,
					id: 0,
					cnt: 0,
				},
				{
					commodityName: '李子',
					comodityDescriptios: '特别甜',
					price: 15,
					commodityImg: require('@/assets/images/29.jpg'),
					personLikes: '中份',
					type: 6,
					id: 1,
					cnt: 0,
				},
				{
					commodityName: '草莓',
					comodityDescriptios: '个大肉多',
					price: 39,
					commodityImg: require('@/assets/images/30.jpg'),
					personLikes: '大份',
					type: 6,
					id: 2,
					cnt: 0,
				},
				{
					commodityName: '石榴',
					comodityDescriptios: '软籽',
					price: 129,
					commodityImg: require('@/assets/images/31.jpg'),
					personLikes: '中份',
					type: 6,
					id: 3,
					cnt: 0,
				},
				{
					commodityName: '猕猴桃',
					comodityDescriptios: '可以存放几天使用',
					price: 89,
					commodityImg: require('@/assets/images/32.jpg'),
					personLikes: '中份',
					type: 6,
					id: 4,
					cnt: 0,
				},
				{
					commodityName: '葡萄',
					comodityDescriptios: '包甜',
					price: 99,
					commodityImg: require('@/assets/images/33.jpg'),
					personLikes: '大份',
					type: 6,
					id: 5,
					cnt: 0,
				},
				{
					commodityName: '杨桃',
					comodityDescriptios: '酸甜可口',
					price: 29,
					commodityImg: require('@/assets/images/34.jpg'),
					personLikes: '小份',
					type: 6,
					id: 6,
					cnt: 0,
				},
				{
					commodityName: '云南橙子',
					comodityDescriptios: '充足水分',
					price: 79,
					commodityImg: require('@/assets/images/35.jpg'),
					personLikes: '中份',
					type: 6,
					id: 7,
					cnt: 0,
				},
				{
					commodityName: '泰国榴莲',
					comodityDescriptios: '进口空运榴莲',
					price: 228.5,
					commodityImg: require('@/assets/images/36.jpg'),
					personLikes: '中份',
					type: 6,
					id: 8,
					cnt: 0,
				},
				//可口水果-end
			],
			showShopCarContent: false,
			coverDisplay: false,
			unselected: true,
		}
	},
	watch: {
		total(v) {
			if(v===0){
				this.unselected = true;
				this.showShopCarContent = false;
				this.coverDisplay = false;
			}else {
				this.unselected = false;
			}
		},
	},
	methods: {
		commoditySwitching(type) {
			this.commoditiesList.map(function(item,index){
				if(item.type ===type){
					item.colorChangeFlag = true;
				}else {
					item.colorChangeFlag = false;
				}
			});
			this.commodityPropertityList = this.commoditiyPropeties.filter(function(item,index){
				if(item.type === type){
					return item;
				}
			});
		},
		add(id,type) {
			this.shopCarNum = 0;
			this.shopCarPrice = 0;
			this.commodityPropertityList = this.commoditiyPropeties.filter(function(item,index){
				if(item.type === type){
					return item;
				}
			});
			this.commoditiyPropeties.map(function(item,index){
				if(item.type == type) {
					if(item.id === id){
						item.cnt = item.cnt +1 ;
					}
				}
				
			});
			this.shopCarComodityList = this.commoditiyPropeties.filter(function(item,index){
				if(item.cnt>0) {
					// this.total = this.toatl +item.cnt;
					return item;
				}
			});
			for(var i = 0;i<this.shopCarComodityList.length; i++){
				this.shopCarNum += this.shopCarComodityList[i].cnt;
				this.shopCarPrice += this.shopCarComodityList[i].cnt*this.shopCarComodityList[i].price;
			}
			this.total = this.shopCarNum;
			this.totalPrice = this.shopCarPrice;

		},
		sub(id,type) {
			this.shopCarNum = 0;
			this.shopCarPrice = 0;
			this.commoditiyPropeties.map(function(item,index){
				if(item.type === type) {
					if(item.id === id){
						item.cnt = item.cnt - 1 ;
					}
				}
				
			});
			this.shopCarComodityList = this.commoditiyPropeties.filter(function(item,index){
				if(item.cnt>0) {
					// this.total = this.toatl +item.cnt;
					return item;
				}
			});
			for(var i = 0;i<this.shopCarComodityList.length; i++){
				this.shopCarNum += this.shopCarComodityList[i].cnt;
				this.shopCarPrice += this.shopCarComodityList[i].cnt*this.shopCarComodityList[i].price;
			};
			this.total = this.shopCarNum;
			this.totalPrice = this.shopCarPrice;
		},
		carSub(id) {

		},
		carAdd(id) {

		},
		deleteALL() {
			this.shopCarComodityList = [];
			this.commoditiyPropeties.map(function(item,index){
				item.cnt = 0;
			})
			this.total = 0;
			this.totalPrice = 0;
			this.showShopCarContent = false;
			this.coverDisplay = false;
		},
		showCar() {
			if(this.total==0){
				return;
			}
			this.showShopCarContent = true;
			this.coverDisplay = true;
		},
		showCover() {
			this.coverDisplay = false;
			this.showShopCarContent = false;

		}
	},
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* @import '../assets/sty/common.css';
@import '../assets/sty/reservation.css'; */

.flex-XC {
    display: -webkit-flex; /* Safari */
    display: flex;
    align-items: center;
    justify-content: space-between;
    -webkit-align-items: center;
    -webkit-justify-content: space-between
}
.flex-X {
    display: -webkit-flex; /* Safari */
    display: flex;
    align-items: center;
    -webkit-align-items: center;
}

.flex-C {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
}
.flex-left-C{
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
}
.flex-left {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: flex-start;
    align-items: flex-start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
}
.flex-right {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
}
.flex-right-Y {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: flex-start;
    align-items: flex-start;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
}
.flex-YC {
    display: -webkit-flex; /* Safari */
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    justify-content: center;
    -webkit-justify-content: center;
}
.flex-Y {
    display: -webkit-flex; /* Safari */
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    align-items: flex-start;
}


.main-content {
    width: 100%;
    height: 100%;
    position: relative;
}
.header {
    width: 100%;
    height: 88px;
    background: #FFFFFF;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
}
.header-left {
    width: 30%;
    height: 100%;
}
.reback {
    font-size: 40px !important;
    color: #000000;
    font-weight: 900;
    margin-left: 30px;
    margin-right: 40.2px;
}
.menu-bar {
    font-size: 48px !important;
    color: #000000;
    font-weight: 900;
}
.header-center {
    width: 40%;
    height: 100%;
    font-family: PingFangSC-Regular;
    font-size: 36px;
    color: #000000;
    letter-spacing: 0;
    text-align: center;
    line-height: 36px;
}
.header-right {
    width: 30%;
    height: 100%;
}
.more {
    font-size: 60px !important; 
    color: #000000;
    margin-right: 30px;
    font-weight: 900;
}
.commodities {
    width: 100%;
    height: 100%;
    position: relative;
}
.commodities-left {
    width: 24%;
    height: 100%;
    position:fixed;
    background: #F8F8F8;
    top: 88px;
    left: 0px;
    z-index: 10;
}

.commodities-classifies {
    width: 100%;
    height: 118px;
    position: relative;
    /* background: #F8F8F8; */
}
.selected-flag {
    width: 8px;
    height: 30px;
    position: absolute;
    top: center;
    left: 0;
    background:#B88F64;
}
.single-commodity {
    width: 120px;
    height: 100%;
    font-family: PingFangSC-Light;
    font-size: 30px;
    color: #454545;
    letter-spacing: 0;
    /* line-height: 30px; */
}
.active {
    font-family: PingFangSC-Semibold;
    font-size: 30px;
    color: #B88F64;
    letter-spacing: 0;
    /* line-height: 30px; */
}
.bagActive {
    background: #FFFFFF;
}
.commodities-right-maxHeight{
	max-height: 1206px;
	width: 76%;
	top: 88px;position: fixed;
    right: 0;
	z-index: 10;
	overflow-y: auto;
	/* overflow: hidden; */
	
}
.commodities-right-autoHeight {
	width: 100%;
	height: auto;
	padding-bottom: 128.8px;
}
.commodities-right {
    width: 100%;
    height: 100%;
	background: #FFFFFF;
	/* overflow: hidden; */
	box-sizing: border-box;
	padding-bottom: 128.8px;
    /* overflow-y: auto; */
    
}
.commodities-detail {
    width: 100%;
    height: 180px;
    padding-left: 24px;
    margin-top: 24px;
    box-sizing: border-box;
}
.commodity-img {
    width: 180px;
    height: 180px;
    margin-right: 16px;
}
.commodity-img img{
    width: 100%;
    height: 100%;
}
.comodity-description {
    width: 64%;
    height: 180px;
}
.comodity-name {
    margin-top: 10px;
    margin-bottom: 57px;
}
.comodity-name-one {
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #454545;
    letter-spacing: 0;
    line-height: 36px;
}
.comodity-name-two {
    margin-top: 10px;
    font-family: PingFangSC-Light;
    font-size: 22px;
    color: #999999;
    letter-spacing: 0;
    line-height: 22px;
}
.comodity-total {
    width: 100%;
    height: 40px;
}
.comodity-prices {
    font-family: PingFangSC-Semibold;
    font-size: 30px;
    /* color: #002320; */
    color: #EF5350;
    letter-spacing: 0;
}
.comodity-prices span {
    font-size: 20px;
}
.comodity-sub {
    width: 39px;
    height: 39px;
    border: 1px solid #B88F64;
    border-radius: 8px;
    color: #B88F64;
    background: #FFFFFF;
    font-size: 20px;
    margin-right: 10px;
}
.comodity-num {
    width: 40px;
    height: 40px;
    font-family: PingFangSC-Medium;
    font-size: 28px;
    color: #454545;
    letter-spacing: 0;
    margin-right: 10px;
}
.comodity-add {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    color: #FFFFFF;
    background: #B88F64;
    font-size: 20px;
    margin-right: 37px;
}
.shopping-car-commodities {
    width: 100%;
    /* max-height: 800px; */
    /* overflow-y: auto; */
    position: fixed;
    bottom: 128.8px;
    left: 0;
    z-index: 300;
    background: #FFFFFF;
    padding-bottom: 32px;
}
.shoping-car-header {
    width: 100%;
    height: 100px; 
    border-bottom: 1px solid  #D8D8D8;
    background: #FFFFFF;
}
.commodity-selected {
    width: 40%;
    height: 100%;
    font-family: PingFangSC-Light;
    font-size: 36px;
    color: #454545;
    letter-spacing: 0;
    margin-left: 32px;
}
.delete-all-comodities {
    width: 60%;
    height: 100%;
    font-family: PingFangSC-Light;
    font-size: 30px;
    color: #999999;
    letter-spacing: 0;
    margin-right: 32px;
}
.delete-all-comodities span{
    width: 60px;
    /* height: 30px; */
}
.delete-all-comodities i {
    margin-right: 10px;
    font-size: 30px !important;
}
.maxHidth {
    width: 100%;
    max-height: 500px;
    overflow-y: auto;
}
.autoHeight {
    width: 100%;
    height: auto;
}
.shoping-car-content {
    width: 100%;
    height: 114px;
}
.description {
    width: 50%;
    height: 100%; 
    box-sizing: border-box;
    padding-left: 32px;
}
.description-name {
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #454545;
    letter-spacing: 0;
    margin-top: 22px;
    margin-bottom: 16px;
}
.description-likes {
    font-family: PingFangSC-Light;
    font-size: 24px;
    color: #999999;
    letter-spacing: 0;
}
.comodity-total-price {
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    padding-right: 32px;
    padding-top: 10px
}
.total-prices {
    font-family: PingFangSC-Semibold;
    font-size: 30px;
    color: #EF5350;
    letter-spacing: 0;
    margin-right: 32px;
}
.total-prices span {
    font-size: 20px;
}
.shop-car-sub {
    width: 39px;
    height: 39px;
    border: 1px solid #B88F64;
    border-radius: 8px;
    color: #B88F64;
    background: #FFFFFF;
    font-size: 20px;
    margin-right: 10px;
}
.shop-car-num {
    width: 40px;
    height: 40px;
    font-family: PingFangSC-Medium;
    font-size: 28px;
    color: #454545;
    letter-spacing: 0;
    margin-right: 10px;
}
.shop-car-add {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    color: #FFFFFF;
    background: #B88F64;
    font-size: 20px;
}
.footer {
    width: 100%;
    height: 128.8px;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #333333;
    z-index: 500;
}
.footer-part2 {
    width: 100%;
    height: 100%;
}
.sum-price {
    width: 60%;
    height: 100%;
    font-family: PingFangSC-Semibold;
    font-size: 48px;
    color: #FFFFFF;
    letter-spacing: 0;
    padding-left: 184px;
    box-sizing: border-box;
}
.selected-price {
    font-size: 28px;
}
.unselected-comodities {
    font-family: PingFangSC-Light;
    font-size: 30px;
    color: #C1C1C1;
    letter-spacing: 0;
}
.buyer {
    width: 40%;
    height: 100%;
}
.buyer-border {
    width: 210px;
    height: 80px;
    border-radius: 8px;
    color: #FFFFFF;
    /* opacity: 0.2; */
    background: #5B5B5B;
    font-family: PingFangSC-Medium;
    font-size: 30px;
    margin-right: 32px;
}
.shop-car-border1 {
    width: 138px;
    height: 138px;
    border-radius: 50%;
    background: #333333;
    position: absolute;
    left: 29px;
    bottom: 19px;
}
.shop-car-border2 {
    width: 104px;
    height: 104px;
    position: relative;
    border-radius: 52px;
    background: #5B5B5B;
    /* background: #B88F64; */
    color: #FFFFFF;
}
.shop-car-border2 i {
    font-size: 54px !important;
}
.shop-car-number {
    width: 34px;
    height: 34px;
    background: #EF5350;
    border-radius: 17px;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #FFFFFF;
    letter-spacing: 0;
    position: absolute;
    bottom: 72px;
    left: 65px;
}
.cover {
    width: 100%;
    /* height: 100%; */
    opacity: 0.4;
    background: #000000;
    position: fixed;
    top: 88px;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 250;
}
.nocommodity {
     background: #B88F64;
}
.unorder {
    background: #B88F64;
    color: #FFFFFF;
}

</style>
