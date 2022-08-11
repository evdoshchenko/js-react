//    FormData   JSON
function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');

        // FormData
        // // request.setRequestHeader('Content-type', 'multipart/form-data');  // not needed in XMLHttpRequest with form-data
        // const formData = new FormData(form);
        // request.send(formData);

        // JSON
        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);
        const object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        const json = JSON.stringify(object);
        request.send(json);
        // + in php file needed decoding json - $_POST = json_decode(file_get_contents("php://input"), true);

        request.addEventListener('load', () => {
            if (request.status === 200) {
                console.log(request.response);
                
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();
            } else {
                showThanksModal(message.failure);
            }
        });
    });
}