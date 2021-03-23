import{AbstractControl} from "@angular/forms"

export function passvalidator(control:AbstractControl){
    if(control && (control.value!==null || control.value!==undefined)){
        const cnfpass=control.value

        const passcontrol=control.root.get("password")
        if(passcontrol){
            const passvalue=passcontrol.value
            if (passvalue!==cnfpass){
                return{
                    isError:true
                };
            }
        }

    }
    return null;
}