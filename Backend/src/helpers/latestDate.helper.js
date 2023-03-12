module.exports = function latestDate(ultimateDate,typeUpdate){
    const dateNow = new Date().getTime();
    const subtraction =dateNow- ultimateDate;
    const result = Math.round(subtraction / (1000*60*60*24))
    let totalDayToUpdate;
    if(typeUpdate === 'user'){
        totalDayToUpdate = 1;
    }else{
        totalDayToUpdate = 1;
    }
    if(result > totalDayToUpdate){
        return true
    }else{
     return false;
        }
}
