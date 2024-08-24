function dynamicUpdateQuery(body, map){
    let str = ''
    let entries = Object.entries(body);
     entries.map(([key, value], index) => {
       str += `${map[key]}='${value}'`
         if (index < entries.length - 1) {
            str += ', ';  
        }
     })
    return str
}


module.exports = {
    dynamicUpdateQuery
}