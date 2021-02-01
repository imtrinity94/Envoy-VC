require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");


async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./README.template.md"))
    ).toString("utf-8");

    const quote = await (
        await fetch("http://quotes.stormconsultancy.co.uk/random.json")
    ).json();

    const get_joke = await (
        await fetch("https://official-joke-api.appspot.com/jokes/programming/random")
    ).json();

    console.log(quote);
    console.log(get_joke);


    const readme = readmeTemplate
        .replace("{quote}", quote.quote)
        .replace("{author}", quote.author)
        .replace("{joke}",get_joke.setup)
        .replace("{punchline}",get_joke.punchline)

    await fs.writeFile("README.md", readme);
}

main();
