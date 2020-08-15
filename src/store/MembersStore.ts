import { observable, action } from 'mobx';
import { Member, SingleLeg } from '../interfaces';
import Api from '../api';

export class MembersStore {
    @observable directs: Member[] = [];
    @observable dowlines: Member[] = [];
    @observable singleLeg: SingleLeg[] = [];

    @action
    async loadDirect() {
        this.directs = await Api.getDirectMembers();
    }

    @action
    clearDirects() {
        this.directs = [];
    }

    @action
    async loadDownline() {
        this.dowlines = await Api.getDownlines();
    }

    @action
    clearDownlines() {
        this.dowlines = [];
    }

    @action
    async loadSingleLeg() {
        this.singleLeg = await Api.getSingleLegs();
    }

    @action
    clearSingleLeg() {
        this.singleLeg = [];
    }

    @action
    clearStore() {
        this.directs = [];
        this.dowlines = [];
        this.singleLeg = [];
    }
}