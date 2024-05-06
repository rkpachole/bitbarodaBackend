connection.query('SELECT tbl_product.id AS product_id, tbl_product.product_name AS part_name, tbl_product.product_code AS part_code, tbl_product.image AS image,tbl_transferstock.* FROM tbl_product LEFT JOIN tbl_transferstock ON tbl_product.id = tbl_transferstock.product_name WHERE tbl_transferstock.status = "' + user.status + '" and engineer_id = "' + user.id + '" ORDER BY id DESC', (error, findStock) => {
    if (findStock[0] == undefined) {
        const error = "stock not found"
        return callBack(error, null);
    } else {
        findStock.forEach(stock => {
            // stock.image = "http://192.168.29.47/OpenUrDreams_Admin_Html/backend/uploads/" + stock.image;
            stock.image = "http://ec2-52-206-101-177.compute-1.amazonaws.com/backend/uploads/" + stock.image;
        });
        return callBack(null, findStock);
    }
});