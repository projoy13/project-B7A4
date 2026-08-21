import app from "./app";
import config from "./config";

const PORT = Number(config.port) || 5000;

async function main() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();