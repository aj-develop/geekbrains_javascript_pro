const fs = require('fs');
const moment = require("moment");

let add = (cart, req) => {
    cart.contents.push(req.body);
    writeStats('добавлено', req.body);
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    if (req.body.action === 'increase') {
        find.quantity += req.body.quantity;
        writeStats('увеличено', find);
    } else if (req.body.action === 'decrease') {
        find.quantity -= req.body.quantity;
        writeStats('уменьшено', find);
    }
    return JSON.stringify(cart, null, 4);
};

let remove = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    cart.contents.splice(cart.contents.indexOf(find), 1);
    writeStats('удалено', find);

    return JSON.stringify(cart, null, 4);
};

let writeStats = (action, cartItem) => {
    fs.readFile('server/db/stats.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let newStatRecord = '{"date" : "' + moment().format() + '",';
            newStatRecord += '"action" : "' + action + '",';
            newStatRecord += '"id_product" : "' + cartItem.id_product + '",';
            newStatRecord += '"product_name" : "' + cartItem.product_name + '"}';
            let statOriginal = JSON.parse(data);
            statOriginal.push(JSON.parse(newStatRecord));
            fs.writeFile('server/db/stats.json', JSON.stringify(statOriginal, null, 4), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}

module.exports = {
    add,
    change,
    remove
};