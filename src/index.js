var jsQR = require('jsqr');

function onSelect(input) {
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = onLoad;
    reader.readAsDataURL(file);
}

function onLoad(e) {
    var src_data = e.target.result;
    var img = new Image();
    img.onload = analyze;
    img.src = src_data;
}

function analyze(e) {
    var image = e.target
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const context = canvas.getContext('2d')
    context.imageSmoothingEnabled = false
    context.drawImage(image, 0, 0)
    const imageData = context.getImageData(0, 0, image.width, image.height)

    const code = jsQR(imageData.data, image.width, image.height);
    if (code) {
        console.log("Found QR code", code);
        console.log(code.data, code.version);
        let code_value = window.document.getElementById("code_value");
        code_value.value = code.data;
        let code_version = window.document.getElementById("code_version");
        code_version.value = code.version;

    }
}

window.onSelect = onSelect;
window.onLoad = onLoad;