let add = (cart, req) => {          //добавляем товары в корзину
    cart.contents.push(req.body);   //обращаемся к массиву contents в файле cart.json, вставляем в верстку body //req.body - то, что приходит из нашего запроса
    return JSON.stringify(cart, null, 4);   //преобразовываем объект в строку
};
let change = (cart, req) => {       //изменяем товары в корзине
    let find = cart.contents.find(el => el.id_product === +req.params.id);  //ищем по id наличие товаров в корзине
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};
let del = (cart, req) => {
    for (let i = 0; i < cart.contents.length; i++) {
        if (cart.contents[i].id_product === +req.params.id) {
            if (cart.contents[i].quantity > 1) {
                cart.contents[i].quantity -= 1;
            }
            if (cart.contents[i].quantity === 1) {
                cart.contents.splice(i,1);
            }
        }
    }

    return JSON.stringify(cart, null, 4);
};

module.exports = {  //экспортируем модули работы с корзиной
    add,
    change,
    del
};

//req - запрос