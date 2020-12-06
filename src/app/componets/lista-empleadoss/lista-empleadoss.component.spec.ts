import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmpleadossComponent } from './lista-empleadoss.component';

describe('ListaEmpleadossComponent', () => {
  let component: ListaEmpleadossComponent;
  let fixture: ComponentFixture<ListaEmpleadossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEmpleadossComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEmpleadossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
