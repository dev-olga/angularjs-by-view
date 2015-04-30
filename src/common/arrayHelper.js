(function(helpers){
    arrayHelper.first = function(array, func){
        var i = 0;
        for(; i< array.length; i++){
            if(func(array[i])){
                return array[i];
            }
        }
        return false;
    }

    arrayHelper.indexOf = function(array, func){
        var i = 0;
        for(; i< array.length; i++){
            if(func(array[i])){
                return array[i];
            }
        }
        return i == array.length ? -1 : i;
    }
}( window.arrayHelper = window.arrayHelper || {}));