function generateShortUrlHash(){
    let data = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let key = "";
    for(let i = 0; i < 6;i++){
        key += data[Math.floor(Math.random() * data.length)];
    }
    return key;
}

module.exports =  {
    generateShortUrlHash,
}