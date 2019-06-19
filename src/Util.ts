export class Util {
    static arrayShuffle(array: Array<any>): Array<any> {
        for(let i = array.length - 1; i > 0; i--) {
            const current = array[i];
            const random = Math.floor(Math.random() * (i + 1));
            array[i] = array[random];
            array[random] = current;
        }
        return array;
    }
    static random(min: number, max: number, int: boolean = true): number {
        let randomNumber = min + Math.random() * (max - min + 1);
        if(int)
            randomNumber = Math.floor(randomNumber);
        return randomNumber;
    }
}