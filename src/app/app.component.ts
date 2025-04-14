import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FormsModule, CommonModule],
  template: `
    <app-header />

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  deferredPrompt: any = null;
  showInstallButton = false;

  ngOnInit(): void {}
}
