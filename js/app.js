//File to edit the firebase
const config = {
  apiKey: "AIzaSyCsJ7XydJ9afZ_AVwX7Vq6QFb4T3GDQTmM",
  authDomain: "std-finalproject.firebaseapp.com",
  databaseURL: "https://std-finalproject.firebaseio.com",
  projectId: "std-finalproject",
  storageBucket: "std-finalproject.appspot.com",
  messagingSenderId: "237346519464",
  appId: "1:237346519464:web:daad679881cafce2a8c59d",
  measurementId: "G-Y60SEFXD7D"
};



firebase.initializeApp(config);

// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const usersRef = dbRef.child('Products');
const items = document.getElementById("items");


	readUserData(); 	

function readUserData() {
	var imgCount = 1;

	usersRef.on("value",snap=>{
		snap.forEach(childSnap=>{
			let key = childSnap.key, value = childSnap.val();
			console.log(key);

			var div = document.createElement("div");
			div.className = "single-products-catagory clearfix";

			var a = document.createElement("a");
			a.href = "shop.html";
			a.setAttribute("class", key);
			a.addEventListener("click",readDataOfSelectedProduct);

			var img = document.createElement("img");
			img.src = "img/bg-img/"+imgCount+".jpg";
			img.alt = "";
			a.setAttribute("imageUrl", img.src);

			var hoverDiv = document.createElement("div");
			hoverDiv.className = "hover-content";

			var lineDiv = document.createElement("div");
			lineDiv.className = "line";

			var p = document.createElement("p");
			p.innerHTML = "From $"+value.price;

			var h4 = document.createElement("h4");
			h4.innerHTML = value.name;

			hoverDiv.append(lineDiv);
			hoverDiv.append(p);
			hoverDiv.append(h4);

			a.append(img);
			a.append(hoverDiv);

			div.append(a);

			items.append(div); 
			imgCount++;   

		});
	})
}

function readDataOfSelectedProduct(e) {
	console.log("function called "+e.target.getAttribute("class"));
	const productRef = dbRef.child('Products/'+e.target.getAttribute("class"));


	productRef.on("value",snap=>{
		console.log("Entered in Snap");
		snap.forEach(childSnap => {
			console.log(childSnap.key+"-"+childSnap.val());
			localStorage.setItem(childSnap.key,childSnap.val());
		}); 

	});
	console.log("image url is " + e.target.getAttribute("imageUrl"));
	localStorage.setItem("imgUrl",e.target.getAttribute("imageUrl"));
}


/*function shopping_page(ai){

	let productNumbers=localStorage.setItem('cartNumbers')
	console.log(productNumbers);
	console.log(typeof productNumbers);
	localStorage.setItem('cartNumbers',1);
	const productRef = dbRef.child('Products/'+a.target.getAttribute("class"));
	productRef.on("value",snap=>{
			console.log("Entered in Snap");
			snap.forEach(childSnap => {
				console.log(childSnap.key+"-"+childSnap.val());
	});
		});
}

function Display(){
	var cart=document.getElementById("button-submit").innerHTML="ADDED";
	//window.location.href="file:///C:/Users/vsn%20pooja/Documents/GitHub/SDT_FinalProject/cart.html";
}   */


