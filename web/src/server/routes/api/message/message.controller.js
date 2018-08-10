const Message = require('../../../models/message');

/**
 * 쪽지 보내기
 * @param req 나, 상대방, 메세지 정보
 * @param res
 */
exports.send = (req, res) => {
    const { to, from, info } = req.body;
    Message.send(to,from, info)
        .then( (message) => {
            res.json({
                result : true,
                message: message
            });
        });
};

/**
 * 쪽
 * @param req
 * @param res
 */
exports.read = (req, res) => {
    const {to, from} = req.query;
    Message.read(to, from)
        .then( (message) => {
            console.log(message);
            res.send( message );
        });
};