import { PrismaClient } from "@prisma/client";
import { log } from "console";

const db = new PrismaClient();

async function main() {
  await db.user.create({
    data: {
      username: "ADM",
      password: "123123",
      calls: {
        create: {
          category: "Hardware",
          description:
            "Meu computador simplesmente não está ligando. Quando tento apertar o botão de ligar, não acontece absolutamente nada. Nem mesmo as luzes indicadoras piscam. Verifiquei o cabo de alimentação para garantir que está bem conectado e também testei em diferentes tomadas que sei que estão funcionando. Até tentei usar um cabo de alimentação diferente, mas ainda assim, nada acontece. Estou começando a achar que pode ser um problema com a fonte de energia, mas não tenho certeza. Preciso de ajuda urgente, pois uso este computador para trabalho",
        },
      },
    },
  });
}

main()
  .then(() => log("Seed running !"))
  .catch(async (e) => {
    log(e);
    await db.$disconnect();
    process.exit(1);
  });
