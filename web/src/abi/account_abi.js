const abi = [
  {
    'constant': true,
    'inputs': [],
    'name': 'isAgent',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'publicAddress',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'name': '_publicAddress',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'name': 'updateType',
        'type': 'uint8'
      },
      {
        'indexed': false,
        'name': 'contractIndex',
        'type': 'uint256'
      }
    ],
    'name': 'UpdateContract',
    'type': 'event'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'contractAddress',
        'type': 'address'
      }
    ],
    'name': 'addContract',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'index',
        'type': 'uint256'
      },
      {
        'name': 'newContractState',
        'type': 'uint8'
      }
    ],
    'name': 'changeContractStateAt',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'contractAddress',
        'type': 'address'
      },
      {
        'name': 'newContractState',
        'type': 'uint8'
      }
    ],
    'name': 'changeContractState',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'getContractsLength',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': 'index',
        'type': 'uint256'
      }
    ],
    'name': 'getContractInfoAt',
    'outputs': [
      {
        'name': 'contractType',
        'type': 'uint8'
      },
      {
        'name': 'contractState',
        'type': 'uint8'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'athorizeAsAgent',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
];

export default abi;
