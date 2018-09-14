const ipfsAPI = require('ipfs-api');
const multer = require('multer');
const fs = require('fs');
const Identity = require('../../../models/identity');
const FileTypeCheck = require('../../util/FileTypeCheck');

const PORT = '5001';
const HOST = 'ipfs.infura.io';
const ipfs = ipfsAPI({ host: HOST, port: PORT, protocol: 'https' });

//허용할 이미지타입
const imageType = ['jpg','png','jpeg'];

/**
 * 공인중개사 자격증을 업로드한다.
 * @param req body.ethAddress 중개인 이더리움 주소, file : identity 필드의 자격증 파일
 * @param res
 * @returns {Promise<void>}
 */
exports.uploadIdentity = async (req, res) => {
    const { ethAddress } = req.body;
    // const ethAddress ='abcdefaad1daaaa'; //테스트용
    const upload =  multer({
        storage: multer.memoryStorage(),
        fileFilter: async (req, file, cb) => {
            cb(null, FileTypeCheck.uploadFileType(file.mimetype,imageType));
        }
    }).single('identity'); // req.file은 identity 필드의 파일 정보

    /**
     * ipfs에 저장하고 db에 해쉬값을 저장한다.
     * @param file
     * @returns {Promise<ethAddress>}
     */
    const saveToIPFS = async file =>{
        console.log(file);
        const files =
            [{
                path: 'identity/' + file.originalname, //파일 이름을 유지하기위해 디렉토리 유지
                content: file.buffer
            }];
        const addedFile = await ipfs.add(files);
        console.log(addedFile);
        return Identity.create(ethAddress, addedFile[1].hash);
    };


    //하나의 계정에는 하나의 증명서만 저장
    if (!!await Identity.findOne({ethAddress})) {
        res.json({
            result : false,
            info : 'existed address'
        });
    }else {
        await upload(req, res, async err => {
            if(err){
                res.json({
                    result : false,
                    info : err
                });
            }else {
                const info = await saveToIPFS(req.file);
                res.json({
                    result : true,
                    info : info
                })
            }
        });
    }
};

/**
 * db에 저장되어있는 ipfs해쉬값을 불러오기 위한 함수
 * @param ethAddress
 * @returns {Promise<*>}
 */
const getIdentity = async ethAddress => {
    const identity = await Identity.findOne({ethAddress});
    return await ipfs.get(identity.idHash);
};

/**
 * 공인중개사 자격증 다운로드
 * TODO 확인용 기능만 만들어둔 상태
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.downloadIdentity = async (req,res) => {
    const {ethAddress} = req.params;
    console.log(ethAddress);
    const download = await getIdentity(ethAddress);

    const filename = download[1].path.split('/')[1];
    fs.writeFileSync(filename, download[1].content);
    res.json({
        result :true,
        info : download[0].path
    });
};

/**
 * ipfs에 저장된 증명서 확인
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.referenceIdentity = async (req,res) => {

    const {ethAddress} = req.params;

    const file = await getIdentity(ethAddress);
    const path = file[1].path;
    const image = await ipfs.cat(path);
    res.send(image);
};