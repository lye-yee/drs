import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddnewsPage } from './addnews.page';

describe('AddnewsPage', () => {
  let component: AddnewsPage;
  let fixture: ComponentFixture<AddnewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddnewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
