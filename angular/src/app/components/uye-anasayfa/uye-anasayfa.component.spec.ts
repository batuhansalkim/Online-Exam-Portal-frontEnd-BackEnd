/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UyeAnasayfaComponent } from './uye-anasayfa.component';

describe('UyeAnasayfaComponent', () => {
  let component: UyeAnasayfaComponent;
  let fixture: ComponentFixture<UyeAnasayfaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UyeAnasayfaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UyeAnasayfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
