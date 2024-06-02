export const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'userId',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'courseId',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'completedPoint',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isPay',
        type: 'bool',
      },
    ],
    name: 'CertificateAdded',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_userId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_courseId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_completedPoint',
        type: 'string',
      },
    ],
    name: 'addCertificate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_userId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_courseId',
        type: 'string',
      },
    ],
    name: 'createCertificate',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_userId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_courseId',
        type: 'string',
      },
    ],
    name: 'getCertificate',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'userId',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'courseId',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'completedPoint',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isPay',
            type: 'bool',
          },
        ],
        internalType: 'struct CertificateContract.Certificate',
        name: 'item',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
