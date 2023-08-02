export function LockIcon()
{
	return (
		<div className={"lock-icon"}>
			<svg width="57" height="83" viewBox="0 0 57 83" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M3.71739 83H53.2826C55.3356 83 57 81.3108 57 79.2273V36.4697C57 34.3861 55.3356 32.697 53.2826 
				32.697H49.5652V21.3788C49.5652 9.59052 40.1154 0 28.5 0C16.8846 0 7.43478 9.59052 7.43478 
				21.3788V32.697H3.71739C1.6644 32.697 0 34.3861 0 36.4697V79.2273C0 81.3108 1.6644 83 3.71739 83ZM32.2174 
				59.1025V64.1364C32.2174 66.2199 30.553 67.9091 28.5 67.9091C26.447 67.9091 24.7826 66.2199 24.7826 
				64.1364V59.1025C23.2788 57.9544 22.3043 56.1286 22.3043 54.0758C22.3043 50.6086 25.0837 47.7879 28.5 
				47.7879C31.9163 47.7879 34.6957 50.6086 34.6957 54.0758C34.6957 56.1286 33.7212 57.9544 32.2174 
				59.1025ZM14.8696 21.3788C14.8696 13.7511 20.9842 7.54545 28.5 7.54545C36.0158 7.54545 42.1304 13.7511 
				42.1304 21.3788V32.697H14.8696V21.3788Z" fill="white"/>
			</svg>
		</div>
	)
}

export function SettingIcon({onClick}: {onClick?:() => void})
{
	return (
		<div className="setting-icon">
			<svg  onMouseUp={onClick} width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g>
				<path d="M11.078 0C11.3724 0 11.635 0.183057 11.7339 0.457231L12.4397 2.4137C12.6931 2.47651 12.9108 
				2.5403 13.0943 2.60592C13.2952 2.6778 13.554 2.78741 13.8747 2.93586L15.5185 2.06597C15.7941 1.92009 
				16.1343 1.97376 16.3504 2.19719L17.796 3.6921C17.9879 3.89051 18.0422 4.18266 17.9343 4.43558L17.1629 
				6.24336C17.2913 6.47798 17.3939 6.67854 17.4711 6.84658C17.5554 7.02999 17.6588 7.28242 17.783 
				7.60671L19.5803 8.37623C19.8497 8.49156 20.017 8.76153 19.9986 9.0512L19.8669 11.1262C19.8495 11.4005 
				19.6688 11.6382 19.4073 11.7311L17.7049 12.3355C17.6563 12.5706 17.6054 12.7724 17.5515 12.9425C17.4883 
				13.1418 17.3891 13.398 17.2527 13.7156L18.1085 15.6069C18.2317 15.8792 18.1635 16.199 17.9396 
				16.399L16.3139 17.8509C16.0957 18.0457 15.7774 18.0841 15.5183 17.9469L13.8422 17.0591C13.5477 17.2125 
				13.2783 17.3349 13.0325 17.4263C12.8127 17.508 12.5685 17.5992 12.2998 17.7L11.65 19.5003C11.553 19.769 
				11.2984 19.9507 11.0099 19.9572L9.10928 20C8.813 20.0065 8.54493 19.827 8.44118 19.5525L7.6751 
				17.5257C7.32321 17.4027 7.06613 17.307 6.89898 17.2366C6.74059 17.1699 6.53544 17.0723 6.28059 
				16.9426L4.38191 17.7549C4.12577 17.8645 3.82822 17.8123 3.62585 17.6223L2.22107 16.3033C2.00593 16.1013 
				1.94386 15.7867 2.06644 15.5195L2.88322 13.7395C2.76017 13.498 2.65957 13.2838 2.58117 13.096C2.49858 
				12.8981 2.39862 12.6286 2.28009 12.2849L0.49171 11.7412C0.190472 11.6496 -0.0110086 11.3694 0.000465944 
				11.058L0.0712495 9.13704C0.0806273 8.88254 0.231319 8.65394 0.463027 8.54271L2.34097 7.64127C2.4276 
				7.32229 2.50387 7.07419 2.57165 6.89274C2.63879 6.71305 2.74293 6.4774 2.88544 6.18143L2.06997 
				4.45997C1.94312 4.19218 2.00337 3.87421 2.21965 3.66998L3.62443 2.34353C3.8244 2.15471 4.11841 2.10076 
				4.37358 2.20606L6.27211 2.98953C6.48235 2.85094 6.67247 2.73658 6.84371 2.64611C7.04934 2.53747 7.32258 
				2.42319 7.66838 2.29977L8.3279 0.458653C8.42637 0.183743 8.68934 0 8.9843 0H11.078ZM10.0237 7.01855C8.35715 
				7.01855 7.00614 8.35436 7.00614 10.0022C7.00614 11.65 8.35715 12.9858 10.0237 12.9858C11.6903 12.9858 
				13.0413 11.65 13.0413 10.0022C13.0413 8.35436 11.6903 7.01855 10.0237 7.01855Z" fill="white"/>
				</g>
			</svg>
		</div>
	)
}

export function AddUserIcon({onClick}: {onClick?:() => void})
{
	return (
		<svg width="35" viewBox="0 0 149 156" fill="none" xmlns="http://www.w3.org/2000/svg" onMouseUp={onClick}>
			<path d="M6.81402 136.829H63.8683C72.6112 148.499 86.1415 156 101.302 156C127.603 156 149 133.425 149
			 105.677C149 77.9295 127.603 55.3548 101.302 55.3548C85.635 55.3548 71.7085 63.3662 63.0079 75.7091C59.4814 
			 74.9289 55.8786 74.5253 52.2409 74.5253C23.4352 74.5253 0 99.25 0 129.641C0 133.611 3.05087 136.829 6.81402 
			 136.829ZM101.302 69.7327C120.088 69.7327 135.372 85.8575 135.372 105.677C135.372 125.497 120.088 141.622 
			 101.302 141.622C82.5156 141.622 67.2317 125.497 67.2317 105.677C67.2317 85.8575 82.5156 69.7327 101.302 
			 69.7327Z" fill="#E9E9E9"/>
			<path d="M52.2408 0C36.5222 0 23.735 13.4912 23.735 30.0742C23.735 46.6572 36.5222 60.1475 52.2408 
			60.1475C67.959 60.1475 80.7462 46.6572 80.7462 30.0742C80.7462 13.4912 67.959 0 52.2408 0Z" fill="#E9E9E9"/>
			<path d="M87.6738 112.866H94.4878V120.055C94.4878 124.026 97.5387 127.244 101.302 127.244C105.065 127.244 
			108.116 124.026 108.116 120.055V112.866H114.93C118.693 112.866 121.744 109.648 121.744 105.677C121.744 
			101.707 118.693 98.4885 114.93 98.4885H108.116V91.2995C108.116 87.3293 105.065 84.1106 101.302 84.1106C97.5387 
			84.1106 94.4878 87.3293 94.4878 91.2995V98.4885H87.6738C83.9106 98.4885 80.8597 101.707 80.8597 105.677C80.8597 
			109.648 83.9106 112.866 87.6738 112.866Z" fill="#E9E9E9"/>
		</svg>
	)
}

export function QuitIcon({onClick}: {onClick?:() => void})
{
	return (
		<div className={"xicon"}>
			<div onMouseUp={onClick} style={{transform: "rotateZ(45deg)", color: "rgb(207, 202, 202)", fontSize: 30, lineHeight: "15px"}}>
				+
			</div>
		</div>
	)
}

export function EmojiIcon()
{
	return (
		<svg width="20px" height="20px" viewBox="0 -2 159 159" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M81.0221 108.396C73.0067 108.224 66.8554 107.053 60.9927 104.481C56.6112 102.604 52.9025 99.4421 50.3568 
			95.4125C49.4088 93.9227 48.6551 92.1526 50.1882 90.8024C51.8871 89.3066 53.5739 90.2946 54.8822 91.7505C62.7371 100.508 
			72.9491 102.503 83.8573 100.888C93.0414 99.5281 99.9903 94.3202 104.002 85.6649C104.476 84.6492 104.788 83.3369 105.6 
			82.7532C106.751 81.927 108.478 81.0034 109.627 81.3217C110.804 81.6474 112.365 83.4208 112.364 84.5578C112.396 86.7814 
			111.814 88.9708 110.68 90.8844C103.327 102.107 92.9161 108.099 81.0221 108.396Z" fill="white"/>
			<path d="M101.13 53.3956C101.607 50.8278 101.853 48.9427 102.325 47.1158C102.9 44.8906 104.273 43.2729 106.672 
			42.9851C109.11 42.6959 111.043 43.7856 112.473 45.7114C115.047 49.1804 114.766 58.0815 112.02 61.3927C109.549 64.3722 
			105.037 64.2442 103.297 60.7928C102.079 58.3781 101.724 55.5259 101.13 53.3956Z" fill="white"/>
			<path d="M54.8842 53.5195C54.2071 56.0967 53.9363 58.2703 53.0729 60.1799C51.4565 63.7687 47.4214 64.192 45.2491 
			60.9478C42.3624 56.6364 42.1478 51.7195 43.8271 47.0052C45.1638 43.2525 50.0927 42.891 52.2149 46.3384C53.578 48.5533 
			54.0899 51.293 54.8842 53.5195Z" fill="white"/>
			<path d="M2.82302 55.9748C-4.18681 83.5259 1.95147 107.831 21.0802 128.223C21.5779 128.75 22.0858 129.277 22.5929 
			129.785C32.8687 140.06 45.6674 146.404 55.8084 150.819C60.1611 152.719 82.4948 155.028 88.5376 154.128C124.449 148.765 
			148.081 128.511 156.312 94.625C157.883 87.9872 158.666 81.1873 158.644 74.3661C158.682 58.2974 151.917 39.6163 137.964 
			25.6251C136.527 24.4373 135.096 23.2069 133.711 22.0145C130.71 19.4339 127.607 16.762 124.361 14.4834C99.563 -2.97008 
			73.7975 -3.06774 47.7835 6.1875C24.231 14.5618 9.10491 31.3158 2.82302 55.9748ZM47.8845 14.4373C70.7091 4.95246 93.6108 
			3.27855 115.948 17.4844C120.032 20.0847 130.92 28.8849 132.635 30.2067L132.745 30.2879L132.835 30.3889C141.55 39.6299 
			151.529 56.5268 151.308 73.8963C151.236 81.3232 150.23 88.7115 148.315 95.8878C142.642 116.511 129.077 131.541 106.846 
			141.821C84.2452 152.642 51.8342 141.702 43.2107 136.01C33.6794 129.493 25.3397 121.386 18.5559 112.043C7.91652 96.9802 
			5.52887 75.3276 11.246 55.5339C13.9218 46.3948 18.5977 37.9656 24.9347 30.8574C31.2717 23.7493 39.1111 18.1403 47.8845 
			14.4373Z" fill="white"/>
		</svg>

	)
}