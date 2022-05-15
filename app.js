const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env"});

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;

console.log(databaseId);
async function test() {
    try {
        const response = await notion.databases.query({ database_id: databaseId });
        const subpages = response["results"];

        subpages.forEach(async (page) => {
            const pageId = page["id"];

            let pageBlocks = await notion.blocks.children.list({
                block_id: pageId,
                page_size: 100,
            });

            let results = pageBlocks["results"];

            results.forEach(async (block) => {
                const blockId = block["id"];

                let blockChildren = await notion.blocks.retrieve({
                    block_id: blockId,
                });

                console.log(blockChildren);
            });

        
        });

        console.log(res);
    } catch (error) {
        console.error(error);
    }
}

test();
