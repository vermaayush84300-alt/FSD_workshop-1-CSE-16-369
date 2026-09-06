import fs from "node:fs/promises";

async function create_File(content) {
    await fs.writeFile("data.json", content, "utf8");
    console.log("File created successfully!");
}

async function readfile() {
    try {
        const data = await fs.readFile("data.json", "utf8");
        console.log("File Content:\n", data);
        return data;
    } catch (err) {
        console.log("Error occurred:", err);
    }
}

async function updatefile(content) {
    try {
        await fs.appendFile("data.json", content, "utf8");
        console.log("Content appended successfully!");
    } catch (err) {
        console.log("Error occurred:", err);
    }
}

async function deletefile() {
    try {
        await fs.unlink("data.json");
        console.log("File deleted successfully!");
    } catch (err) {
        console.log("Error occurred:", err);
    }
}

// Example usage
await create_File("Hello Ayush, this is a test file!");
await readfile();
await updatefile("\nThere is more content appended.");
await readfile();
await deletefile();
