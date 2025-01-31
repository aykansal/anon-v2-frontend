// constant data
const AOModule = "Do_Uc2Sju_ffp6Ev0AnLVdPtot15rvMjP-a9VVaA5fM"; // aos 2.0.1
const AOScheduler = "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA";

const CommonTags = [
  { name: "Name", value: "Anon" },
  { name: "Version", value: "0.2.1" },
  { name: "Authority", value: "fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY" }
];

import {
  spawn,
  message,
  createDataItemSigner,
  result,
  dryrun
} from "@permaweb/aoconnect";
import axios from 'axios';
import Arweave from "arweave";

const arweave = new Arweave({
  host: "ar-io.net",
  port: 443,
  protocol: "https"
});

// fetch root process data
const baseData = {
  query: `
   query ($entityId: String!, $limit: Int!, $sortOrder: SortOrder!, $cursor: String) {\n  transactions(\n    sort: $sortOrder\n    first: $limit\n    after: $cursor\n    recipients: [$entityId]\n    ingested_at: {min: 1696107600}\n  ) {\n    count\n    ...MessageFields\n    __typename\n  }\n}\nfragment MessageFields on TransactionConnection {\n  edges {\n    cursor\n    node {\n      id\n      ingested_at\n      recipient\n      block {\n        timestamp\n        height\n        __typename\n      }\n      tags {\n        name\n        value\n        __typename\n      }\n      data {\n        size\n        __typename\n      }\n      owner {\n        address\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}
  `,
  variables: {
    cursor: "",
    entityId: "",
    limit: 25,
    sortOrder: "INGESTED_AT_DESC"
  }
};

// nested message
const query1 = `
  query ($id: ID!) {
    transactions(ids: [$id], ingested_at: {min: 1696107600}) {
      ...MessageFields
      __typename
    }
  }

  fragment MessageFields on TransactionConnection {
    edges {
      cursor
      node {
        id
        ingested_at
        recipient
        block {
          timestamp
          height
          __typename
        }
        tags {
          name
          value
          __typename
        }
        data {
          size
          __typename
        }
        owner {
          address
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
`
const variables1 = processId => ({
  id: processId
})

// connect wallet
export async function connectWallet() {
  try {
    if (!window.arweaveWallet) {
      alert('No Arconnect detected');
      return;
    }
    await window.arweaveWallet.connect(
      ['ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'ACCESS_TOKENS'],
      {
        name: 'Anon',
        logo: 'https://arweave.net/jAvd7Z1CBd8gVF2D6ESj7SMCCUYxDX_z3vpp5aHdaYk',
      },
      {
        host: 'g8way.io',
        port: 443,
        protocol: 'https',
      }
    );
  } catch (error) {
    console.error(error);
  } finally {
    console.log('connection finished execution');
  }
};

// disconnect wallet
export async function disconnectWallet() {
  return await window.arweaveWallet.disconnect();
};

// get wallet details
export async function getWalletDetails() {
  const walletAddress = await window.arweaveWallet.getActiveAddress();
  const tokens = await window.arweaveWallet.userTokens();
  const tokenId = tokens[0].processId
  const balance = await window.arweaveWallet.tokenBalance(tokenId);
  return { walletAddress, balance };
};

// spawn process
export const spawnProcess = async (name, tags = []) => {
  try {
    const allTags = [...CommonTags, ...tags];
    if (name) {
      allTags.push({ name: "Name", value: name });
    }

    const processId = await spawn({
      module: 'qG-uo90351vUF7WPmUcObFtk7NU1isZYdPS0r2yQdKY',
      scheduler: AOScheduler,
      signer: createDataItemSigner(globalThis.arweaveWallet),
      tags: allTags
    });

    return processId;
  } catch (error) {
    console.error("Error spawning process:", error);
    throw error;
  }
};

// send message to process
export const messageAR = async ({ tags = [], data = '', anchor = '', process }) => {
  try {
    if (!process) throw new Error("Process ID is required.");

    const allTags = [...CommonTags, ...tags];
    const messageId = await message({
      data,
      anchor,
      process,
      tags: allTags,
      signer: createDataItemSigner(globalThis.arweaveWallet)
    });
    return messageId;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// utility function to fetch data using GraphQL
async function fetchGraphQL({ query, variables }) {
  const endpoint = 'https://arweave-search.goldsky.com/graphql';
  try {
    const response = await axios.post(endpoint, {
      query,
      variables
    });
    return response.data;
  } catch (err) {
    console.error(`Error fetching data:`, err);
    throw err;
  }
}

// fetch messages from arweave usign graphql
export const fetchMessagesAR = async ({ process }) => {
  try {
    baseData.variables.entityId = process;
    const messagesResponse = await fetchGraphQL({
      query: baseData.query,
      variables: baseData.variables
    });

    const messages = messagesResponse.data.transactions.edges.map(m => ({
      id: m.node.id,
      recipient: m.node.recipient,
      tags: m.node.tags,
      data: m.node.data,
      owner: m.node.owner.address,
      ingested_at: m.node.ingested_at
    }));

    const detailedMessages = await Promise.all(
      messages.map(async m => {
        try {
          const res = await axios.get(`https://arweave.net/${m.id}`);
          return { ...m, data: res.data };
        } catch (error) {
          console.error(`Error fetching message with ID ${m.id}:`, error);
          return null;
        }
      })
    );
    return detailedMessages.filter(m => m !== null);
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

// create payment transaction to arweave : Function Flow - Create->Sign->Verify->
export const transactionAR = async ({ data }) => {
  //sign transaction
  await window.arweaveWallet.connect(["SIGN_TRANSACTION", "DISPATCH"]);
  const transaction = await arweave.createTransaction({
    data
  });
  const uint8Array = new Uint8Array(transaction.data);
  const string = String.fromCharCode(...uint8Array);
  console.log(string);

  const signed = await window.arweaveWallet.dispatch(transaction);
  console.log(signed)
}

// export const fetchResultsAR = async (messageId, processId) => {
// console.log("fetching")
// let { Messages, Spawns, Output, Error } = await result({
//   // the arweave TXID of the message
//   message: messageId,
//   // the arweave TXID of the process
//   process: processId,
// });
// return {
//   Messages,
//   Spawns,
//   Output,
//   Error,
// }
// }