axios.get('http://localhost:3000/menu')
.then(data => {
    data.data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
});

// <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
