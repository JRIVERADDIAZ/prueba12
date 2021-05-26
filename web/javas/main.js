const productos = [
  {
    precio: 500,
    id: 1,
    title: "Café",
    stock: 0,
    thumbnailUrl: "https://picsum.photos/id/0/600",
    cantidad: 1,
  },
  {
    precio: 300,
    id: 2,
    title: "Pizza",
    stock: 18,
    thumbnailUrl: "https://picsum.photos/id/10/600",
    cantidad: 1,
  },
  {
    precio: 100,
    id: 3,
    title: "Agua",
    stock: 14,
    thumbnailUrl: "https://picsum.photos/id/20/600",
    cantidad: 1,
  },
  {
    precio: 50,
    id: 4,
    title: "Sandía",
    stock: 14,
    thumbnailUrl: "https://picsum.photos/id/30/600",
    cantidad: 1,
  },
  {
    precio: 10,
    id: 5,
    title: "Mango",
    stock: 12,
    thumbnailUrl: "https://picsum.photos/id/40/600",
    cantidad: 1,
  },
  {
    precio: 150,
    id: 6,
    title: "Caguama",
    stock: 9,
    thumbnailUrl: "https://picsum.photos/id/50/600",
    cantidad: 1,
  },
]; // base de datos <----
const contador = document.getElementById("container-card");
const incluir = document.getElementsByClassName("carrito")[0];
const total = document.getElementById("precioTotal");
const cantidadC = document.getElementById("contadorCarrito");
const cant = document.getElementById("cantidad");
const storage = localStorage.getItem("carrito");
let contar = 1;
let cantidadCarrito = 0;



//   pintar cards :
pintar = (productos) => {
  contador.innerHTML = "";
  productos.forEach((Producto) => {
    contador.innerHTML += ` 
      
      <div class="card" >  
        <figure>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ9DMN
              FHxwZcfPXJrJeBMITxPMP3FMZk_ixXzTfzt4G_C-G058" >
        </figure>
  
  <div class="contenido-card">
    <h2 id="art"> ${Producto.title}</h2>
    <p class="description"> <!-- descripcion -->gente en la compu</p>
      <h4 id="prec">${Producto.precio}</h4>
       <h3 id="stck">${Producto.stock}</h3>
        <button class="button" onclick="agregar(${Producto.id})"> agregar al carrito </button>
        </div>
      </div>`;
  });
};
if (productos.length > 1) {
  pintar(productos);
}

// agregar al carrito =)

function agregar(id) {
  let productoElegido = productos.find((el) => el.id == id);
  if (productoElegido.stock >= 1) {
    if (!carrito.some((el) => el.id == id)) {
      carrito.push({
        precio: productoElegido.precio,
        id: productoElegido.id,
        title: productoElegido.title,
        stock: productoElegido.stock,
        cantidad: 1,
      });
      cantidadCarrito += 1;
    } else {
      carrito.find((el) => el.id == id).cantidad += 1;
      cantidadCarrito += 1;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    activarCarrito();
    aum(id);
    dism(id);
  } else {
    alert("sin stock disponible");
  }
}

// quitar producto del carrito =(
function quitar(id) {
  let productoeliminado = carrito.find((el) => el.id == id);
  let indice = carrito.indexOf(productoeliminado);
  carrito.splice(indice, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  activarCarrito();
}

let activarCarrito = () => {
  incluir.innerHTML = ``;
  carrito.forEach((compra) => {
    incluir.innerHTML += `
    <p> ${compra.title} </p>
    <p>  el stock disponible es  : ${compra.stock} $ ${compra.precio} </p> 
    <button class="aum" onclick="aum(${compra.id})" > + </button>
    <p> cantidad a compras : ${compra.cantidad}</p>
    <button class="dism" onclick= "dism(${compra.id})" > - </button>
     <button class ="pagara" onclick="quitar(${compra.id})"> quitar del carrito </button>
`;
  });

  // contador carrito
  let cantidadCarrito = carrito.reduce((acc, el) => (acc += el.cantidad), 0);
  const cantidadC = document.getElementById("contadorCarrito");
  cantidadC.innerText = cantidadCarrito;
  // total
  let pagar = carrito.reduce((acc, el) => (acc += el.precio * el.cantidad), 0);
  total.innerHTML = `
   Precio total: $ ${pagar}  
  <button class ="pagara" onclick=pagar() > pagar </button>`;
};

aum = (id) => {
  let aumen = carrito.find((el) => el.id == id);
  if (aumen.stock > aumen.cantidad) {
    aumen.cantidad += 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  } else {
    alert("no hay stock");
  }
  activarCarrito();
};

dism = (id) => {
  let restar = carrito.find((el) => el.id == id);
  if (restar.cantidad === 1) {
    carrito.splice(restar, 1);
  } else {
    restar.cantidad -= 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  activarCarrito();
};

//  quitar de las cards el producto elegido -->
const pagar = () => {
  carrito.forEach((aquitar) => {
    let producto = productos.find((el) => el.id === aquitar.id);
    producto.stock -= aquitar.cantidad;
  });
  pintar(productos);

  carrito = [];
  total.innerHTML = `Precio total:0`;
  activarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
// quitarLocalS = (id) => {
//   carrito.find((el) => {
//     localStorage.removeItem(carrito.indexOf(el.id == id));
//   });
// };

let carrito = [];
if (storage != null) {
  carrito = JSON.parse(storage);
  activarCarrito()
} else {
  carrito = [];
}