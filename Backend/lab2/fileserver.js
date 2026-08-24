import fs from "node:fs/promises";

async function create_File(content) {
    await fs.writeFile("data.txt", content, "utf8");
    console.log("File created successfully!");
}

async function readfile() {
    try {
        const data = await fs.readFile("data.txt", "utf8");
        console.log("File Content:\n", data);
        return data;
    } catch (err) {
        console.log("Error occurred:", err);
    }
}

async function updatefile(content) {
    try {
        await fs.appendFile("data.txt", content, "utf8");
        console.log("Content appended successfully!");
    } catch (err) {
        console.log("Error occurred:", err);
    }
}

async function deletefile() {
    try {
        await fs.unlink("data.txt");
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
