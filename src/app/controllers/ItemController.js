
const Item = require('../models/Item');

class ItemController {
    //[GET item]
    index(req, res) {
        Item.find({}, (err, items) => {
            if(!err) return res.json(items);
            return res.status(400).json({ error : "ERROR!!!"});
      })
    }

    //[GET] /item/id/:id
    getById(req, res) {
        console.log(req.params.id)
        Item.findOne({_id: req.params.id}, (err, items) => {
            console.log("/GET /item/id/:id" , items);
            return res.json(items);
        })
    }
    // [GET] /item/:sex
    getBySex(req, res) {
        Item.find({sex: req.params.sex}, (err, items) => {
            res.json(items);
            // console.log(items);
        })
    }
    // [GET] /item/type/:sex
    getByType(req, res) {
        Item.find({type: req.params.type}, (err, items) => {
            res.json(items);
            // console.log(items);
        })
    }

    //[GET] /item/:sex/:type
    getBySexAndType(req, res) {
        Item.find({sex: req.params.sex, type: req.params.type}, (err, items) => {
            res.json(items);
        })
    }

 

}

module.exports = new ItemController;