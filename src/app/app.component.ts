import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { ConfirmedValidator } from './confirmedValid';
import { passvalidator } from './confirmPass';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',



  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ang-dev';
  regForm: FormGroup;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.regForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cnfpassword: ['', Validators.required],
      zip_code: ['', [Validators.required, Validators.pattern("[0-9 ]{6}")]],
      phone_num: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]]
    }, {
      validator: ConfirmedValidator('password', 'cnfpassword')
    })

    // this.regForm=new FormGroup({
    //   fname:new FormControl('',Validators.required),
    //   lname:new FormControl('',Validators.required),
    //   address: new FormControl('',Validators.required),
    //   email:new FormControl('',[Validators.required,Validators.email]),
    //   password:new FormControl('',Validators.required),
    //   cnfpassword:new FormControl('',[Validators.required,passvalidator]),
    //   zip_code:new FormControl('',[Validators.required,Validators.pattern("[0-9 ]{6}")]),
    //   phone_num:new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{10}")])

    // })

  }
  constructor(private formBuilder: FormBuilder) {

  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
  get formData() { return this.regForm.controls }
  getData() {
    if (this.regForm.invalid) {
      this.validateAllFormFields(this.regForm);
    }
    else {
      alert("Registered")
      console.log(JSON.stringify(this.regForm.value))
      this.regForm.reset()
    }

  }

  numberOnly(event):boolean {
    // const charCode = (<HTMLInputElement>event.target).value;
    // var regex = /^[a-zA-Z_ ]*$/
    // console.log(charCode);
    // console.log(regex.test(charCode));
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
    
    // if (regex.test(charCode[charCode.length - 1]) == true) {
    //   console.log("true");
    //   return true;
    // }
    //   return false;
  }

}
