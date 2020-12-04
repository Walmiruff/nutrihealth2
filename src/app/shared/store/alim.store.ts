import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { IAlimento } from '../models/alimentos.model';


@Injectable({
    providedIn: 'root'
})
export class AlimStore {

    private alimsSource = new BehaviorSubject<IAlimento[]>(null);
    private alims: IAlimento[] = [];
    alims$ = this.alimsSource.asObservable().pipe(shareReplay(1));

    public set(alims: IAlimento[]): void {
        this.alims = alims;
        this.alimsSource.next(this.alims);
    };

    public add(alim: IAlimento): void {
        this.alims.push(this.alimCalc(alim));
        this.alimsSource.next(this.alims);
    }

    public remove(idAlimento: string): void{
        this.alims = this.alims.filter((a) => a.idAlimento !== idAlimento);
        this.alimsSource.next(this.alims);
    }

    public removeAll(): void {
        this.alims.splice(0);
        this.alimsSource.next(this.alims);
    }

    public update(alim: IAlimento): void {
        const target = this.getId(alim.idAlimento);
        Object.assign(target, this.alimCalc(alim));
        this.alimsSource.next(this.alims);
    }

    public getId(alimId: number | string): IAlimento {
        return this.alims.find((element) => element.idAlimento === alimId );
    }

    public alimCalc(alim: IAlimento): IAlimento {
        alim.acucar = alim.acucar !== -1 ? alim.acucar * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.calcio = alim.calcio !== -1 ? alim.calcio * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.calorias = alim.calorias !== -1 ? alim.calorias * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.carboidratos = alim.carboidratos !== -1 ? alim.carboidratos * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.cobre = alim.cobre !== -1 ? alim.cobre * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.colesterol = alim.colesterol !== -1 ? alim.colesterol * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.ferro = alim.ferro !== -1 ? alim.ferro * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.fibras = alim.fibras !== -1 ? alim.fibras * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.fosforo = alim.fosforo !== -1 ? alim.fosforo * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.gordurasMonoinsaturadas = alim.gordurasMonoinsaturadas !== -1 ? alim.gordurasMonoinsaturadas * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.gordurasPoliInsaturadas = alim.gordurasPoliInsaturadas !== -1 ? alim.gordurasPoliInsaturadas * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.gordurasSaturadas = alim.gordurasSaturadas !== -1 ? alim.gordurasSaturadas * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.gordurasTotais = alim.gordurasTotais !== -1 ? alim.gordurasTotais * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.gordurasTrans = alim.gordurasTrans !== -1 ? alim.gordurasTrans * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.magnesio = alim.magnesio !== -1 ? alim.magnesio * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.manganes = alim.manganes !== -1 ? alim.manganes * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.potassio = alim.potassio !== -1 ? alim.potassio * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.proteinas = alim.proteinas !== -1 ? alim.proteinas * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.selenio = alim.selenio !== -1 ? alim.selenio * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.sodio = alim.sodio !== -1 ? alim.sodio * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.vitaminaA_Retinol = alim.vitaminaA_Retinol !== -1 ? alim.vitaminaA_Retinol * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.vitaminaB1 = alim.vitaminaB1 !== -1 ? alim.vitaminaB1 * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.vitaminaB2 = alim.vitaminaB2 !== -1 ? alim.vitaminaB2 * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.vitaminaB3 = alim.vitaminaB3 !== -1 ? alim.vitaminaB3 * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.vitaminaB5 = alim.vitaminaB5 !== -1 ? alim.vitaminaB5 * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.vitaminaB6 = alim.vitaminaB6 !== -1 ? alim.vitaminaB6 * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.vitaminaB7 = alim.vitaminaB7 !== -1 ? alim.vitaminaB7 * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.vitaminaB9 = alim.vitaminaB9 !== -1 ? alim.vitaminaB9 * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.vitaminaB12 = alim.vitaminaB12 !== -1 ? alim.vitaminaB12 * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.vitaminaC = alim.vitaminaC !== -1 ? alim.vitaminaC * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.vitaminaD = alim.vitaminaD !== -1 ? alim.vitaminaD * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.vitaminaE = alim.vitaminaE !== -1 ? alim.vitaminaE * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.zinco = alim.zinco !== -1 ? alim.zinco * (alim.porcaoGramas / 100) * alim.quantidade : -1;
        alim.porcaoGramas = alim.porcaoGramas !== -1 ? alim.porcaoGramas * alim.quantidade : -1;
        return alim;
    }
 
}
