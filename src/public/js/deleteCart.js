const handleSubmit = async (id) => {

    
    const deleteProduct = await fetch(`/api/carts/241lh787a0ea57856123688o9/product/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    } ); 

    location.reload()
}