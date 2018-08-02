const Account = require("../../../models/account");

exports.save = (req, res) => {
    const { address, seller, consumer} = req.body;

    const isRightEmail = (email)=> {
        return new Promise((resolve, reject) => {
            Account.findByEmail(email)
                .then((account) => {
                    if (!account) {
                        reject(new Error("error"));
                    }
                })
                .then(() => {
                    resolve(true);
                });
        });
    };

    const respond = () => {
        res.json({
            message: "registered successfully"
        });
    };

    // 에러가 있을 때 실행되는 함수 (이미 존재하는 email)
    const onError = error => {
        res.status(409).json({
            message: error.message
        });
    };

        Promise.all([isRightEmail(seller), isRightEmail(consumer)])
        .then(respond)
        .catch(onError);
};


exports.find = (req, res) => {

};
