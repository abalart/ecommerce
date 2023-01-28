//En este archivo tenemos el socket del lado del cliente
const table = document.getElementById('productsTable')

const socket = io()


socket.on('updateProducts', data => {
   table.innerHTML = 
`<tr>
    <td><strong>Producto</strong></td>
    <td><strong>Descripcion</strong></td>
    <td><strong>Precio</strong></td>
    <td><strong>Codigo</strong></td>
    <td><strong>Stock</strong></td>
    <td><strong>Categoria</strong></td>
 </tr>`
 for(product of data){
    let tr = document.createElement('tr');
    tr.innerHTML= ` 
    <td>${product.title}</td>
    <td>${product.description}</td>
    <td>${product.price}</td>
    <td>${product.code}</td>
    <td>${product.stock}</td>
    <td>${product.category}</td>
    `
    table.getElementsByTagName("tbody")[0].appendChild(tr)
 }

})