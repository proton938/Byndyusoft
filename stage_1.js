// этап 1 
// проверяем корректность парсинга - разбор строки на арифметические компоненты

var expression = "96.36+(48.5+30*(2+3)+8)/3-6*7+32*(65*(36-34)+48-46/2*4)/16";    	// строка выражения
var component = "";																													// буфер компонентов
var allComponents = [];																											// массив компонентов (результат парсинга)

for (i=0; i<expression.length; i++) {	
	if (!isNaN(Number(expression[i])) || expression[i] == ".") {          										// если элемент является цифрой или точкой
		component = component + expression[i];
	}
	else {																																		// если элемент не является числом
		if (component!='') {                                                            												// эта ситуация может возникнуть, если оператор стоит перед скобкой
			allComponents.push(component);																				// добавляем в общий массив выражения число
			allComponents.push(expression[i]);																			// добавляем в общий массив оператор или скобку
			component='';																
		}
		else {
			allComponents.push(expression[i]);
		}
	}
	if (i==expression.length-1 && component!='') {																	// последний элемент (если не является скобкой)
		allComponents.push(component);
	}
}

console.log(allComponents);