import fs from 'node:fs'

import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
 
const db = sql('meals.db')

export async function getMeals(){
    return db.prepare('SELECT * FROM meals').all()
}

export async function getMeal(slug){
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

// export async function saveMeal(meal){
//     meal.slug = slugify(meal.title, {lower : true})
//     meal.instructions = xss(meal.instructions)

//     const extension = meal.image.name.split('.').pop()
//     const fileName = `${meal.slug}.${extension}`
    
//     const bufferedImage = await meal.image.arrayBuffer()

//     const stream = fs.createWriteStream(`public/images/${fileName}`)

//     stream.write(Buffer.from(bufferedImage), (error)=>{
//         if(error){
//             throw new Error('Saving image failed.')
//         }
//     })

//     meal.image = `/images/${fileName}`

//     db.prepare(`
//         INSERT INTO meals
//             (title, summary, instructions, creator, creator_email, image, slug)
//         VALUE(
//             @title,
//             @summary,
//             @instructions,
//             @creator,
//             @creator_email,
//             @image,
//             @slug
//         )
//     `).run(meal)
// }


export const saveMeal = async (meal) => {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);
    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}.${extension}`;
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) throw new Error("Saving Image Failed!!!");
    });
  
    meal.image = `/images/${fileName}`;
  
    db.prepare(
      `
      INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
      VALUES
        (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `
    ).run(meal);
  };
