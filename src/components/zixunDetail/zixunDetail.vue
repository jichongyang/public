<template>
		<div id="zixunDetailWrap">
				<div class="topBox">
						<div class="contWrap">
				<span class="txWrap">
					<img src="./1.png" class="tx">
					<img src="./vv.png" class="v">
				</span>
								<img src="./over.png" class="tag">
								<img src="./reject.png" class="tag">
								<img src="./start.png" class="tag">
								<div class="box1">
										<span class="time">2017-03-26</span>
										<span class="name hidden">许燕</span>
										<span class="price">¥1000.00</span>
								</div>
								<p class="box2">
										海伦·凯勒致力于社会主义，源于她作为残疾人的特殊经历，以及她对其他残障者的同情。起先，她简化字母表，使之适合残障者使用﹔但是她很快意识到，单纯地解决失明问题，是治标不治本。通过研究她发现，盲人并非随机分布在各种人口中，而是集中在社会底层。穷人更容易由于生产事故或者得不到充分的治疗而失明。有些穷人沦为妓女，又多了一种因梅毒而导致失明的危险。于是，凯勒认识到，社会阶级制度控制着人一生的命运，有时甚至决定他们是否会失明。凯勒的研究并非书斋式的：“我参观过糖果店、工厂、棚户区。就算我看不见，我也闻得到。”
										海伦·凯勒作为社会主义者，是由1909年开始的。在1909年，她加入了马萨诸塞州的社会党。早在从拉德克利夫学院毕业之前，她就是一位社会激进分子。她本人强调，这并非由于在那里所受的任何教育。俄国革命爆发后，她对这个新</p>
								<div class="box3">
										<span class="sp1">知识产权</span>
										<span class="sp2">来源：律师喊话</span>
										<span class="sp3">需求地址：上海</span>
								</div>
						</div>
						<p class="btmMess">正在寻找匹配需求的律师，请您耐心等待......</p>
						<div class="returnBack">
								<span>驳回原因：</span>
								<p>未来客服后台可以做成,可选择驳回类型，或者手动输入驳回原因2种。</p>
						</div>
						<div class="otherLawyer">
				<span class="sp1">
					<img src="./1.png" class="tx">
					<img src="./vv.png" class="v">
				</span>
								<span class="sp2">张路平律师</span>
								<span class="sp3">18500609363</span>
								<span class="sp4">抢单成功！</span>
								<button>了解详情</button>
						</div>
				</div>
		</div>
</template>
<script>
		export default {
				data() {
						return {}
				},
				methods: {
						setHeight() {
						}
				}
		}
</script>
<style scoped>
		#zixunDetailWrap {
				width: 100%;
				height: auto;
				padding-bottom: 40px;
				
		}
		
		#zixunDetailWrap .topBox {
				width: 100%;
				padding-top: 57px;
				overflow: hidden;
		}
		
		#zixunDetailWrap .topBox .contWrap {
				width: 96%;
				height: auto;
				background: #ffffff;
				box-shadow: 0 2px 4px 0 rgba(165, 165, 165, 0.50);
				float: left;
				margin-left: 2%;
				position: relative;
				padding-top: 33px;
		}
		
		#zixunDetailWrap .topBox .contWrap .txWrap {
				width: 58px;
				height: 58px;
				border-radius: 100px;
				position: absolute;
				left: 50%;
				top: 0;
				margin-top: -29px;
				margin-left: -29px;
		}
		
		#zixunDetailWrap .topBox .contWrap .txWrap .tx {
				width: 58px;
				height: 58px;
				border-radius: 100px;
		}
		
		#zixunDetailWrap .topBox .contWrap .txWrap .v {
				width: 18px;
				position: absolute;
				right: 0;
				bottom: 0;
		}
		
		#zixunDetailWrap .topBox .contWrap .tag {
				width: 32px;
				position: absolute;
				left: 0;
				top: 0;
		}
		
		#zixunDetailWrap .topBox .contWrap .box1 {
				width: 90%;
				height: 30px;
				margin-left: 5%;
		}
		
		#zixunDetailWrap .topBox .contWrap .box1 .time {
				width: 100px;
				height: 30px;
				float: left;
				text-align: left;
				font-size: 1.2rem;
				color: #777274;
				line-height: 30px;
		}
		
		#zixunDetailWrap .topBox .contWrap .box1 .name {
				width: calc(100% - 200px);
				height: 30px;
				float: left;
				text-align: center;
				font-size: 1.4rem;
				color: #231f20;
				line-height: 30px;
		}
		
		#zixunDetailWrap .topBox .contWrap .box1 .price {
				width: 100px;
				height: 30px;
				float: right;
				text-align: right;
				font-size: 2rem;
				color: #ff7777;
				line-height: 30px;
		}
		
		#zixunDetailWrap .topBox .contWrap .box2 {
				width: 90%;
				height: auto;
				margin-left: 5%;
				font-size: 1.4rem;
				color: #231f20;
				line-height: 23px;
				text-align: justify;
				padding-bottom: 20px;
		}
		
		#zixunDetailWrap .topBox .contWrap .box3 {
				width: 100%;
				background: #f6f6f6;
				height: auto;
				font-size: 1.4rem;
				color: #231f20;
				line-height: 23px;
				text-align: justify;
				padding: 13px 0;
				overflow: hidden;
		}
		
		#zixunDetailWrap .topBox .contWrap .box3 .sp1 {
				float: left;
				height: 18px;
				line-height: 18px;
				padding: 0 5px;
				margin-left: 5%;
				background: rgba(0, 0, 0, 0.05);
				font-size: 1.1rem;
				color: #364c8b;
		}
		
		#zixunDetailWrap .topBox .contWrap .box3 .sp2 {
				float: right;
				height: 18px;
				line-height: 18px;
				margin-right: 5%;
				font-size: 1.1rem;
				color: #646363;
		}
		
		#zixunDetailWrap .topBox .contWrap .box3 .sp3 {
				width: calc(90% - 22px);
				float: left;
				height: 18px;
				line-height: 18px;
				margin-left: 5%;
				font-size: 1.1rem;
				color: #646363;
				margin-top: 10px;
				background: url(./address.png) no-repeat left center;
				background-size: auto 18px;
				padding-left: 22px;
		}
		
		#zixunDetailWrap .btmMess {
				width: 100%;
				font-size: 1.4rem;
				color: #8b572a;
				float: left;
				margin-top: 31px;
		}
		
		/* 驳回 */
		#zixunDetailWrap .returnBack {
				width: 100%;
				height: auto;
				overflow: hidden;
				margin-top: 15px;
				float: left;
		}
		
		#zixunDetailWrap .returnBack span {
				width: 90px;
				float: left;
				font-size: 1.4rem;
				color: #ff7777;
				margin-left: 28px;
		}
		
		#zixunDetailWrap .returnBack p {
				width: calc(100% - 150px);
				float: left;
				font-size: 1.4rem;
				color: #11000e;
				text-align: justify;
		}
		
		/*被其他律师抢到*/
		#zixunDetailWrap .otherLawyer {
				width: 100%;
				height: auto;
				overflow: hidden;
				margin-top: 15px;
				float: left;
		}
		
		#zixunDetailWrap .otherLawyer span {
				height: 28px;
				float: left;
				margin-right: 10px;
				line-height: 28px;
		}
		
		#zixunDetailWrap .otherLawyer .sp1 {
				width: 28px;
				height: 28px;
				border-radius: 100px;
				float: left;
				position: relative;
				margin-left: 29px;
		}
		
		#zixunDetailWrap .otherLawyer .sp1 .tx {
				width: 28px;
				height: 28px;
				float: left;
				border-radius: 100px;
		}
		
		#zixunDetailWrap .otherLawyer .sp1 .v {
				width: 14px;
				position: absolute;
				right: -4px;
				bottom: 0;
		}
		
		#zixunDetailWrap .otherLawyer .sp2 {
				font-size: 1.4rem;
				color: #231f20;
		}
		
		#zixunDetailWrap .otherLawyer .sp3 {
				font-size: 1.2rem;
				color: #231f20;
		}
		
		#zixunDetailWrap .otherLawyer .sp4 {
				font-size: 1.4rem;
				color: #04a44b;
		}
		
		#zixunDetailWrap .otherLawyer button {
				width: 24%;
				height: 26px;
				line-height: 26px;
				float: left;
				border: 1px solid #1978d0;
				border-radius: 100px;
				box-sizing: border-box;
				font-size: 1.4rem;
				color: #1978d0;
				background: none;
				margin: 20px 38%;
				
		}
</style>