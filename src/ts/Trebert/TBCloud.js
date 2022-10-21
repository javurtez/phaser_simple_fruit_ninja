export class TBCloud {
    static values = new Map();

    static getValue(id) {
        return this.values.get(id);
    }
    static setValue(id, value) {
        this.values.set(id, value);
    }
    static modifyValue(id, value) {
        let newValue = value + this.getValue(id);

        this.values.set(id, newValue);
    }
}
