// document.addEventListener('DOMContentLoaded', () => {
    const removeBgBtn = document.getElementById('remove-bg-btn');
    const uploadImage = document.getElementById('upload-image');
    const output = document.getElementById('output');

    const search = document.querySelector('#search')
    const search_btn = document.querySelector('#search-btn')
    const img_container = document.querySelector('.img-container')


    removeBgBtn.addEventListener('click', async () => {
        if (uploadImage.files.length === 0) {
            alert('Please upload an image first!');
            return;
        }

        const formData = new FormData();
        formData.append('image_file', uploadImage.files[0]);

        const apiKey = 'oEJ1SWBcpN624Ycxxw4YF8MV'; // Replace with your Remove.bg API key

        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey
            },
            body: formData
        });

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        output.innerHTML = `<img src="${imageUrl}" alt="Image with Background Removed">`;
    });
// });



 

search_btn.addEventListener('click', async () => {
    const search_value = search.value
    console.log(search_value,"search_value")
    if ( search_value === '' ) {
        alert('Please enter a search term')
        return
    }else {
        const key = 'RuJTeKhXAyF9G-9VlCJJv1NlEMuCgGCDgIS-2Brjv3E'
        const url = `https://api.unsplash.com/search/photos?page=1&query=${search_value}&client_id=${key}`
        let data = await fetch(url)
        data = await data.json()
        console.log(data,"data")
        displayImages(data)
    }
})

function displayImages(data){
    img_container.innerHTML = ''
    data.results.forEach(element => {
        console.log(element.urls.regular,"element.urls.regular")
        const img = document.createElement('img')
        img.src=element.urls.regular
        img_container.appendChild(img)
    });
}