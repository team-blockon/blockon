const Agent = require("../../../models/agent");
const Hangul = require("hangul-js");
const equals = require("array-equal");

exports.find = (req, res) =>{
    const name = req.query.name;

    let splitName = Hangul.disassemble(name);
    const assemble = (agents) => {
        return new Promise((resolve, reject) => {
            for(let agent of agents){
                agent.name = Hangul.assemble(agent.name);
            }
            resolve(agents);
        });
    };

    const filter = (agents) => {
        return new Promise((resolve, reject) => {

            const result = agents.filter( agent => agent.name.length >= splitName.length)
                .filter(agent => equals(agent.name.slice(0,splitName.length), splitName));

            resolve(result);
        });
    };

    const respond = (agents) => {
        res.json({
            result : true,
            message : agents
        })
    };

    Agent.find()
        .then(filter)
        .then(assemble)
        .then(respond);
};

exports.save = (req, res) => {
    const {name, address} = req.body;
    const disassemble = (name) => {
        return new Promise( (resolve,reject) => {

            let splitName = Hangul.disassemble(name);
           resolve(splitName);
        });
    };

    const create = (splitName) => {
        return Agent.create(splitName, address);
    };

    const respond = (agent) => {
        res.json({
            result : true,
            message : agent
        })
    };

    disassemble(name)
        .then(create)
        .then(respond);
};
