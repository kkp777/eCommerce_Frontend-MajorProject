import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Resetpwd } from '../common/resetpwd';
import { ResetpwdService } from '../services/resetpwd.service';

@Component({
  selector: 'app-resetpassword',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  constructor(private formBuilder: FormBuilder,private resetPwd:ResetpwdService,private route:ActivatedRoute){}

  resetFormGroup!: FormGroup;
  successmsg:string="";
  emailpresent: boolean=false;
  
  ngOnInit(){
    this.resetFormGroup = this.formBuilder.group({
      reset: this.formBuilder.group({
        newPwd: [''],
        confirmNewPwd:['']
      })
    });
    this.emailpresent = this.route.snapshot.paramMap.has('email');
  }
  onSubmit() {
    console.log(this.resetFormGroup.get('reset')?.value);
    const email: string = this.route.snapshot.paramMap.get('email')!;
    let resetpwd = new Resetpwd();
    resetpwd = this.resetFormGroup.get('reset')?.value;
    this.resetPwd.resetpassword(resetpwd,email).subscribe(
      response => {
        console.log(response);
        this.successmsg=response;
      },
      error => {
        console.log(error);
        this.successmsg=error;
      }
    );
    this.resetFormGroup.reset();
  }
}
