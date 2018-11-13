const abi = [
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'publicAddress',
        type: 'address'
      },
      {
        indexed: false,
        name: 'accountAddress',
        type: 'address'
      }
    ],
    name: 'CreateAccount',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'agentAccount',
        type: 'address'
      },
      {
        indexed: true,
        name: 'sellerAccount',
        type: 'address'
      },
      {
        indexed: true,
        name: 'buyerAccount',
        type: 'address'
      },
      {
        indexed: false,
        name: 'baseContract',
        type: 'address'
      }
    ],
    name: 'CreateContract',
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'publicAddress',
        type: 'address'
      }
    ],
    name: 'createAccount',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'agentAccount',
        type: 'address'
      },
      {
        name: 'sellerAccount',
        type: 'address'
      },
      {
        name: 'buyerAccount',
        type: 'address'
      },
      {
        name: 'contractType',
        type: 'uint8'
      }
    ],
    name: 'createContract',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'accountAddress',
        type: 'address'
      }
    ],
    name: 'athorizeAsAgent',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

module.exports = abi;
