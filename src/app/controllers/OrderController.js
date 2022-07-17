const Order = require('../models/Order')
const Item = require('../models/Item');
class OrderController {

    index(req, res) {

        console.log("find All order");
        Order.find({}, (err, items) => {
            if (items) return res.status(200).send(items);
            else {
                res.status(404).send(err);
            }
        })


    }

    findOrder(req, res) {
        console.log("find Order");
        const {user_id, order_id} = req.body;
        console.log(user_id, order_id);
        Order.find({user_id: user_id},(err, user) => {
            const [result] = user.filter(order => order.order_item.orded.order_id === order_id);
            if(result) {
                return res.status(200).send(result);
            }
            else {
                return res.status(404).send({status: '404 Not Found'});
            }
        })
    }   

    addOrder(req, res) {
        console.log("add Order");
        const {user_id, order_item} = req.body;
        console.log(order_item)
        const newOrder = new Order({
            user_id: user_id,
            order_item: order_item,
        });
        newOrder.save((err) => {
            if (!err) return res.status(200).json({ message: "add" });
            return res.status(200).json({ error: err.message });
        })
    }

deleteOrder(req, res) {
    console.log("delete Card");
    console.log(req.body);
    Order.findOneAndUpdate({ user_id: req.body.user_id }, { $pull: { order_items: { order_id: req.body.order_item.order_id } } })
        .then(() => {
            console.log('deleted')
            Order.findOne({ user_id: req.body.user_id }, (err, user) => {
                if (user.items <= 0) {
                    user.delete();
                    return res.status(200).json({ items: [] });

                } else {
                    return res.status(200).json({ items: user.items });

                }
            })

        })
        .catch(err => res.status(500).json({ error: err }))

}
}

module.exports = new OrderController;