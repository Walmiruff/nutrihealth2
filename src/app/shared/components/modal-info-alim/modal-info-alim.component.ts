import { Component, OnInit, Input } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, delay, filter } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { IAlimento } from '../../models/alimentos.model';
import { RefeicaoStore } from '../../store/refeicao.store';

@Component({
  selector: 'app-modal-info-alim',
  templateUrl: './modal-info-alim.component.html',
  styleUrls: ['./modal-info-alim.component.scss']
})
export class ModalInfoAlimComponent implements OnInit {

  @Input() idAlim: string;
  public alim$ = new BehaviorSubject<IAlimento>(null);

  constructor(
    public bsModalRef: BsModalRef,
    private refeicaoStore: RefeicaoStore,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.alim$.next(this.refeicaoStore.findAlimInRefStore(this.idAlim));
    }, 300);

  }

  onClose() {
    this.bsModalRef.hide();
  }

}
