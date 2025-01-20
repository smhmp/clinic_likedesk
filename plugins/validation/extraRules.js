import {extend} from 'vee-validate';
import {lg} from "@/src/js/dbg";

extend('j_after', {
    validate(value, args) {
        return moment(value,args[0]).isSameOrAfter(args[1]);
    },
});

extend('j_before', {
    validate(value, args) {
        return moment(value,args[0]).isBefore(args[1]);
    },
});

extend('j_date_format', {
    validate(value, args) {
        return moment(value,args[0]).isValid(args[1]);
    },
});

extend('url', {
    validate(value) {
        if (value) {
            return /(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
        }
        return false;
    },
})
extend('ip', {
    validate(value) {
        if (value) {
            return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/.test(value);
        }
        return false;
    },
})
extend('isEnglish', {
    validate(value) {
        if (value) {
            return /^[a-zA-Z0-9_ ]*$/.test(value);
        }
        return false;
    },
})
extend('isPersian', {
    validate(value) {
        if (value) {
            return /^[\u0600-\u06FF\s]+$/.test(value);
        }
        return false;
    },
})

extend('isPhoneValidate', {
    validate(value) {
        if (value) {
            return /^0[1-9][0-9]?[0-8][0-9]{5,10}$/.test(value);
        }
        return false;
    },
})

extend('required', {
  validate: function(value) {
    lg('required/value',value)
    // your validation logic here
    return !!value; // or false
  },
  message: "{_field_} الزامی است"
});
/*
extend('my_required', {
  params: ['myOtherValue'],
  validate: function(value, { myOtherValue }) {
    // your validation logic here
    if(value){
      return true;
    }
    else if(myOtherValue && myOtherValue.length){
      return true
    }
    return false;
  },
  message: 'حداقل یک پذیرنده را به عنوان دریافت کننده باید انتحاب کیند'
});*/
