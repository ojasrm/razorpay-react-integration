import logo from "./logo.svg";
import "./App.css";

function App() {
	const loadScript = (src) => {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = src;

			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	};
	const displayRazorpay = async (amount) => {
		const res = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);

		if (!res) {
			alert("Failed to load Razorpay");
			return;
		}

		const options = {
			key: "rzp_test_7YZxpMWv7sBQ8F",
			currency: "INR",
			amount: amount * 100,
			name: "Razorpay dummy App",
			description: "Thanks for buying",
			image:
				"https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-emoji-emoji-justicon-lineal-color-justicon-3.png",
			handler: function (response) {
				alert(response.razorpay_payment_id);
				alert("Payment successfull");
			},
			prefill: {
				name: "Razorpay dummy app",
			},
		};
		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};
	return (
		<div className="App">
			<h1>Razorpay Payment Gateway</h1>
			<img
				src="https://images.unsplash.com/photo-1592821266573-4c773cfc5507?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8aXBob25lfHx8fHx8MTY0NDQ5MzUyNA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300"
				alt="iphone"
			/>
			<button
				onClick={() => {
					displayRazorpay(50000);
				}}
			>
				Buy Now
			</button>
		</div>
	);
}

export default App;
