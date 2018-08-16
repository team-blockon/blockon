const Blockon = artifacts.require("Blockon");

module.exports = async (deployer) => {
    await deployer.deploy(Blockon);
};
