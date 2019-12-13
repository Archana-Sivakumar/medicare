import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../site/auth.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {

  constructor(private route: Router,private authService : AuthService) { }

  ngOnInit() {
  }

  login(initialRole) { 
    this.authService.setInitialRole(initialRole);
     this.route.navigate(['login']);
  }

}
