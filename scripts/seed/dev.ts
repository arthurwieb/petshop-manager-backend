import db from '../../src/modules/db';

const run = async () => {

  await db.user.create({
    data: {
      name: 'SUPER USER',
      login: 'admin',
      password: 'admin'
    }
  })

  await db.customer.createMany({
    data: [
      {
        name: 'Anderson Krahl',
        phone: '51998476593'
      },
      {
        name: 'Arthur Wiebusch',
        phone: '99999999'
      },
      {
        name: 'Gustavo Haas',
        phone: '6969696969'
      }
    ]
  })
  
  await db.pet.createMany({
    data: [
      {
        name: 'Yuki',
        breed: 'Vira Lata Premium Stonkz Lobo Auuuuuuuuuuuuuuuuuuu',
        age: 8,
        specie: 'Cachorro'
      },
      {
        name: 'Polly',
        breed: 'Pinscher',
        age: 4,
        specie: 'Cachorro'
      },
      {
        name: 'Filó',
        breed: 'Gato do Mato',
        age: 1,
        specie: 'Gato'
      }
    ],
  });

  //MARACUTAIA PARA VINCULAR CACHORRO AO DONO, EM RELAÇÃO N:N USANDO PRISMA:
  //A PARTE DE VINCULAÇÃO PRECISA FICAR EM UMA TERCEIRA OPERAÇÃO, QUE SERÁ EXCLUSIVAMENTE PARA ISSO
  //TERÁ UMA TERCEIRA TABELA APENAS PARA REALIZAR ESSE VÍNCULO, ONDE É NECESSÁRIO SABER O ID DOS 2 ENVOLVIDOS
  //CHATGPT RECOMENDA ASSIM, MAS QUANDO ISSO VIR DO FRONTEND, SÓ VAMOS COLOCAR ID E PA PUM
  const customer = await db.customer.findFirst({
    where: { name: 'Anderson Krahl' }
  });
  
  const pet = await db.pet.findFirst({
    where: { name: 'Yuki' }
  });

  if (customer && pet) {
    await db.petCustomer.create({
      data: {
        petId: pet.id,
        customerId: customer.id,
      }
    });
  }

};


// Auto-run if main script (not imported)
if (require.main === module) {
  run().then(() => {
    console.log('Data seed complete');
    process.exit();
  });
}
