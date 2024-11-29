const { JsonRpcProvider, Contract } = require("ethers");
const mongoose = require("mongoose");

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/ethereumEvents", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Schema
const approvalEventSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  spender: { type: String, required: true },
  value: { type: String, required: true },
  blockNumber: { type: Number, required: true },
  transactionHash: { type: String, required: true },
});

// Create the Model
const ApprovalEvent = mongoose.model("ApprovalEvent", approvalEventSchema);


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
    for (const event of events) {
      const eventData = {
        owner: event.args.owner,
        spender: event.args.spender,
        value: event.args.value.toString(),
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
      };

      console.log(eventData);

      // Save the event data to MongoDB
      const newEvent = new ApprovalEvent(eventData);
      await newEvent.save();
      console.log("Event saved to MongoDB:", eventData.transactionHash);
    }
  } catch (error) {
    console.error("Error fetching Approval events:", error);
  }
}

// Call the function
fetchPastEvents();  make a structure for this file format
