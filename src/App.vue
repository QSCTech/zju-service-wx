<script>
	export default {
		onLaunch: async function() {
			console.log('App Launch');
			const code = await this.$store.dispatch("wxLogin");
			console.log(code);
			const user = await this.$store.dispatch("login", code);
			console.log("login first", user);
			if(user.name === "Unknown"){
				uni.navigateTo({
					url: "/pages/index/index",
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	uni-page-body, html, body{  
	    height: 100%;  
	}  
</style>
