export const TYPES = {
    EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' }
    ],
    ForwardData: [
        {name:"from",type:"address"},
        {name:"to",type:"address"},
        {name:"tradingTokenAddr",type:"address"},
        {name:"id",type:"uint256"},
        {name:"amount",type:"uint256"},
        {name:"value",type:"uint256"},
        {name:"nonce",type:"uint256"},
        {name:'deadline',type:"uint256"}
    ]
}

export const PRIMARY_TYPE = 'ForwardData';

export const REQUEST_METHOD = 'eth_signTypedData_v4';

export const ERC1155_ABI = [
    {
        inputs: [
            { internalType: 'string', name: '_uri', type: 'string' },
            { internalType: 'address', name: 'tradingToken1', type: 'address' },
            { internalType: 'address', name: 'tradingToken2', type: 'address' },
            { internalType: 'string', name: 'eip712Name', type: 'string' },
            { internalType: 'string', name: 'eip712Version', type: 'string' },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'account', type: 'address' },
            { indexed: true, internalType: 'address', name: 'operator', type: 'address' },
            { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
        ],
        name: 'ApprovalForAll',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
            { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { indexed: false, internalType: 'address[]', name: 'recipients', type: 'address[]' },
            { indexed: false, internalType: 'uint256[]', name: 'bps', type: 'uint256[]' },
        ],
        name: 'SecondarySaleFees',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'operator', type: 'address' },
            { indexed: true, internalType: 'address', name: 'from', type: 'address' },
            { indexed: true, internalType: 'address', name: 'to', type: 'address' },
            { indexed: false, internalType: 'uint256[]', name: 'ids', type: 'uint256[]' },
            { indexed: false, internalType: 'uint256[]', name: 'values', type: 'uint256[]' },
        ],
        name: 'TransferBatch',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'operator', type: 'address' },
            { indexed: true, internalType: 'address', name: 'from', type: 'address' },
            { indexed: true, internalType: 'address', name: 'to', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'TransferSingle',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: 'string', name: 'value', type: 'string' },
            { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
        ],
        name: 'URI',
        type: 'event',
    },
    { inputs: [], name: 'FEE_DIVISIONER', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
    {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'allowedTradingErc20Tokens',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'account', type: 'address' },
            { internalType: 'uint256', name: 'id', type: 'uint256' },
        ],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address[]', name: 'accounts', type: 'address[]' },
            { internalType: 'uint256[]', name: 'ids', type: 'uint256[]' },
        ],
        name: 'balanceOfBatch',
        outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'account', type: 'address' },
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'account', type: 'address' },
            { internalType: 'uint256[]', name: 'ids', type: 'uint256[]' },
            { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
        ],
        name: 'burnBatch',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
        name: 'getFeeBps',
        outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
        name: 'getFeeRecipients',
        outputs: [{ internalType: 'address payable[]', name: '', type: 'address[]' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: 'from', type: 'address' }],
        name: 'getNonce',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'account', type: 'address' },
            { internalType: 'address', name: 'operator', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            {
                components: [
                    { internalType: 'address payable', name: 'recipient', type: 'address' },
                    { internalType: 'uint256', name: 'value', type: 'uint256' },
                ],
                internalType: 'struct ERC1155.Fee',
                name: '_primaryFee',
                type: 'tuple',
            },
            {
                components: [
                    { internalType: 'address payable', name: 'recipient', type: 'address' },
                    { internalType: 'uint256', name: 'value', type: 'uint256' },
                ],
                internalType: 'struct ERC1155.Fee[]',
                name: '_secondaryFees',
                type: 'tuple[]',
            },
        ],
        name: 'mint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    { inputs: [], name: 'owner', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
    {
        inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        name: 'primaryFee',
        outputs: [
            { internalType: 'address payable', name: 'recipient', type: 'address' },
            { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256[]', name: 'ids', type: 'uint256[]' },
            { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
            { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        name: 'safeBatchTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint256', name: '', type: 'uint256' },
            { internalType: 'uint256', name: '', type: 'uint256' },
        ],
        name: 'secondaryFees',
        outputs: [
            { internalType: 'address payable', name: 'recipient', type: 'address' },
            { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'operator', type: 'address' },
            { internalType: 'bool', name: 'approved', type: 'bool' },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    { inputs: [{ internalType: 'string', name: '_uri', type: 'string' }], name: 'setBaseURI', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            { internalType: 'uint256', name: 'price', type: 'uint256' },
            { internalType: 'uint256', name: '_buyerNonce', type: 'uint256' },
            { internalType: 'address', name: 'tradingTokenAddress', type: 'address' },
            { internalType: 'uint256', name: '_deadline', type: 'uint256' },
            { internalType: 'bytes', name: 'sig', type: 'bytes' },
        ],
        name: 'tokenSale',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            { internalType: 'uint256', name: 'price', type: 'uint256' },
            { internalType: 'uint256', name: '_buyerNonce', type: 'uint256' },
            { internalType: 'address', name: 'tradingTokenAddress', type: 'address' },
            { internalType: 'uint256', name: '_deadline', type: 'uint256' },
            { internalType: 'bytes', name: 'sig', type: 'bytes' },
        ],
        name: 'tokenSaleFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    { inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }], name: 'transferOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'uri',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
];