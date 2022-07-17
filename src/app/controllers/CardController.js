const Card = require('../models/Card')

class CardController {

    index(req, res) {

        Card.find({}, (err, card) => {
            if (card) return res.status(200).send(card);
            else {
                res.status(404).send(err);
            }
        })
    }

    postCard(req, res) {
        console.log("find Card");
        var user_id ;
        req.body.user ? user_id = req.body.user.user_id : null;
        Card.findOne({ user_id: user_id }, (err, card) => {
            if (!err) return res.status(200).send(card);
            else {
                res.status(404).send();
            }
        })
    }

    addCard(req, res) {
        console.log("add Card");
        console.log(req.body)
        let flag;
        Card.findOne({ user_id: req.body.user_id }, (err, user) => {
            if (user) {
                flag = true;
            }
            if (flag === true) {
                Card.findOneAndUpdate({ user_id: req.body.user_id }, { $push: { card: req.body.card } })
                    .then(() => {
                        Card.findOne({ user_id: req.body.user_id } , (err, user) => {
                            return res.status(200).json({ user: user })
                        })
                    })
                    .catch(err => res.status(500).json({ error: err }))
            } else {
                const newCard = new Card({
                    user_id: req.body.user_id,
                    card: req.body.card,
                });
                newCard.save((err) => {
                    if (!err) return res.status(200).json({ user: newCard });
                    return res.status(200).json({ error: err.message });
                })
            }
        })
    }

    deleteCard(req, res) {
        console.log("delete Card");

        console.log(req.body.user_id);
        Card.findOneAndUpdate({ user_id: req.body.user_id }, { $pull: { card: {card_id: req.body.card_id} } })
        .then(() => {
                Card.findOne({ user_id: req.body.user_id }, (err, user) => {
                    if(user.card <= 0) {
                        user.delete();
                        return res.status(200).json({ user: [] });

                    }else {
                        return res.status(200).json({ user: user.card });

                    }
                })
            
        })
        .catch(err => res.status(500).json({ error: err }))
   
    }
}

module.exports = new CardController;