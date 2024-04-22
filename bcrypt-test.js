const bcrypt = require('bcrypt')

async function test(){

    const pass = "test1234"
    
    const hashedPassword = await bcrypt.hash(pass,8)
    console.log(hashedPassword)
    const isMatch = await bcrypt.compare("test1244",hashedPassword)
    console.log(isMatch)

}

test()