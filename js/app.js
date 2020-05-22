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

function setSelectedProductData() {

}

function readDataOfSelectedProduct(e) {
	console.log("function called "+e.target.getAttribute("class"));
	const productRef = dbRef.child('Products/'+e.target.getAttribute("class"));

	var imageID = e.target.getAttribute("class");
	imageID++;

	localStorage.setItem("imageID",imageID);

	productRef.on("value",snap=>{
		console.log("Entered in Snap");
		snap.forEach(childSnap => {
			console.log(childSnap.key+"-"+childSnap.val());
			localStorage.setItem(childSnap.key,childSnap.val());
		}); 

	});
}

function saveCheckoutDetails() {

	var firstName = document.getElementById("first_name").value;
	var lastName = document.getElementById("last_name").value;
	var company = document.getElementById("company").value;
	var email = document.getElementById("email").value;
	var country = document.getElementById("country").value;
	var address = document.getElementById("street_address").value;
	var town = document.getElementById("city").value;
	var zipCode = document.getElementById("zipCode").value;
	var phone_number = document.getElementById("phone_number").value;
	var comment = document.getElementById("comment").value;

	console.log(firstName,lastName,company,email,country,address,town,zipCode,phone_number,comment);

	const customerRef = dbRef.child('Customers');
	document.getElementById("city").value = "";

	var newCustomer = {};

	newCustomer["firstName"] = firstName;
	newCustomer["lastName"] = lastName;
	newCustomer["company"] = company;
	newCustomer["email"] = email;
	newCustomer["country"] = country;
	newCustomer["address"] = address;
	newCustomer["town"] = town;
	newCustomer["zipCode"] = zipCode;
	newCustomer["phone_number"] = phone_number;
	newCustomer["comment"] = comment;

	customerRef.push(newCustomer);

	document.getElementById("first_name").value = "";
	document.getElementById("last_name").value = "";
	document.getElementById("company").value = "";
	document.getElementById("email").value = "";
	document.getElementById("country").value = "";
	document.getElementById("street_address").value = "";
	document.getElementById("city").value = "";
	document.getElementById("zipCode").value = "";
	document.getElementById("phone_number").value = "";
	document.getElementById("comment").value = "";

}

/*function shopping_page(ai){

	a = window.location.href="file:///C:/Users/vsn%20pooja/Documents/GitHub/SDT_FinalProject/shop.html";
	
	//var item-image = document.createElement("a"); 
	//	item-image.setAttribute("href","img-id"+imgCount);
}

function Display(){
	var cart=document.getElementById("button-submit").innerHTML="ADDED";
	//window.location.href="file:///C:/Users/vsn%20pooja/Documents/GitHub/SDT_FinalProject/cart.html";
}   */


