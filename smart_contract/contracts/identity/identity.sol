pragma solidity ^0.4.0;

contract identity {
    address owner;
    mapping(address => string) identityMapping;

    constructor(){
        owner = msg.sender;
    }

    function setIdentity(address ethAddress, string identityHash) public {
        require(owner == msg.sender);
        identityMapping[ethAddress] = identityHash;
    }

    function getIdentity(address ethAddress) public view{
        require(owner == msg.sender);
        return identityMapping[ethAddress];
    }
}
