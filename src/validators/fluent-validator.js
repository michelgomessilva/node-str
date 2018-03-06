'use strict';

class ValidationContract {
    constructor(){
        this.errors = [];
    }
    isRequired(value, message){
        if (!value || value.length <= 0)
            this.errors.push({ message: message });
    }
    hasMinLen(value, min, message){
        if (!value || value.length < min)
            this.errors.push({ message: message });
    }
    hasMaxLen(value, max, message){
        if (!value || value.length > max)
        this.errors.push({ message: message });
    }
    isFixedLen(value, len, message){
        if (value.length != len)
            this.errors.push({ message: message });
    }
    isEmail(value, message){
        let reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
        if (!reg.test(value))
            this.errors.push({ message: message });
    }
    clear(){
        this.errors = [];
    }
    isValid(){
        return this.errors.length == 0;
    }
}

module.exports = ValidationContract;