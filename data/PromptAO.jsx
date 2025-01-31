import dedent from 'dedent';
import { LUA_COOKBOOK, LUA_COOKBOOK_USAGE_EXAMPLES } from './aodata';

export default {
  CHAT_PROMPT: dedent`
    🛠️ You're building a production-ready Arweave dApp with React. Core features:
    1. Secure wallet auth using provided connection flows
    2. AR data operations (store/retrieve/query)
    3. Real-time balance tracking with elegant animations
    4. Transaction history with GraphQL
    5. Process management (spawn/message)
    
    Response Guidelines:
    - Acknowledge using provided auth/AR functions
    - Explain architecture decisions
    - Highlight security measures
    - Keep under 15 lines
    - Include smooth animations and transitions
    - give a handlers.lua file containing code for arweave handlers 
    `,

  CODE_GEN_PROMPT: dedent`
    Generate a Project in React+arweave integration with elegant UI/UX. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.

Return the response in JSON format with the following schema:

json
Copy code
{
  "projectTitle": "",
  "explanation": "",
  "files": {
    "/App.js": {
      "code": ""
    },
    ...
  },
  "generatedFiles": []
}
Ensure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:
files:{
  "/App.js": {
    "code": "import React from 'react';\nimport './styles.css';\nexport default function App() {\n  return (\n    <div className='bg-gray-100 p-4 text-center'>\n      <h1 className='font-bold text-2xl text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\n    </div>\n  );\n}"
  }

    // Arweave Documentation
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
      createDataItemSigner
    } from "@permaweb/aoconnect"
    import axios from 'axios';

    // fetch root process data
    const baseData = {
      query: "   query ($entityId: String!, $limit: Int!, $sortOrder: SortOrder!, $cursor: String) {\n  transactions(\n    sort: $sortOrder\n    first: $limit\n    after: $cursor\n    recipients: [$entityId]\n    ingested_at: {min: 1696107600}\n  ) {\n    count\n    ...MessageFields\n    __typename\n  }\n}\nfragment MessageFields on TransactionConnection {\n  edges {\n    cursor\n    node {\n      id\n      ingested_at\n      recipient\n      block {\n        timestamp\n        height\n        __typename\n      }\n      tags {\n        name\n        value\n        __typename\n      }\n      data {\n        size\n        __typename\n      }\n      owner {\n        address\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}",
      variables: {
        cursor: "",
        entityId: "",
        limit: 25,
        sortOrder: "INGESTED_AT_DESC"
      }
    };

    // nested message
    const query1 = " query ($id: ID!) {
        transactions(ids: [$id], ingested_at: {min: 1696107600}) {
          ...MessageFields
          __typename
        }
      } fragment MessageFields on TransactionConnection {
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
      }"
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
          module: AOModule,
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
    export const messageAR = async ({ tags = [], data, anchor = '', process }) => {
      try {
        if (!process) throw new Error("Process ID is required.");
        if (!data) throw new Error("Data is required.");

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
        console.error("Error fetching data:", err);
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
              const res = await axios.get("https://arweave.net/",m.id);
              return { ...m, data: res.data }
            } catch (error) {
              console.error("Error fetching message", error);
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

    Make sure to add logic as well inthe handlers that you will create, and use sqlite for database storage in the arweave project.

    Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.
    - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,"firebase","@google/generative-ai" ) only when it required
    - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg
    - Add Emoji icons whenever needed to give good user experinence
    - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.
    - By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.
    - Use icons from lucide-react for logos.
    - Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.

    You don't have to directly create an app, you have to integrate these functions in the app that you would create, For example when you build a project, it would be a process that will be spawned only once automatically by you itself. Then all the major interactions(like chatting, payments, send messages and others) under that webdapp will be handled by through messages/transactionsp.
    Note: you have to understand where the arweave handlers can be integrated in the project and based on that you have to generate a separate lua.js file on the base file and integrate those handlers in the code like dryrun
    `,
};

    // //lua documention for lua handlers 
    // ${LUA_COOKBOOK}
    // ${LUA_COOKBOOK_USAGE_EXAMPLES}
    