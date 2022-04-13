import routers from '../routers/index.js';

const router_config = (app) => {
    app.use('/v1/api/type', routers.typeRouter);
    app.use('/v1/api/category', routers.categoryRouter);
    app.use('/v1/api/customer', routers.customerRouter);
    app.use('/v1/api/product', routers.productRouter);
    app.use('/v1/api/feedback', routers.feedbackRouter);
    app.use('/v1/api/order', routers.orderRouter);
    app.use('/v1/api/order-detail', routers.orderDetailRouter);
    app.use('/v1/api/auth', routers.authRouter);
}

export default router_config;