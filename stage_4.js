// этап 3
// проверяем вычисления выражений в скобках (если все нормально - можно компоновать приложение целиком)

var allComponents =  [ '96.36', '+', '(', '48.5', '+', '30', '*', '(', '2', '+', '3', ')',  '+', '8', ')', '/', '3', '-', '6', '*', '7', '+', '32', '*', '(', '65', '*', '(', '36', '-', '34', ')', '+', '48', '-', '46', '/', '2', '*', '4', ')', '/', '16' ];
var buferArray =  [];	// буферный массив для вычисления
var j = 0;
var i=-1;

// уборщик использованных компонентов выражения
function eraser() {
	buferArray.splice(j-1, 1);
	buferArray.splice(j, 1);
	j=0; 
}

// определяем арифметическое действие и его приоритетность
function selectOperator() {
	while (true) {                                                      																			// первый уровень приоритетности
		j++;
		if (buferArray[j] == "*") {
			buferArray[j] = Number(buferArray[j-1]) * Number(buferArray[j+1]);
			eraser();
		}
		if (buferArray[j] == "/") {
			buferArray[j] = Number(buferArray[j-1]) / Number(buferArray[j+1]);
			eraser();
		}
		if (j==buferArray.length-1) {j=0; break;}
	}
	while (true) {																																	// второй уровень приоритетности
		j++;
		if (buferArray[j] == "+") {
			buferArray[j] = Number(buferArray[j-1]) + Number(buferArray[j+1]);
			eraser(); 
		}
		if (buferArray[j] == "-") {
			buferArray[j] = Number(buferArray[j-1]) - Number(buferArray[j+1]);
			eraser();
		}
		if (j==buferArray.length) {j=0; break;}
	}
}

//  вычисление
function buferCalculation() {
	while (true) {
		i++;
		
		if (allComponents[i]!="(" && allComponents[i]!=")") {  												// наполняем буферный массив
			buferArray.push(allComponents[i]);
		}
		
		if (allComponents[i]=="(") {
			buferArray=[];																															// встретилась скобка - обнуляем буферный массив
		}
		
		if (allComponents[i]==")") {		 																							// при закрытии скобки запускаем поцедуру вычисления
			arrayLength = buferArray.length;     	 																				// длина буферного массива
			selectOperator();
			allComponents.splice(i-arrayLength-1, arrayLength+2, buferArray[0]);   						// выражение в скобках заменяем на ответ
			buferArray=[];
			i=-1;																																	// возвращаем счетчик на начало выражения
		}
		
		if (i == allComponents.length-1) {                                                                                    		 // если дошли до конца выражения - переходим к заключительному вычислению
			if (allComponents.length>1) {
				selectOperator();
			}
			break;
		}
	}
}
console.log(allComponents);
buferCalculation();
console.log(allComponents);