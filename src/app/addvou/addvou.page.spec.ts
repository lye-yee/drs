import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddvouPage } from './addvou.page';

describe('AddvouPage', () => {
  let component: AddvouPage;
  let fixture: ComponentFixture<AddvouPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvouPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddvouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
