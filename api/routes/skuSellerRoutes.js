'use strict';
module.exports = function(app) {
    var skuSeller = require('../controllers/skuSellertController');

    // skuSeller Routes
    app.route('/sku')
        .get(skuSeller.list_all_sku);


    app.route('/sku/:skuId')
        .get(skuSeller.list_sku);
};