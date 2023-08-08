import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
//import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });


  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone ) { }

  ngOnInit(): void {
    //this.renderButton();
  }


  login() {

    console.log(this.loginForm.value.email , this.loginForm.value.password);

   const email:any = this.loginForm.value.email;

   const password:any =  this.loginForm.value.password;

   const remember:any =  this.loginForm.value.remember;


    this.usuarioService.login( email , password ).subscribe( resp => {

        if ( remember ){ 

          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');

        console.log("login.ts true paso");

      }, (err) => {
        console.log( err.error.msg )
      });
  
  }
  
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  }

  async startApp() {
    
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    //this.attachSignin( document.getElementById('my-signin2') );
    
  };

  // attachSignin(element) {
    
  //   this.auth2.attachClickHandler( element, {},
  //       (googleUser) => {
  //           const id_token = googleUser.getAuthResponse().id_token;
  //           // console.log(id_token);
  //           this.usuarioService.loginGoogle( id_token )
  //             .subscribe( resp => {
  //               // Navegar al Dashboard
  //               this.ngZone.run( () => {
  //                 this.router.navigateByUrl('/');
  //               })
  //             });

  //       }, (error) => {
  //           alert(JSON.stringify(error, undefined, 2));
  //       });
  // }

}
