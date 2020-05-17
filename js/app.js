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


	readUserData(); 

function readUserData() {

	const items = document.getElementById("items");


	var imgCount = 1;

	usersRef.on("value",snap=>{
		snap.forEach(childSnap=>{
			let key = childSnap.key, value = childSnap.val();
			console.log(value.name);

			var div = document.createElement("div");
			div.className = "single-products-catagory clearfix";

			var a = document.createElement("a"); 
			a.href = "shop.html";

			var img = document.createElement("img");
			img.src = "img/bg-img/"+imgCount+".jpg";
			img.alt = "";

			var hoverDiv = document.createElement("div");
			hoverDiv.className = "hover-content";

			var lineDiv = document.createElement("div");
			lineDiv.className = "line";

			var p = document.createElement("p");
			p.innerHTML = "From "+value.price;

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


/*
	 code to be embedded
	
<div class="single-products-catagory clearfix">
    <a href="shop.html">
        <img src="img/bg-img/9.jpg" alt="">
                        
            <div class="hover-content">
                <div class="line"></div>
                <p>From $318</p>
                <h4>Home Deco</h4>
            </div>
    </a>
</div>


*/