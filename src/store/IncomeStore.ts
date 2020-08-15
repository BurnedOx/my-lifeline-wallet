import { observable, action } from 'mobx';
import { Income, ROI } from '../interfaces';
import Api from '../api';

export class IncomeStore {
    @observable levelIncomes: Income[] = [];
    @observable roiIncomes: ROI[] = [];

    @action
    async loadLevelIncomes() {
        this.levelIncomes = await Api.getLevelIncomes();
    }

    @action
    clearLevelIncomes() {
        this.levelIncomes = [];
    }

    @action
    async loadRoiIncomes() {
        this.roiIncomes = await Api.getROI();
    }

    @action
    clearROI() {
        this.roiIncomes = [];
    }

    @action
    clearStore() {
        this.levelIncomes = [];
        this.roiIncomes = [];
    }
}