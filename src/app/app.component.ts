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
      email: ['', [Validators.required, Validators.email]],
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


  get formData() { return this.regForm.controls }
  getData() {
    if (this.regForm.invalid) {       
    }
    else
    {
      alert("Registered")
      console.log(this.regForm.value)
      this.regForm.reset()
    }
    
  }
}
