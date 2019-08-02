export function getField(target, field){
    if(!field){
        return target;
    }
    const fields = field.split('.');
    let result = target[fields[0]];
    for(let i = 1; i< fields.length; i++){
        if(!result){
            return result;
        }
        result = result[fields[i]];
    }
    return result;
}