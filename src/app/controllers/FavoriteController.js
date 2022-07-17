const Favorite = require('../models/Favorite')
const Item = require('../models/Item');
class FavoriteController {

    index(req, res) {

        Favorite.find({}, (err, items) => {
            if (items) return res.status(200).send(items);
            else {
                res.status(404).send(err);
            }
        })
    }

    findFavorite(req, res) {
        console.log("find Favorite");
        Favorite.findOne({ user_id: req.body.user_id}, (err, user) => {
            console.log(user)
            if(!err) {
                return res.send({user});
            }
            else {
                res.status(404).send();
            }
        }) 
    }

    addFavorite(req, res) {
        console.log("add Favorite");
        console.log(req.body)
        // console.log(req.body)
        const item_code = req.body.items.item.item_code;
        const items = req.body.items;
        let flag;
        let isAddedItem = true;
        Item.findOne({ item_code: item_code }, (err, item) => {
            console.log('item : ', item);
            Favorite.findOne({ user_id: req.body.user_id }, (err, user) => {
                if (user) {
                    flag = true;
                }
                if (flag === true) {
                    const itemArray = user.items;
                    for (let i = 0; i < itemArray.length; i++) {
                        if (itemArray[i].item.item_code === item.item_code) isAddedItem = false;
                    }
                    console.log(isAddedItem);
                    if (isAddedItem) {
                        Favorite.findOneAndUpdate({ user_id: req.body.user_id }, { $push: { items: items } })
                            .then(() => {
                                console.log('Updated');
                                return res.status(200).json({ message: "change" });
                            })
                            .catch(err => res.status(500).json({ error: err }))
                    }
                    else {
                        return res.status(200).json({ message: "this is added item" });
                        
                    }

                } else {
                    const newFavorite = new Favorite({
                        user_id: req.body.user_id,
                        items: items,
                    });
                    newFavorite.save((err) => {
                        if (!err) return res.status(200).json({ message: "add" });
                        return res.status(200).json({ error: err.message });
                    })
                }

            })
        })
    }

    deleteFavorite(req, res) {
        console.log("delete Card");
        console.log(req.body);
        Favorite.findOneAndUpdate({ user_id: req.body.user_id }, { $pull: { items: { favorite_id : req.body.item.favorite_id } } })
            .then(() => {
                console.log('deleted')
                Favorite.findOne({ user_id: req.body.user_id }, (err, user) => {
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

module.exports = new FavoriteController;