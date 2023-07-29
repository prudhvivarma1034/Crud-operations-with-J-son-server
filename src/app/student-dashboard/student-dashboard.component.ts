import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentModel } from './student-dashboard board.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  formValue: FormGroup;
  studentModelObj: StudentModel = new StudentModel();
  studentData: any;
  showAdd :boolean;
  showUpdate :boolean;
  constructor(private api: ApiService) { }
  ngOnInit(): void {

    this.formValue = new FormGroup({
     
      FirstName: new FormControl(""),
      LastName: new FormControl(""),
      Email: new FormControl(""),
      Phoneno: new FormControl(""),
      Aaadharno: new FormControl(""),
    })
    this.getStudentDetails();
  }
clickAddStudent(){
  this.formValue.reset();
  this.showAdd=true;
  this.showUpdate = false;
}
  postStudentDetails() {
    this.studentModelObj.id = this.formValue.value.Id;
    this.studentModelObj.firstName = this.formValue.value.FirstName;
    this.studentModelObj.lastName = this.formValue.value.LastName;
    this.studentModelObj.emailid = this.formValue.value.Email;
    this.studentModelObj.mobile = this.formValue.value.Phoneno;
    this.studentModelObj.aadharno = this.formValue.value.Aaadharno;

    this.api.postData(this.studentModelObj)
      .subscribe(res => {
        console.log(res)
        alert("Student details added sucessfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getStudentDetails();

      },
        err => {
          console.log(err);
          alert('Something went wrong');
        });

  }
  getStudentDetails(){
    this.api.getData()
    .subscribe(res =>{
      this.studentData = res;
    })
  }
deleteStudentDetails(row:any){
  this.api.deleteData(row.id)
  .subscribe(res =>{
    alert("Student details deleted sucessfully");
 this.getStudentDetails();
  })
}
onEdit(row:any){
  
    this.showAdd=false;
    this.showUpdate = true;
  
   this.studentModelObj.id= row.id;
  this.formValue.controls['FirstName'].setValue(row.firstName);
  this.formValue.controls['LastName'].setValue(row.lastName);
  this.formValue.controls['Email'].setValue(row.emailid);
  this.formValue.controls['Phoneno'].setValue(row.mobile);
  this.formValue.controls['Aaadharno'].setValue(row.aadharno);
}
updateStudentDetails(){
  
    this.studentModelObj.firstName = this.formValue.value.FirstName;
    this.studentModelObj.lastName = this.formValue.value.LastName;
    this.studentModelObj.emailid = this.formValue.value.Email;
    this.studentModelObj.mobile = this.formValue.value.Phoneno;
    this.studentModelObj.aadharno = this.formValue.value.Aaadharno;

    this.api.putData(this.studentModelObj,this.studentModelObj.id)
    .subscribe(res=>{
      alert("Student details updated sucessfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getStudentDetails();
    })

  }
}
