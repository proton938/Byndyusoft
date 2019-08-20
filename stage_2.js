// этап 2 
// определяем арифметическое действие  действие и его приоритетность (тестируем на выражении без скобок)
	
var buferArray = [ '96.36', '+', '48.5', '+', '30', '*', '2', '+', '3',  '+', '8', '/', '3', '-', '6', '*', '7', '+', '32', '*', '65', '*', '36',  '-', '34', '+', '48', '-', '46', '/', '2', '*', '4', '/', '16' ];  			// буферный массив для вычисления
j = 0;

while (true) {                                                      																			// первый уровень приоритетности
	j++;
	if (buferArray[j] == "*") {
		buferArray[j] = Number(buferArray[j-1]) * Number(buferArray[j+1]);
		console.log(buferArray[j]);
	}
	if (buferArray[j] == "/") {
		buferArray[j] = Number(buferArray[j-1]) / Number(buferArray[j+1]);
		console.log(buferArray[j]);
	}
	if (j==buferArray.length-1) {j=0; break;}
}
while (true) {																																	// второй уровень приоритетности
	j++;
	if (buferArray[j] == "+") {
		buferArray[j] = Number(buferArray[j-1]) + Number(buferArray[j+1]);
		console.log(buferArray[j]);
	}
	if (buferArray[j] == "-") {
		buferArray[j] = Number(buferArray[j-1]) - Number(buferArray[j+1]);
		console.log(buferArray[j]);
	}
	if (j==buferArray.length) {j=0; break;}
}

