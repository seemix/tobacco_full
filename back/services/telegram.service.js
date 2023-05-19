const { TG_TOKEN, TG_CHAT_ID } = require('../config/config');
const axios = require('axios');
const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;

const sendTgMessage = async (order) => {
    let message = '<b>✅ Tobacco shop new order</b>\n\n';
    message += `<b>Customer:</b> ${order.customerName} ${order.customerSurname}\n`;
    message += `\n<b>☎️ Phone:</b> ${order.customerPhone}\n`;
    const products = order.products.map(item => {
        return {
            item:   `\n<pre>🔸${item.product.name} ${item.product.price} x ${item.count}</pre>`
        }
    });
    for (const product of products) {
        message += product.item
    }
    message += `\n\n<b><i>💰Total price is: </i><u>${order.total} DKK</u></b>\n`
    if(order.shipping) message += `\n🚚 <b>Shipping address: </b>${order.address}`
    await axios.post(url, {
        chat_id: TG_CHAT_ID,
        parse_mode: 'html',
        text: message
    }).then().catch(e => console.log(e))
};

module.exports = sendTgMessage;