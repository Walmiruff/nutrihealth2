import { IRefeicao } from './refeicao.model';

export interface IPlanoAlim {
    codTipoDieta?: number;
    ativo?: number;
    calculado?: boolean;
    diasSemana?: Array<number>;
    data?: string;
    nome?: string;
    descricao?: string;
    id?: string;
    statusOnline?: number;
    refeicoes?: Array<IRefeicao>;
}

export interface IPlanoAlimMin {
    data?: string;
    descricao?: string;
    diasSemana?: Array<number>;
    nome?: string;
}

export interface IMacronutrientes {
    gObtidoCho: number;
    gObtidoPtn: number;
    gObtidoLip: number;
}

export interface IDistEnergRef {
    cafe: number;
    lancheManha: number;
    almoco: number;
    lancheTarde: number;
    jantar: number;
    lancheNoite: number;
    lancheExtra1: number;
    lancheExtra2: number;
}