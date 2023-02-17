function randomChar() {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{};:'\",.<>?/\\|`~";
    var output = chars.charAt(Math.floor(Math.random() * chars.length));
    return output;
}

setInterval(function () {
    console.log(randomChar());
    setTimeout(arguments.callee, Math.random() * (3000 - 500) + 50);
}, Math.random() * (3000 - 500) + 50);