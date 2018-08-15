const Qna = require("../../../models/qna")

exports.save = (req, res) => {
    const { name, email, phone, feedback } = req.body;

    const respond = (qna) => {
        res.json({
            result : true,
            message : qna
        });
    };

    Qna.create(name, email, phone, feedback)
        .then(respond);
};

exports.find = (req, res) => {
    const { complete } = req.query;

    const respond = (qna) => {
        res.json({
            result : true,
            message : qna
        });
    };

    Qna.find({complete})
        .then(respond);
};