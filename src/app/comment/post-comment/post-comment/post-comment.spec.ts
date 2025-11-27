import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComment } from './post-comment';

describe('PostComment', () => {
  let component: PostComment;
  let fixture: ComponentFixture<PostComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
