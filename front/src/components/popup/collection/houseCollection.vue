<template>
	<transition name="collection">
		<div class="house-collection">
			<div class="more">
        <div @click="handleDelete">
          <span></span>
          <span></span>
          <span></span>
        </div>
			</div>
			<h1>地点-{{ house.city }}</h1>
			<houseListBase :houseList="house.hotel"></houseListBase>
			<DeleteCollection :vis="isShow" @status="handleOk" @show="value => isShow = value" belong_class="HotelRoom" :belong_id="belong_id"></DeleteCollection>
		</div>
	</transition>
</template>

<script>
	import houseListBase from '../../base/houseListBase'
  import Storage from '../../../utils/localStorage'
  import mixin from '../../../mixin/collection'
	export default {
		name: 'houseCollection',
		components: {
      houseListBase,
		},
    mixins: [mixin],
		data() {
			return {
				house: {},
			}
		},
		beforeMount() {

		},
		activated() {
      this.house = Storage.get('noe_check_collection')
			this.house.hotel.forEach(item => {
			  this.belong_id.push(item.hotel_id)
			})
		}
	}
</script>

<style scoped lang="less">
	.house-collection {
		height: calc(100vh - 110px);
		padding-bottom: 36px;
		margin-top: 74px;
		overflow-y: auto;
		h1 {
			padding: 0 36px;
			margin-top: 24px;
			font-size: 20px;
			color: #2E312F;
		}
		.more {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 74px;
			border-bottom: 1px solid #DCDFE6;
			span {
				display: inline-block;
				float: right;
				width: 6px;
				height: 6px;
				background-color: #2E3130;
				border-radius: 50%;
				margin-top: 34px;
				&:first-child {
					margin-right: 36px;
				}
				& + span {
					margin-right: 4px;
				}
			}
		}
	}
</style>
