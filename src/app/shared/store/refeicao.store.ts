import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap, shareReplay, switchMap } from 'rxjs/operators';

import { IRefeicao } from '../models/refeicao.model';
import { IAlimento } from '../models/alimentos.model';
import { IMacronutrientes, IDistEnergRef } from '../models/plano-alim.model';

@Injectable({
    providedIn: 'root'
})
export class RefeicaoStore {
    private refsSource = new BehaviorSubject<IRefeicao[]>(null);
    private refs: IRefeicao[] = [];
    refs$ = this.refsSource.asObservable().pipe(shareReplay(1));

    private macroSource = new BehaviorSubject<IMacronutrientes>(null);
    macro$ = this.macroSource.asObservable();

    private distEnergRefSource = new BehaviorSubject<IDistEnergRef>(null);
    distEnergRef$ = this.distEnergRefSource.asObservable();


    public set(refs: IRefeicao[]): void {
        this.refs = refs;
        this.refsSource.next(this.refs);
        this.calcMacro();
        this.calcDistEnergRef();
    };

    public add(ref: IRefeicao): void {
        this.refs.push(ref);
        this.refsSource.next(this.refs);
        this.calcMacro();
        this.calcDistEnergRef();
    }

    public remove(refId: string): void {
        this.refs = this.refs.filter((a) => a.id !== refId);
        this.refsSource.next(this.refs);
        this.calcMacro();
        this.calcDistEnergRef();
    }

    public removeAll(): void {
        this.refs.splice(0);
        this.refsSource.next(this.refs);
    }

    public update(ref: IRefeicao): void {
        const target = this.getId(ref.id);
        Object.assign(target, ref);
        this.refsSource.next(this.refs);
        this.calcMacro();
    }

    public getId(refId: number | string): IRefeicao {
        return this.refs.find((element) => element.id === refId);
    }

    public findAlimInRefStore(idAlim: string): IAlimento {
        let alim: IAlimento;
        this.refs$.pipe(
            map(refs => refs
                .map(ref => ref.alimentos
                    .filter(alimento => alimento.idAlimento === idAlim))),
            tap((alimsFiltered => {
                alimsFiltered.map((alimFiltered => {
                    if (alimFiltered.length > 0) {
                        alim = alimFiltered[0];
                    }
                }));
            })),
        );
        return alim;
    }

    public calcMacro(): void {
        const macro: IMacronutrientes = {
            gObtidoCho: 0,
            gObtidoLip: 0,
            gObtidoPtn: 0,
        };
        this.refs$.pipe(
            map(refs => refs
                .map(ref => ref.alimentos
                    .map(alim => {
                        macro.gObtidoCho += alim.carboidratos;
                        macro.gObtidoLip += alim.gordurasTotais;
                        macro.gObtidoPtn += alim.proteinas;
                    })))
        ).subscribe(() => this.macroSource.next(macro));
    }


    public calcDistEnergRef(): void {
        const refeicao: IDistEnergRef = {
            cafe: 0,
            lancheManha: 0,
            almoco: 0,
            lancheTarde: 0,
            jantar: 0,
            lancheNoite: 0,
            lancheExtra1: 0,
            lancheExtra2: 0,
        };

        this.refs$.pipe(
            map(refs => refs.filter(ref => ref.descricao === 'Café da Manhã')),
            map(refs => refs.map(ref => ref.alimentos.map(alim => refeicao.cafe += alim.calorias))),
            switchMap(() => {
                return this.refs$.pipe(
                    map(refs => refs.filter(ref => ref.descricao === 'Lanche da Manhã')),
                    map(refs => refs.map(ref => ref.alimentos.map(alim => refeicao.lancheManha += alim.calorias))),
                    switchMap(() => {
                        return this.refs$.pipe(
                            map(refs => refs.filter(ref => ref.descricao === 'Almoço')),
                            map(refs => refs.map(ref => ref.alimentos.map(alim => refeicao.almoco += alim.calorias))),
                            switchMap(() => {
                                return this.refs$.pipe(
                                    map(refs => refs.filter(ref => ref.descricao === 'Lanche da Tarde')),
                                    map(refs => refs.map(ref => ref.alimentos.map(alim => refeicao.lancheTarde += alim.calorias))),
                                    switchMap(() => {
                                        return this.refs$.pipe(
                                            map(refs => refs.filter(ref => ref.descricao === 'Jantar')),
                                            map(refs => refs.map(ref => ref.alimentos.map(alim => refeicao.jantar += alim.calorias))),
                                            switchMap(() => {
                                                return this.refs$.pipe(
                                                    map(refs => refs.filter(ref => ref.descricao === 'Lanche da Noite')),
                                                    map(refs => refs.map(ref => ref.alimentos.map(alim => refeicao.lancheNoite += alim.calorias))),
                                                    switchMap(() => {
                                                        return this.refs$.pipe(
                                                            map(refs => refs.filter(ref => ref.descricao === 'Lanche Extra 1')),
                                                            map(refs => refs.map(ref => ref.alimentos.map(alim => refeicao.lancheExtra1 += alim.calorias))),
                                                            switchMap(() => {
                                                                return this.refs$.pipe(
                                                                    map(refs => refs.filter(ref => ref.descricao === 'Lanche Extra 2')),
                                                                    map(refs => refs.map(ref => ref.alimentos.map(alim => refeicao.lancheExtra2 += alim.calorias))),
                                                                );
                                                            }),
                                                        );
                                                    }),
                                                );
                                            }),
                                        );
                                    }),
                                );
                            }),
                        );
                    }),
                );
            })
        ).subscribe(() => this.distEnergRefSource.next(refeicao));
    }

    public calcNutrientes(): void {

    }


}
