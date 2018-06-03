let codeArray = [
  'ae','ar','at','au','be',
  'bg','br','ca','ch','cn',
  'co','cu','cz','de','eg',
  'fr','gb','gr','hk','hu',
  'id','ie','il','in','it',
  'jp','kr','lt','lv','ma',
  'mx','my','ng','nl','no',
  'nz','ph','pl','pt','ro',
  'rs','ru','sa','se','sg',
  'si','sk','th','tr','tw',
  'ua','us','ve','za']
let nameArray = [
  "United Arab Emirates","Argentina","Austria","Australia","Belgium",
  "Bulgaria","Brazil","Canada","Switzerland","China",
  "Colombia","Cuba","Czechia","Germany","Egypt",
  "France","Great Britain","Greece","Hong Kong","Hungary",
  "Indonesia","Ireland","Israel","India","Italy",
  "Japan","Korea","Lithuania","Latvia","Moroco",
  "Mexico","Malaysia","Nigeria","Netherlands","Norway",
  "New Zealand","Philippines","Poland","Portugal","Romania",
  "Serbia","Russian Federation","Saudi Arabia","Sweden","Singapore",
  "Slovania","Slovakia","Thailand","Turkey","Taiwan",
  "Ukraine","United States of America","Venezuela","South Africa"
]

let combinedArray = []
for (let i = 0; i < codeArray.length; i++) {
  combinedArray.push({code: codeArray[i], name: nameArray[i]})
}

console.log(' ')
console.log('###################')
console.log('# COUNTRY ARRAY #')
console.log('#################')
console.log(' ')

console.log(combinedArray)

console.log(' ')
console.log('#############')
console.log('# JOB DONE #')
console.log('###########')
console.log(' ')