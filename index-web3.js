const { Web3 } = require("web3");

// Initialize provider and contract
const providerUrl = "https://1rpc.io/sepolia"; // Replace with your RPC provider URL
const web3 = new Web3(providerUrl); // No need to use `HttpProvider` explicitly
// console.log(web3);

const tokenAddress = "0x1F8C05495409f461B7725002bfC2Bc2a7AAE5176"; // Replace with your token contract address
const tokenABI = [
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
const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
// console.log(tokenContract);

// Fetch past events
async function fetchPastEvents() {
  try {
    // Get latest block for reference
    const latestBlock = await web3.eth.getBlockNumber();
    const fromBlock = Math.max(latestBlock - 5000, 0); // Query last 5000 blocks
    const toBlock = latestBlock;

    // Fetch events
    const events = await tokenContract.getPastEvents("Approval", {
      fromBlock,
      toBlock,
    });

    console.log("Fetched Approval Events:");
    events.forEach((event) => {
      console.log({
        owner: event.returnValues.owner,
        spender: event.returnValues.spender,
        value: event.returnValues.value,
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
      });
    });
  } catch (error) {
    console.error("Error fetching Approval events:", error);
  }
}

fetchPastEvents();
