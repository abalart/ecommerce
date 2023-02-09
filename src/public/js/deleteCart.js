const handleSubmit = async (id) => {

    
    const deleteProduct = await fetch(`/api/carts/${pid}/product/${cid}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    } ); 

    location.reload()
}