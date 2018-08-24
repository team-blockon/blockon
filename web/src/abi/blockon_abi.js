const abi = [
  {
    'inputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'publicAddress',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'accountAddress',
        'type': 'address'
      }
    ],
    'name': 'CreateAccount',
    'type': 'event'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'publicAddress',
        'type': 'address'
      },
      {
        'name': 'email',
        'type': 'string'
      }
    ],
    'name': 'createAccount',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'agentID',
        'type': 'address'
      },
      {
        'name': 'sellerID',
        'type': 'address'
      },
      {
        'name': 'buyerID',
        'type': 'address'
      },
      {
        'name': 'contractType',
        'type': 'uint8'
      }
    ],
    'name': 'createContract',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'agentAccount',
        'type': 'address'
      },
      {
        'name': 'sellerAccount',
        'type': 'address'
      },
      {
        'name': 'buyerAccount',
        'type': 'address'
      },
      {
        'name': 'contractType',
        'type': 'uint8'
      }
    ],
    'name': 'createContractByAccountAddress',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': 'userEmail',
        'type': 'string'
      }
    ],
    'name': 'getUserAccount',
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
    'constant': true,
    'inputs': [
      {
        'name': 'userPublicAddress',
        'type': 'address'
      }
    ],
    'name': 'getUserAccount',
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
    'constant': false,
    'inputs': [
      {
        'name': 'userEmail',
        'type': 'string'
      }
    ],
    'name': 'athorizeAsAgent',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'userPublicAddress',
        'type': 'address'
      }
    ],
    'name': 'athorizeAsAgent',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
];

export default abi;
