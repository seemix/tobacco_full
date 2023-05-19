const config = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ORDERS_PER_PAGE: process.env.ORDERS_PER_PAGE,
    PRODUCTS_PER_PAGE: process.env.PRODUCTS_PER_PAGE,
    TG_TOKEN: process.env.TG_TOKEN,
    TG_CHAT_ID: process.env.TG_CHAT_ID
}
module.exports = config;