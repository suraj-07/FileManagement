function helpFn(){
    console.log(`
    List of all the commands:
         node main.js tree "directorypath"
         node main.js organise "directorypath"
         node main.js help
    `);
}

module.exports={
    helpkey:helpFn
}