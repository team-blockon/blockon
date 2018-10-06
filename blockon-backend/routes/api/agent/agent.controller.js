const Agent = require('../../../models/agent');
const Hangul = require('hangul-js');
const equals = require('array-equal');
const agentJSON = require('../../../models/json/agent.json');

/**
 * 중개사무소 이름을 자모음 분리하여 검색
 * @param {*} req
 * @param {*} res
 */
exports.find = (req, res) => {
  const name = req.query.name;
  const splitName = Hangul.disassemble(name); // 한글 자모음 배열로 분리

  //  DB에서 받아온 agent와 splitName이 일치하는 것만 남김
  const filter = agents => {
    return new Promise((resolve, reject) => {
      const result = agents
        .filter(agent => agent.name.length >= splitName.length) // DB 이름이 더 길어야 함
        .filter(
          agent => equals(agent.name.slice(0, splitName.length), splitName) // 길이가 같도록 DB 이름을 잘라서 비교
        );

      resolve(result);
    });
  };

  // 다시 각각의 agent들에 대해 자모음 조합
  const assemble = agents => {
    return new Promise((resolve, reject) => {
      const results = [];

      function Result(name, address) {
        this.name = name;
        this.address = address;
      }

      for (let agent of agents) {
        const name = Hangul.assemble(agent.name); // 한글 자모음 조합
        results.push(new Result(name, agent.address));
      }
      resolve(results);
    });
  };

  // 검색된 중개사무소의 배열 반환
  const respond = agents => {
    res.json({
      result: true,
      message: agents
    });
  };

  Agent.find()
    .then(filter)
    .then(assemble)
    .then(respond);
};

/**
 * 중개사무소 이름을 자모음 분리하여 저장
 * @param {*} req
 * @param {*} res
 */
exports.save = (req, res) => {
  const { name, address } = req.body;

  // 한글 자모음 분리
  const disassemble = name => {
    return new Promise((resolve, reject) => {
      const splitName = Hangul.disassemble(name);
      resolve(splitName);
    });
  };

  // 중개사무소 document 삽입
  const create = splitName => {
    return Agent.create(splitName, address);
  };

  // 생성된 document 반환
  const respond = agent => {
    res.json({
      result: true,
      message: agent
    });
  };

  disassemble(name)
    .then(create)
    .then(respond);
};

exports.search = (req, res) => {
  res.json(agentJSON);
};
