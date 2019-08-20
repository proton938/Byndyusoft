const readline = require('readline');const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question('Ввести выражение: ', (expression) => {
	
// необходимый набор переменных
class allVars {
    constructor(allComponents, buferArray, i, j, component, arrayLength) {        									
        this.allComponents = allComponents;
        this.buferArray = buferArray;
		this.i = i;
		this.j = j;
		this.component = "";
		this.arrayLength = arrayLength;
    }
}

// парсинг вводимого выражения
class expressionParsing extends  allVars {														
	expressionParsing() {																																// разбиваем выражение на массив всех елементов (и чисел и операторов)								
		for (this.i=0; this.i<expression.length; this.i++) {	
			if (!isNaN(Number(expression[this.i])) || expression[this.i] == ".") {          											// если элемент является цифрой или точкой
				this.component = this.component + expression[this.i];
			}
			else {																																			// если элемент не является числом
				if (this.component!='') {                                                            													// эта ситуация может возникнуть, если оператор стоит перед скобкой
					this.allComponents.push(this.component);																				// добавляем в общий массив выражения число
					this.allComponents.push(expression[this.i]);																			// добавляем в общий массив оператор
					this.component='';																
				}
				else {
					this.allComponents.push(expression[this.i]);
				}
			}
			if (this.i==expression.length-1 && this.component!='') {																	// последний элемент (если не является скобкой)
				this.allComponents.push(this.component);
			}
		}
	}
}

// уборщик использованных компонентов выражения
class eraser extends expressionParsing {
	eraser() {																																			
		this.buferArray.splice(this.j-1, 1);
		this.buferArray.splice(this.j, 1);
		this.j=0; 
	}
}

// определяем арифметическое действие и его приоритетность
class selectOperator extends eraser {
	selectOperator() {																																		
		this.j = 0;
		while (true) {                                                      																				// первый уровень приоритетности
			this.j++;
			if (this.buferArray[this.j] == "*") {
				this.buferArray[this.j] = Number(this.buferArray[this.j-1]) * Number(this.buferArray[this.j+1]);
				this.eraser();
			}
			if (this.buferArray[this.j] == "/") {
				this.buferArray[this.j] = Number(this.buferArray[this.j-1]) / Number(this.buferArray[this.j+1]);
				this.eraser();
			}
			if (this.j==this.buferArray.length-1) {this.j=0; break;}
		}
		while (true) {																																	// второй уровень приоритетности
			this.j++;
			if (this.buferArray[this.j] == "+") {
				this.buferArray[this.j] = Number(this.buferArray[this.j-1]) + Number(this.buferArray[this.j+1]);
				this.eraser();
			}
			if (this.buferArray[this.j] == "-") {
				this.buferArray[this.j] = Number(this.buferArray[this.j-1]) - Number(this.buferArray[this.j+1]);
				this.eraser();
			}
			if (this.j==this.buferArray.length) {this.j=0; break;}
		}
	}	
}

//  вычисление
class buferCalculation extends selectOperator {
	 buferCalculation() {
		this.i=-1;
		while (true) {
			this.i++;
			if (this.allComponents[this.i]!="(" && this.allComponents[this.i]!=")") {  												// наполняем буферный массив
				this.buferArray.push(this.allComponents[this.i]);
			}
			
			if (this.allComponents[this.i]=="(") {
				this.buferArray=[];																															// встретилась скобка - обнуляем буферный массив
			}
			
			if (this.allComponents[this.i]==")") {		 																							// при закрытии скобки запускаем поцедуру вычисления
				this.arrayLength = this.buferArray.length;     	 																				// длина буферного массива
				this.selectOperator();
				this.allComponents.splice(this.i-this.arrayLength-1, this.arrayLength+2, this.buferArray[0]);   			// выражение в скобках заменяем на ответ
				this.buferArray=[];
				this.i=-1;																																		// возвращаем счетчик на начало выражения
			}
			
			if (this.i == this.allComponents.length-1) {                                                                                    		 // если дошли до конца выражения - переходим к заключительному вычислению
				if (this.allComponents.length>1) {
					this.selectOperator();
				}
				break;
			}
		}
		console.log("Ответ: "+this.buferArray);
    }
}

// выводим результат
class finalAnswer extends buferCalculation {
	finalAnswer() {
		this.expressionParsing();
        this.buferCalculation();
    }
}
 
var answer = new finalAnswer([], [], -1, -1);
answer.finalAnswer();

rl.close();
});