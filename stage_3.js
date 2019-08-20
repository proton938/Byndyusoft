// этап 3
// арифметическое действие с удалением отработанных компонентов
	
var buferArray = [ '96.36', '+', '48.5', '+', '30', '*', '2', '+', '3',  '+', '8', '/', '3', '-', '6', '*', '7', '+', '32', '*', '65', '*', '36',  '-', '34', '+', '48', '-', '46', '/', '2', '*', '4', '/', '16' ];  			// буферный массив для вычисления
j = 0;

while (true) {                                                      																			// первый уровень приоритетности
	j++;
	if (buferArray[j] == "*") {
		buferArray[j] = Number(buferArray[j-1]) * Number(buferArray[j+1]);
		buferArray.splice(j-1, 1);
		buferArray.splice(j, 1);
		j=0; 
	}
	if (j==buferArray.length-1) {j=0; break;}
}

console.log(buferArray);