const { JsonRpcProvider, Contract } = require("ethers");

const contractABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
];

//     {
//       inputs: [
//         {
//           internalType: "string",
//           name: "_name",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "_symbol",
//           type: "string",
//         },
//         {
//           internalType: "uint8",
//           name: "_decimals",
//           type: "uint8",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "constructor",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "owner",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "spender",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "value",
//           type: "uint256",
//         },
//       ],
//       name: "Approval",
//       type: "event",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "spender",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "approve",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "burn",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "mint",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "recipient",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "transfer",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "value",
//           type: "uint256",
//         },
//       ],
//       name: "Transfer",
//       type: "event",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "sender",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "recipient",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "transferFrom",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       name: "allowance",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       name: "balanceOf",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "decimals",
//       outputs: [
//         {
//           internalType: "uint8",
//           name: "",
//           type: "uint8",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "name",
//       outputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "symbol",
//       outputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "totalSupply",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//   ];
// 1. Set up the provider
const provider = new JsonRpcProvider(
  "https://ethereum-sepolia-rpc.publicnode.com"
);

const contractAddress = "0x1F8C05495409f461B7725002bfC2Bc2a7AAE5176";

const tokenContract = new Contract(contractAddress, contractABI, provider);

async function fetchPastEvents() {
  try {
    const filter = tokenContract.filters.Approval(); // Create filter for the event

    const latestBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(latestBlock - 5000, 0); // Query last 5000 blocks
    const toBlock = latestBlock;

    const events = await tokenContract.queryFilter(filter, fromBlock, toBlock);

    console.log("Fetched Approval Events:");
    events.forEach((event) => {
      console.log({
        owner: event.args.owner,
        spender: event.args.spender,
        value: event.args.value.toString(),
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
      });
    });
  } catch (error) {
    console.error("Error fetching Approval events:", error);
  }
}

// Call the function
fetchPastEvents();
