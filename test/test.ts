let str = "";
for (let i = 0; i < 26; i++) {
    str += String.fromCharCode(65 + i) + String.fromCharCode(97 + i);
}

for (let i = 0; i <= 9; i++) {
    str += i;
}


function getRandomVerfiyCode(len = 6) {
    if (len <= 0) {
        len = 6;
    }
    let str = "";
    const randomString = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
    const randomStrLength = randomString.length;
    for (let i = 0; i < len; i++) {
        let randomIndex = Math.floor(Math.random() * (randomStrLength - 1));
        if (i % 2 === 0) {
            randomIndex = - randomIndex;
        }
        str += randomString.at(randomIndex);
    }
    return str;
}

console.log(getRandomVerfiyCode());