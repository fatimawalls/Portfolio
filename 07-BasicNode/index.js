console.log("Hello, world!");

async function main() {
  const sw = (await import('star-wars-quotes')).default; 
  const quote = sw(); 
  console.log(`Star Wars Quote: ${quote}`);

  const superheroes = (await import('superheroes')).default; 
  console.log(superheroes); 

  const supervillains = (await import('supervillains')).default; 
  console.log(supervillains); 
  
  const heroIndex = Math.floor(Math.random() * superheroes.length); 
  const hero = superheroes[heroIndex]; 

  const villainIndex = Math.floor(Math.random() * supervillains.length); 
  const villain = supervillains[villainIndex]; 

  console.log(`An epic battle between ${hero} and ${villain}!`);

  const fs = await import('fs');

  const { readFile } = fs;
  readFile('./data/input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(`Secret message: ${data}`);
  });
}

main().catch(err => console.error(err));
