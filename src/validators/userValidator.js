function UserEducationValidator(body){
    let error = {
        isError:false
    }
    Object.entries(body).map(([key,value]) => {
        if(!value){
            if(key == 'end_date' && body.isPresent == false){
                error[key] = `${key} should not be empty`
                error.isError = true
            }else if(key !== 'end_date'){
                error[key] = `${key} should not be empty`
                error.isError = true
            }
        }
    })
    return error
}

module.exports = {
    UserEducationValidator
}