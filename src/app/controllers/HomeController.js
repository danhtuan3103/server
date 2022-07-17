
const Item = require('../models/Item');

class HomeController {

    // [GET] /home
    index(req, res) {
        Item.find({}, (err, items) => {
            if(!err) return res.json(items);
            return res.status(400).json({ error : "ERROR!!!"});
      })
    }
    post(req, res) {
        console.log(req.body);

        const newItem = new Item ({
            title: req.body.title,
            description: req.body.description,
            images: req.body.images,
            sex : req.body.sex,
            type : req.body.type,
            colors : req.body.colors,
            price : req.body.price,
            sizes : req.body.sizes,
            item_code: req.body.item_code
        });
        newItem.save((err) => {
            if(!err) return res.status(200).json({message: "success"});
            return res.status(200).json({error: err.message});
        })
    }
}

module.exports = new HomeController;