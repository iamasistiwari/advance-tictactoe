export class CircularQueue<T> {
    private arr:(T | null)[];
    private maxSize: 3;
    private size: number;
    private index: number;

    constructor() {
        this.maxSize = 3;
        this.arr = Array(3).fill(null);
        this.size = 0;
        this.index = 0;
    }    

    add(value: T){
        if(this.isFull()){
            for(let i = 0; i < 2; i++){
                this.arr[i] = this.arr[i+1]
            }
            this.arr[2] = null;
            this.size = 2 
        }
        this.arr[this.index] = value
        this.size++;
        if(this.index < 2){
            this.index++
        }
    }
    
    isFull(): boolean {
        return this.size === this.maxSize;
    }

    getQueue(): (T | null)[] {
        return [...this.arr];
    }
    
    getFirstElement() : (T | null) {
        return this.arr[0]
    }

}