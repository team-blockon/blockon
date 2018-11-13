const abi = [
  {
    constant: true,
    inputs: [],
    name: 'isAgent',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'publicAddress',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: '_publicAddress',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'updateType',
        type: 'uint8'
      },
      {
        indexed: false,
        name: 'contractIndex',
        type: 'uint256'
      }
    ],
    name: 'UpdateContract',
    type: 'event'
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
        name: 'contractAddress',
        type: 'address'
      }
    ],
    name: 'AddContract',
    type: 'event'
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
        name: 'contractIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        name: 'confirmedState',
        type: 'uint8'
      }
    ],
    name: 'ConfirmChangeContractState',
    type: 'event'
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
        name: 'contractIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        name: 'revokedState',
        type: 'uint8'
      }
    ],
    name: 'RevokeConfirmation',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'publicAddress',
        type: 'address'
      }
    ],
    name: 'AthorizeAsAgent',
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'contractAddress',
        type: 'address'
      }
    ],
    name: 'addContract',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'index',
        type: 'uint256'
      },
      {
        name: 'newContractState',
        type: 'uint8'
      }
    ],
    name: 'confirmToChangeContractStateAt',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'contractAddress',
        type: 'address'
      },
      {
        name: 'newContractState',
        type: 'uint8'
      }
    ],
    name: 'confirmToChangeContractState',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'index',
        type: 'uint256'
      },
      {
        name: 'contractStateToRevoke',
        type: 'uint8'
      }
    ],
    name: 'revokeConfirmationAt',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'contractAddress',
        type: 'address'
      },
      {
        name: 'contractStateToRevoke',
        type: 'uint8'
      }
    ],
    name: 'revokeConfirmation',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'athorizeAsAgent',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'contractAddress',
        type: 'address'
      },
      {
        name: 'confirmedState',
        type: 'uint8'
      }
    ],
    name: 'emitConfirmChangeContractStateEvent',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'contractAddress',
        type: 'address'
      },
      {
        name: 'revokedState',
        type: 'uint8'
      }
    ],
    name: 'emitRevokeConfirmationEvent',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'contractAddress',
        type: 'address'
      }
    ],
    name: 'emitChangeContractStateEvent',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getContractsLength',
    outputs: [
      {
        name: 'contractsLength',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'getContractInfoAt',
    outputs: [
      {
        name: 'contractType',
        type: 'uint8'
      },
      {
        name: 'contractState',
        type: 'uint8'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'index',
        type: 'uint256'
      },
      {
        name: 'contractState',
        type: 'uint8'
      }
    ],
    name: 'hasConfirmed',
    outputs: [
      {
        name: 'isAgentConfirmed',
        type: 'bool'
      },
      {
        name: 'isSellerConfirmed',
        type: 'bool'
      },
      {
        name: 'isBuyerConfirmed',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'index',
        type: 'uint256'
      },
      {
        name: 'contractState',
        type: 'uint8'
      }
    ],
    name: 'hasExecuted',
    outputs: [
      {
        name: 'isChanged',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];

module.exports = abi;
