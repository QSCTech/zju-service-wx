<template>
	<view class = "init">
		<view class = "input-container">
			<input
				class = "input-body"
				v-model = "text"
				placeholder = "搜索活动"
				placeholder-class = "input-placeholder"
				type = "text"
				@input = "handleSearchInput"
				confirm-type = "search"
				@confirm = "searchText"
			/>
		</view>
		<view class = "upd">
			<image
				style = "height: 40upx; width: 40upx"
				@tap = "searchText"
				src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyNiAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIyNiIgaGVpZ2h0PSIyMSIgZmlsbD0idXJsKCNwYXR0ZXJuMCkiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfNzA1XzIwMjMiIHRyYW5zZm9ybT0ibWF0cml4KDAuMDA4OTc0MzYgMCAwIDAuMDExMTExMSAwLjA5NjE1MzggMCkiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF83MDVfMjAyMyIgd2lkdGg9IjkwIiBoZWlnaHQ9IjkwIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUZvQUFBQmFDQVlBQUFBNHFFRUNBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBR0JVbEVRVlI0bk8yY3pXOWNOUkRBWFNRKzJ4NmdmRjRSZ2dNSUpMNUJJRGlnQWhLSWo3OGpRRzhRTGtVSUNTNlVrTUNoRjRpMlpHMHNKVjE3azFXQ3FoWXFXbWdWMFozWkpVRklVSXBLQ1EzaHdvRTJGVmswZmtsRnd2UGJENUpuKzhVL3lkSnFzM2s3YjNiZWVEeWVNV09SU0NRU2lVUWlrVWdrRXZrdlU2WDYxcXFvUDZrRTltdU93MXJnMTByZ0QwcmdINXJEZVJyMG10N1RITCtpenlTZmJlelVldnFxbEV0R1ZoZ3QxYTlYQW5ZcGdZZU5NZ1cyZWhySmozQzR3dUVWdXViRkw5anNWRGs4cWdVcXhmRkN6OHExajBXNnRwYjFSOWhtUlV0OFRIUDhZZ09VbXpvVWg4L3BSMldiaFhIWnZGRUpLQ2tPUzNrcGVjMlFxb3czc0NLamVPTkZNNkc1VVhEcm9uVW5NanpQaW9hVXpjdVVnUGU3czJJNG93U09LSUV2VVRTaFpQT1c4Ukc4ZXUvZTZVdHAwR3Q2ejBRYVpYelpmSmJEcjEyNGtpWE44VDI2RmlzQ1VqYTNhUUdmZFhiemVGWUxIQmlYZUUrdjMxY3A0NzNtUnhVNDMrRjNUcEtNTEdUR3htWjJLQTdITzdDdVU0cGpuNVJIcjF5djc2WnJtYWRCd004ZEtQc1l5Y3BDaEJZT2lzUFJOamU1U05hM2tSWmxGTTdoRGNYaFhKc2YrM2h3bGswK3VhMjc0UEN0S3ArNFBTK1pxcUoraHhJdzA4Nk5CT1d6eVVxemxZemN4Vko1cWxUZlN1RmRtNGhrRHdzQkxlclBaa1VYU3VBSHUzZTNMbkVsWDZ2VjJxSUV2SnNWalZUTCtBTHpmekdTRVNkekdHU2VvQVVNWlNoN3dlczhpZWF3TDh0ZHVMVGt0WkFzbVc2RTR6RHpOWGVSNFRLYVBxWXZwV3h1VXdKbXJRc2FINU5SdGdRUmhWVjVSaGZkb3NwNHB6VXR5K0VnOHdrdDhTSDdUQTV2TXM5UkF0NjJ5dStUVlp1Y3IyWEZ0NTZydlkwTSt4VEgwNVo3Mk05OGdHYm41UVI3MmdLZ2p3V0NFckRMdG5xdHlXK3U4MVpBU2hDRllNMnJVZ2FXUkJUbFRKaHJ6QjVmdWlVTXNNRFFIQWJURlEySG5BcG1sclRXalZTNG13V0dGbzM3YkpHVDA2ZlRKTjNUbFh5R0JVaXIxZHFpQmN5bDNWTkY0QlBPQkZNY1hyZFl3Q2NzVURRbHZOTG5uRmRkQ2pYczdlVFJJMVFQWWpHZWo1Z3JUSlZRNm9xcXNaTUZpaXJYbjdLNHd5UE9oTklDVDZZSk5UNkNON05BVWJUaG01NWsrdEdkVUJ3VzBvU2FsTTFyV0tDTWpjM3NzTGpEZVdkQzJVSTcyc3BpZ1NMTk5seDZpT2RNcUNJcXVsYjcvdkowMXdIbm5RbFZSTmVoUjZhdnRWajBnanVoTnRGa3FEaWM4aTY4b3lKeUZpaWF3OU1XMS9HbGR3c1dxb1ZqZ2FKczJVZ0JKWWRDWWI4bDVpeXpRRkVDaENXODYzY21GTGtJeXlwcWpoSTByRUJKcFNwdlBPNDBXVzRMOGFpcWt3VkdwVngvSU4xd2NKRlN3bDRtL3Frc2pBV0d0aFRWS0lFSFBNNTI0VmtmYXpuYVBKMi9lN3YzbWJrNUcxQzZWR1Zzem83dW03bUorVnh1WUlyQUE3RHFxYVRLOUJkTC9Qd3A4d1VxTXJGWUExbjFXOHh6dE1CM2dpaWdJYWlQejdKMFBVZEY0TXhUcXFKeGx5MXk4bUlTWEFzMVM5cUtIS25TM25sNGxFS2xNcnRkYy96T1lpQkxTc0NEekVkb21XcDlCQVZLLzhwMllUUzRzbDJDT2xLekd6WmhpSG1DNHZoaHhyd3lUK2xTNWpPS041NEp2YlZDaDlKVlN4MnBHUzdFdUJFWHJXWVY4c2xaN2lLa1ppR0NXc2lvbFN6N2htQ1dpc0R6alM3U0o3NDFGajFCMjFrc3FDV3RnQ09kTkhSV0tyUGJOMUtPVGhvNlZ5c2JKdzk5ZlBJS0ZsYUxNaDdyNE1aT201ekpPcTRpa3pKY3M2eE9YL0VWemJKTlEwNGJONkwvUGR0ekdLektFL2Yza3MrbS8wbFNuVEJrU3hBVld0bkdad3ZjMCtVeEVuTlVjRWlXVG1WYUU3eCtLeDBkUWFVTU5HaW52U0xoTnZwYmNoYVQyUm41clFzbExpM0xORkVvWlJPS3czTzJFZ1dkNDZBbmgyUWhtVWlKaFZRMldXTFNLdzUvTzFLMFhOdVRzbHlkcEFvMVFhN0srSEU0bUtNVkg4aktYUlRXc2xmWXp4c1BVNHVaYmZQZ2Y0NUZ5aWQzbXVvc3ZMSUp5aTNRamd3MTVuUVQ4Nlk4NGhlTTlYTHM2MlZuWkZNb2V3VnF6S0dlRWMzeE5hcTBwNU5zekpHWk5KRW11ZVBGNU1oTStJa3FpTXp4YmdMN3FTUmdQZEt4SFNsYllLMFF5blpOb1NkSTM0akt6dnZNUG80NlduWU9SR1huU0ZSMmprUmw1NGdKL1FUV1l1am5pYkpEUE4waFRHVnorRFBFR3ZIZ2xLMEUvT1ZUSFV0aGxlMjBTYitvMUpJbTBBRnlGMlRKcE9UZ1R1NE5DZkxKMFM5SElwRklKQktKUkNKc3cva0hJZHk4Z3FFNmtQb0FBQUFBU1VWT1JLNUNZSUk9Ii8+CjwvZGVmcz4KPC9zdmc+Cg=="
			></image>
		</view>
	</view>
</template>

<script>
export default {
data() {
	return {
		text: "",
	};
},
methods: {
	handleSearchInput(e){
		this.text = e.detail.value;
		console.log(this.text);
	},
	searchText(){
		this.$emit("search", this.text);
		this.text = "";
	},
},
}
</script>

<style>
.init {
	display: flex;
	flex-direction: row;
	background: #f4f3fe;
	box-shadow: inset 0px 4px 4px rgba(217, 217, 217, 0.3);
	border-radius: 20px;
	align-items: center;
	justify-content: center;
}
.input-container {
	height: 30px;
	width: 100%;
	flex-grow: 1;
	display: flex;
	align-items: center;
	padding-left: 10px;
	padding-right: 10px;
}
.input-container picker {
	width: 100%;
}
.input-body {
	width: 100%;
	color: #000000;
	font-family: 'Source Han Sans CN';
	font-size: 26upx;
}
.input-placeholder {
	flex-grow: 1;
	font-weight: 400;
	font-size: 26upx;
	line-height: 24px;
	color: #AAAABC;
	font-family: 'Source Han Sans CN';
}
.upd {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20upx;
}
</style>