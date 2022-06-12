const pool = require('../../db');
const queriesOrders = require('../queries/queries.orders');



const getOrders = (req, res) => {
    pool.query(queriesOrders.getOrders, (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);

    });
}

const getOrdersById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queriesOrders.getOrdersById, [id], (err, results) => {
        if (err) throw err;
        res.status(200).json(results.rows);
    });
    
}


const addOrder = (req, res) => {
    const{id_users, id_product, total_order} = req.body;
    
    pool.query(queriesOrders.addOrder,
        [total_order, id_users, id_product], (err, results) => {
        if (err) throw err;
        res.status(201).send("Order Created Successfully!");
        })
}

const removeOrder = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queriesOrders.getOrdersById, [id], (err, results) => {
        const noUserFound = !results.rows.length;
        console.log(noUserFound);
        if(noUserFound) {
            return res.send("Order does not exist in the database!");
        };

        
        pool.query(queriesOrders.removeOrder,
            [id], (err, results) => {
            if (err) throw err; 
            return res.status(203).send("Order removed successfully.");
            
        });
    });

}

const updateOrder = (req, res) => {
    const id_order = parseInt(req.params.id_order);
    const {id_product} = req.body;
    const {total_order} = req.body;

    pool.query(queriesOrders.getOrdersById, [id_order], (err, results) => {
        const noUserFound = !results.rows.length;
        console.log(noUserFound);
        if(noUserFound) {
            return res.send("Item doest not exist in the database!");
        }
        if (id_product){
            pool.query(queriesOrders.updateOrder, [id_product, id_order], (err, results) => {
                if(err) throw err;
                return res.status(200).send("Order updated successfully :D");
            });
        } else if(total_order){
            pool.query(queriesOrders.updateOrderValue, [total_order, id_order], (err, results) => {
                if(err) throw err;
                return res.status(200).send("Value order updated successfully :D");
            });
        }
    });
}



module.exports = {
    getOrders,
    getOrdersById,
    addOrder,
    removeOrder,
    updateOrder,
}