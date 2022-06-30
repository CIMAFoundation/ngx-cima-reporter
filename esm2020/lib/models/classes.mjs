export class LocalReport {
    constructor() {
        this.analysisPeriod = 'PERIODO DI ANALISI';
        this.cumulLabel = 'Cumulata';
        this.aggrLabel = 'aggregazione';
        this.date_creation = new Date().toLocaleDateString();
        this.prevReport = undefined;
        //  {
        //     fromUTCSecond: 0,
        //     toUTCSecond: 0,
        //     text: '',
        //     title: '',
        //     nImgs: 1, 
        //     raings_title: 'Pluviometri',
        //     hydros_title: 'Idrometri',
        //     layers: [], 
        //     raings: [], 
        //     hydros: [], 
        //     raings_cumul: '1 Ora'
        //   }
        this.currReport = undefined;
        // {
        //     fromUTCSecond: 0,
        //     toUTCSecond: 0,
        //     text: '',
        //     title: '',
        //     nImgs: 1, 
        //     raings_title: 'Pluviometri',
        //     hydros_title: 'Idrometri',
        //     layers: [], //todo
        //   }
        this.foreReport = undefined;
        // {
        //     fromUTCSecond: 0,
        //     toUTCSecond: 0,
        //     text: '',
        //     title: '',
        //     nImgs: 1, 
        //     raings_title: 'Pluviometri',
        //     hydros_title: 'Idrometri',
        //     layers: [], 
        //   }
    }
}
export class PrintLayout {
    constructor(nImgs) {
        this.numberOfImages = nImgs;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NpbWEvcmVwb3J0ZXIvc3JjL2xpYi9tb2RlbHMvY2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLE9BQU8sV0FBVztJQVVwQjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUMsb0JBQW9CLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBQyxVQUFVLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBQyxjQUFjLENBQUM7UUFDOUIsSUFBSSxDQUFDLGFBQWEsR0FBRSxJQUFJLElBQUksRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsS0FBSztRQUNMLHdCQUF3QjtRQUN4QixzQkFBc0I7UUFDdEIsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixpQkFBaUI7UUFDakIsbUNBQW1DO1FBQ25DLGlDQUFpQztRQUNqQyxtQkFBbUI7UUFDbkIsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQiw0QkFBNEI7UUFDNUIsTUFBTTtRQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUk7UUFDSix3QkFBd0I7UUFDeEIsc0JBQXNCO1FBQ3RCLGdCQUFnQjtRQUNoQixpQkFBaUI7UUFDakIsaUJBQWlCO1FBQ2pCLG1DQUFtQztRQUNuQyxpQ0FBaUM7UUFDakMseUJBQXlCO1FBQ3pCLE1BQU07UUFDTixJQUFJLENBQUMsVUFBVSxHQUFFLFNBQVMsQ0FBQztRQUMzQixJQUFJO1FBQ0osd0JBQXdCO1FBQ3hCLHNCQUFzQjtRQUN0QixnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLGlCQUFpQjtRQUNqQixtQ0FBbUM7UUFDbkMsaUNBQWlDO1FBQ2pDLG1CQUFtQjtRQUNuQixNQUFNO0lBQ1YsQ0FBQztDQUVKO0FBRUQsTUFBTSxPQUFPLFdBQVc7SUFJcEIsWUFBWSxLQUFhO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEN1cnJlbnRSZXBvcnQsIEZvcmVjYXN0UmVwb3J0LCBQcmV2aW91c1JlcG9ydCwgUmVwb3J0IH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgTG9jYWxSZXBvcnQgaW1wbGVtZW50cyBSZXBvcnQge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgdHh0OiBzdHJpbmc7XG4gICAgcHJldlJlcG9ydDogUHJldmlvdXNSZXBvcnQ7XG4gICAgZGF0ZV9jcmVhdGlvbjogc3RyaW5nO1xuICAgIGFuYWx5c2lzUGVyaW9kOiBzdHJpbmc7XG4gICAgY3VtdWxMYWJlbDogc3RyaW5nO1xuICAgIGFnZ3JMYWJlbDogc3RyaW5nO1xuICAgIGN1cnJSZXBvcnQ6IEN1cnJlbnRSZXBvcnQ7XG4gICAgZm9yZVJlcG9ydDogRm9yZWNhc3RSZXBvcnQ7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYW5hbHlzaXNQZXJpb2Q9J1BFUklPRE8gREkgQU5BTElTSSc7XG4gICAgICAgIHRoaXMuY3VtdWxMYWJlbD0nQ3VtdWxhdGEnO1xuICAgICAgICB0aGlzLmFnZ3JMYWJlbD0nYWdncmVnYXppb25lJztcbiAgICAgICAgdGhpcy5kYXRlX2NyZWF0aW9uPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xuICAgICAgICB0aGlzLnByZXZSZXBvcnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vICB7XG4gICAgICAgIC8vICAgICBmcm9tVVRDU2Vjb25kOiAwLFxuICAgICAgICAvLyAgICAgdG9VVENTZWNvbmQ6IDAsXG4gICAgICAgIC8vICAgICB0ZXh0OiAnJyxcbiAgICAgICAgLy8gICAgIHRpdGxlOiAnJyxcbiAgICAgICAgLy8gICAgIG5JbWdzOiAxLCBcbiAgICAgICAgLy8gICAgIHJhaW5nc190aXRsZTogJ1BsdXZpb21ldHJpJyxcbiAgICAgICAgLy8gICAgIGh5ZHJvc190aXRsZTogJ0lkcm9tZXRyaScsXG4gICAgICAgIC8vICAgICBsYXllcnM6IFtdLCBcbiAgICAgICAgLy8gICAgIHJhaW5nczogW10sIFxuICAgICAgICAvLyAgICAgaHlkcm9zOiBbXSwgXG4gICAgICAgIC8vICAgICByYWluZ3NfY3VtdWw6ICcxIE9yYSdcbiAgICAgICAgLy8gICB9XG4gICAgICAgIHRoaXMuY3VyclJlcG9ydCA9IHVuZGVmaW5lZDtcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgZnJvbVVUQ1NlY29uZDogMCxcbiAgICAgICAgLy8gICAgIHRvVVRDU2Vjb25kOiAwLFxuICAgICAgICAvLyAgICAgdGV4dDogJycsXG4gICAgICAgIC8vICAgICB0aXRsZTogJycsXG4gICAgICAgIC8vICAgICBuSW1nczogMSwgXG4gICAgICAgIC8vICAgICByYWluZ3NfdGl0bGU6ICdQbHV2aW9tZXRyaScsXG4gICAgICAgIC8vICAgICBoeWRyb3NfdGl0bGU6ICdJZHJvbWV0cmknLFxuICAgICAgICAvLyAgICAgbGF5ZXJzOiBbXSwgLy90b2RvXG4gICAgICAgIC8vICAgfVxuICAgICAgICB0aGlzLmZvcmVSZXBvcnQ9IHVuZGVmaW5lZDsgXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIGZyb21VVENTZWNvbmQ6IDAsXG4gICAgICAgIC8vICAgICB0b1VUQ1NlY29uZDogMCxcbiAgICAgICAgLy8gICAgIHRleHQ6ICcnLFxuICAgICAgICAvLyAgICAgdGl0bGU6ICcnLFxuICAgICAgICAvLyAgICAgbkltZ3M6IDEsIFxuICAgICAgICAvLyAgICAgcmFpbmdzX3RpdGxlOiAnUGx1dmlvbWV0cmknLFxuICAgICAgICAvLyAgICAgaHlkcm9zX3RpdGxlOiAnSWRyb21ldHJpJyxcbiAgICAgICAgLy8gICAgIGxheWVyczogW10sIFxuICAgICAgICAvLyAgIH1cbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBjbGFzcyBQcmludExheW91dCB7XG4gICAgLy9jaSBzYXJhbm5vIGFsdHJpIHBhcmFtZXRyaT9cbiAgICBudW1iZXJPZkltYWdlczogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IobkltZ3M6IG51bWJlcikge1xuICAgICAgICB0aGlzLm51bWJlck9mSW1hZ2VzID0gbkltZ3M7XG4gICAgfVxufSJdfQ==