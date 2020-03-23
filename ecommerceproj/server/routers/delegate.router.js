const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const ordersRouter = require('./orders.router');
const cartRouter = require('./cart.router');
const contactMailer = require('./contact.router');
const orderMailer = require('./orderMailer.router');

function delegateRoutesFor(app) {
    app.use('/api/products', productsRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/orders', ordersRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/mail', contactMailer);
    app.use('/api/mail', orderMailer);

    return app;
};

module.exports = delegateRoutesFor;